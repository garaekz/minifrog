import { getCookies } from 'std/http/cookie.ts';
import { supabase } from "./supabase.ts";
import { User } from "supabase";

export const getUserFromCookie = async (req: Request): Promise<User | null> => {
  const cookies = getCookies(req.headers);
  if (cookies.supatoken) {
    const { data: { user } } = await supabase.auth.getUser(cookies.supatoken);
    return user || null;
  }
  return null;
};
