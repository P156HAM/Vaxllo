import { supabase, genAI, model } from "../config";
import { CallType, Message } from "../types";

const generatePrompt = (conversation: Message[], availableTags: CallType[]) => {
  const transcript = conversation
    .map((msg) => `${msg.role}: ${msg.content}`)
    .join("\n");

  return `Baserat på följande konversation, skapa en kort sammanfattning (max 20 ord), välj den mest passande taggen, och bestäm en brådskandegrad (high, medium, low).

Konversation:
---
${transcript}
---

Svara ENDAST med ett JSON-objekt som har nycklarna "summary", "tag", och "urgency". Välj en tag från denna lista: ${availableTags.join(
    ", "
  )}. Välj en brådskandegrad från: high, medium, low.`;
};

export const callService = {
  async processConversation(
    callControlId: string,
    callData: {
      from: string;
      to: string;
      userId: string;
      history: Message[];
    }
  ): Promise<void> {
    console.log(`Processing conversation for call: ${callControlId}`);

    if (callData.history.length === 0) {
      console.log("No conversation to process. Skipping.");
      return;
    }

    try {
      const availableTags: CallType[] = [
        "viktigt",
        "leads",
        "spam",
        "normal",
        "säljare",
        "support",
        "annat",
      ];
      const prompt = generatePrompt(callData.history, availableTags);

      const response = await genAI.models.generateContent({
        model,
        contents: prompt,
      });
      const text = response.text || "";

      // Clean the response to get a valid JSON
      const jsonResponse = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      const { summary, tag, urgency } = JSON.parse(jsonResponse);

      const transcriptText = callData.history
        .map((msg) => `${msg.role}: ${msg.content}`)
        .join("\n");

      const payload = {
        user_id: callData.userId,
        from_number: callData.from,
        transcript: transcriptText,
        summary: summary,
        tags: [tag],
        urgency: urgency,
      };

      console.log("📦 Saving to Supabase:", JSON.stringify(payload, null, 2));

      const { data, error } = await supabase.from("calls").insert(payload);

      if (error) {
        throw new Error(`Supabase insert error: ${error.message}`);
      }

      console.log("✅ Conversation saved to DB");
    } catch (err) {
      console.error(`🚨 Failed to process and save conversation:`, err);
    }
  },

  async processRecording(
    recordingUrl: string,
    callerId: string,
    userId: string
  ): Promise<void> {
    // This function is not used in the current flow but is kept for potential future use.
    console.log(
      "processRecording called with:",
      { recordingUrl, callerId, userId },
      "No action taken."
    );
    return;
  },
};
