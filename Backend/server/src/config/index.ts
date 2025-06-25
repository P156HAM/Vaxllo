import { createClient } from "@supabase/supabase-js";
import { GoogleGenAI } from "@google/genai";
import Telnyx from "telnyx";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config();

// Load Google service account
const googleServiceAccountPath = path.resolve(
  __dirname,
  "../../../vaxllo-8d44f3a169ad.json"
);
if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  process.env.GOOGLE_APPLICATION_CREDENTIALS = googleServiceAccountPath;
}

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
  throw new Error("Missing Supabase configuration");
}

if (!process.env.GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY");
}

if (!process.env.TELNYX_API_KEY) {
  throw new Error("Missing Telnyx API key");
}

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
export const model = "gemini-2.5-flash-lite";

export const telnyx = new Telnyx(process.env.TELNYX_API_KEY);
