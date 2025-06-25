import { supabase } from "../config";
import { User, WhitelistEntry } from "../types";

export const userService = {
  async findByVirtualNumber(virtualNumber: string): Promise<User | null> {
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("virtual_number", virtualNumber)
      .maybeSingle();

    if (error || !user) {
      return null;
    }

    return user;
  },

  async getWhitelist(userId: string): Promise<WhitelistEntry[]> {
    const { data: whitelist, error } = await supabase
      .from("whitelist")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching whitelist:", error);
      return [];
    }

    return whitelist || [];
  },
};
