import { Request, Response } from "express";
import { create } from "xmlbuilder2";
import { userService } from "../services/userService";
import { callService } from "../services/callService";
import { TelnyxWebhookBody, Message } from "../types/index";
import { genAI, model } from "../config";
import { SYSTEM_PROMPT } from "../utils/prompts";

const ongoingCalls = new Map<
  string,
  {
    from: string;
    to: string;
    userId: string;
    history: Message[];
  }
>();

const doTelnyx = async (path: string, body?: any) => {
  const TELNYX_API = "https://api.telnyx.com/v2";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.TELNYX_API_KEY}`,
  } as const;
  const res = await fetch(`${TELNYX_API}${path}`, {
    method: "POST",
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  console.log("📡 Telnyx", path, res.status);
  if (res.status >= 400) {
    console.error("⚠️  Telnyx error", await res.text());
  }
  return res;
};

function historyToPrompt(history: Message[]): string {
  return history
    .map((m) => `${m.role === "caller" ? "Kund" : "AI"}: ${m.content}`)
    .join("\n");
}

export const telnyxController = {
  async handleAnswer(req: Request, res: Response): Promise<void> {
    try {
      const eventType = req.body?.data?.event_type;
      console.log(`🪝  Incoming webhook: ${eventType || "Unknown"}`);

      // --- Dispatcher ---
      // Route transcription events to the correct handler
      if (eventType === "call.transcription") {
        console.log("➡️ Routing to handleTranscription...");
        return await telnyxController.handleTranscription(req, res);
      }
      if (eventType === "call.hangup") {
        console.log("➡️ Routing to handleHangup...");
        return await telnyxController.handleHangup(req, res);
      }
      // Acknowledge and ignore other, non-essential webhooks
      if (eventType && eventType !== "call.initiated") {
        console.log(`✅ Acknowledging and ignoring event: ${eventType}`);
        res.sendStatus(200);
        return;
      }
      // --- End Dispatcher ---

      const to: string | undefined =
        (req.body as any)?.To ||
        (req.body as any)?.to ||
        (req.body as any)?.data?.to ||
        (req.query as any)?.To ||
        (req.query as any)?.to ||
        (req.body as any)?.data?.payload?.to ||
        (req.body as any)?.data?.payload?.To ||
        (req.body as any)?.data?.payload?.from ||
        (req.body as any)?.data?.payload?.From;

      const from: string | undefined =
        (req.body as any)?.From ||
        (req.body as any)?.from ||
        (req.body as any)?.data?.from ||
        (req.query as any)?.From ||
        (req.query as any)?.from ||
        (req.body as any)?.data?.payload?.from ||
        (req.body as any)?.data?.payload?.From;

      if (!to) {
        const evt = (req.body as any)?.data?.event_type;
        if (evt) {
          res.status(200).json({ ok: true });
          return;
        }
        console.error("❌ 'To' number missing in webhook – cannot proceed.");
        res.status(400).type("text/xml").send("<Response><Hangup/></Response>");
        return;
      }

      const isVoiceApi =
        (req.body as any)?.data?.event_type === "call.initiated";
      if (isVoiceApi && to && from) {
        res.status(200).json({ received: true });

        const callControlId = (req.body as any).data.payload.call_control_id;

        (async () => {
          try {
            // User lookup is now inside the voice API logic block
            const user = await userService.findByVirtualNumber(to);
            if (!user) {
              console.error(`No user found for ${to}, hanging up.`);
              await doTelnyx(`/calls/${callControlId}/actions/hangup`);
              return;
            }

            // Initialize conversation tracking
            ongoingCalls.set(callControlId, {
              from,
              to,
              userId: user.id,
              history: [],
            });

            await doTelnyx(`/calls/${callControlId}/actions/answer`);

            await doTelnyx(`/calls/${callControlId}/actions/speak`, {
              voice: "ElevenLabs.eleven_multilingual_v2.Azw9ahQtVs7SL0Xibr2c",
              voice_settings: {
                api_key_ref: "elevenlabs_key",
              },
              payload: (user as any)?.greeting_script || user.greeting || "Hej",
            });

            await doTelnyx(
              `/calls/${callControlId}/actions/transcription_start`,
              {
                transcription_engine: "A", // Google engine
                language: "sv",
              }
            );

            // Keep the call alive by "speaking" a long silence
            await doTelnyx(`/calls/${callControlId}/actions/speak`, {
              voice: "female",
              language: "sv-SE",
              payload: '<speak><break time="120s"/></speak>',
              payload_type: "ssml",
            });
          } catch (err) {
            console.error("❌ Telnyx Call-Control error", err);
          }
        })();
        return;
      }

      // This logic now only runs for the TeXML flow
      const user = await userService.findByVirtualNumber(to);
      if (!user) {
        res.status(404).type("text/xml").send(`<Response><Hangup/></Response>`);
        return;
      }

      const whitelist = await userService.getWhitelist(user.id);
      const whitelisted = whitelist.some((w) => w.number === from);
      const shouldOwnerPick = whitelisted || user.answer_mode !== "all";

      let xml;
      if (shouldOwnerPick) {
        xml = create({ version: "1.0" })
          .ele("Response")
          .ele("Dial")
          .txt(user.owner_mobile)
          .up()
          .up()
          .end({ prettyPrint: false });
      } else {
        const webhookUrl = `${process.env.PUBLIC_HTTP_URL}/telnyx/transcription`;
        xml = create({ version: "1.0" })
          .ele("Response")
          .ele("Say", { language: "sv-SE", voice: "female" })
          .txt(user.greeting)
          .up()
          .ele("Start")
          .ele("Transcription", {
            language: "sv-SE",
            transcriptionCallback: webhookUrl,
            transcriptionEngine: "B",
          })
          .up()
          .up()
          .up()
          .end({ prettyPrint: false });
      }

      res.type("text/xml").send(xml);
    } catch (error) {
      console.error("Error handling answer webhook:", error);
      res.status(500).type("text/xml").send("<Response><Hangup/></Response>");
    }
  },

  async handleTranscription(req: Request, res: Response): Promise<void> {
    try {
      console.log("📝 /telnyx/transcription", { body: req.body });
      const { call_control_id, transcription_data } = req.body.data.payload;
      const { transcript, is_final } = transcription_data;

      if (!is_final || !transcript) {
        res.sendStatus(200);
        return;
      }

      console.log(`🗣️ Final transcript: "${transcript}"`);

      // Store caller message
      const callData = ongoingCalls.get(call_control_id);
      if (callData) {
        callData.history.push({
          role: "caller",
          content: transcript,
          timestamp: new Date(),
        });
      }

      const convo = callData ? historyToPrompt(callData.history) : "";

      const promptForGemini =
        SYSTEM_PROMPT + "\n" + convo + `\nKund: ${transcript}\nAI:`;

      const response = await genAI.models.generateContent({
        model,
        contents: promptForGemini,
      });
      const reply = response.text || "";
      console.log("🤖 Gemini reply:", reply);

      // Store AI reply
      if (callData) {
        callData.history.push({
          role: "ai",
          content: reply,
          timestamp: new Date(),
        });
      }

      // Stop any ongoing playback (the silent pause) before speaking
      await doTelnyx(`/calls/${call_control_id}/actions/playback_stop`);

      await doTelnyx(`/calls/${call_control_id}/actions/speak`, {
        voice: "ElevenLabs.eleven_multilingual_v2.Azw9ahQtVs7SL0Xibr2c",
        voice_settings: {
          api_key_ref: "elevenlabs_key",
        },
        payload: reply,
      });

      // After speaking, "speak" another long silence to wait for the next input
      await doTelnyx(`/calls/${call_control_id}/actions/speak`, {
        voice: "female",
        language: "sv-SE",
        payload: '<speak><break time="120s"/></speak>',
        payload_type: "ssml",
      });

      res.sendStatus(200);
    } catch (error) {
      console.error("❌ Error handling transcription webhook:", error);
      res.sendStatus(500);
    }
  },

  async handleHangup(req: Request, res: Response): Promise<void> {
    try {
      console.log("📞 Call hangup webhook received");
      const callControlId = req.body.data.payload.call_control_id;
      const callData = ongoingCalls.get(callControlId);

      if (callData) {
        // Asynchronously process the conversation
        callService
          .processConversation(callControlId, callData)
          .catch((err) => {
            console.error("🚨 Error processing conversation:", err);
          });
        ongoingCalls.delete(callControlId);
        console.log(`🧹 Cleaned up call: ${callControlId}`);
      }

      res.sendStatus(200);
    } catch (error) {
      console.error("❌ Error handling hangup webhook:", error);
      res.sendStatus(500);
    }
  },

  async handleRecording(req: Request, res: Response): Promise<void> {
    try {
      const { recording_url, caller_number, uid } =
        req.body as TelnyxWebhookBody;

      if (!recording_url || !caller_number || !uid) {
        throw new Error("Missing required recording parameters");
      }

      await callService.processRecording(recording_url, caller_number, uid);
      res.sendStatus(200);
    } catch (error) {
      console.error("Error handling recording webhook:", error);
      res.sendStatus(500);
    }
  },
};
