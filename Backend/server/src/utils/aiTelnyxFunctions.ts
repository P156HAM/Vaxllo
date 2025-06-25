import { Type } from "@google/genai";

/**
 * Function declaration that can be provided to Gemini so it is allowed to
 * terminate an ongoing Telnyx call by its `call_control_id`.
 */
export const hangupCallFunctionDeclaration = {
  name: "hangup_call",
  description:
    "Hangs up an active Telnyx call identified by its call control id.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      call_control_id: {
        type: Type.STRING,
        description:
          "Unique identifier and token for controlling the call (call_control_id).",
      },
    },
    required: ["call_control_id"],
  },
} as const;

/**
 * Implementation that performs the actual HTTP request to Telnyx in order to
 * hang up the call.
 *
 * @param args An object containing the `call_control_id`.
 * @returns A boolean indicating whether the hang-up request succeeded.
 */
export async function hangupCall(args: {
  call_control_id: string;
}): Promise<boolean> {
  const { call_control_id } = args;

  if (!process.env.TELNYX_API_KEY) {
    throw new Error("Missing Telnyx API key – cannot hang up call");
  }

  const TELNYX_API = "https://api.telnyx.com/v2";
  const endpoint = `${TELNYX_API}/calls/${call_control_id}/actions/hangup`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TELNYX_API_KEY}`,
    },
  });

  console.log("📡 Telnyx hangup", call_control_id, res.status);

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error("⚠️  Telnyx hangup error", body || res.statusText);
    return false;
  }

  return true;
}
