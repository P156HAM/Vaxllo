export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
}

export type CallPriority = "high" | "medium" | "low";
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
  timestamp: string;
}

export interface Call {
  id: string;
  phone_number: string;
  caller_name?: string;
  duration: number;
  transcript: string;
  conversation: Message[];
  priority: CallPriority;
  call_type: CallType;
  is_blocked: boolean;
  created_at: string;
}

export interface AuthState {
  user: User | null;
  session: any | null;
}

export interface SettingsState {
  theme: "light" | "dark" | "system";
  notifications: boolean;
}
