export interface User {
  id: string;
  virtual_number: string;
  owner_mobile: string;
  answer_mode: string;
  greeting: string;
}

export interface WhitelistEntry {
  number: string;
}

export interface Call {
  user_id: string;
  from_number: string;
  summary: string;
  tags: string[];
  urgency: string;
  audio_url: string;
}

export interface TelnyxWebhookBody {
  To: string;
  From: string;
  recording_url?: string;
  caller_number?: string;
  uid?: string;
}

export type CallType =
  | "viktigt"
  | "leads"
  | "spam"
  | "normal"
  | "säljare"
  | "support"
  | "annat";

export interface Message {
  role: "ai" | "caller";
  content: string;
  timestamp: Date;
}

export interface WhitelistEntry {
  id: string;
  user_id: string;
  number: string;
}
