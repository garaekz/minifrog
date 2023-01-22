import { getCookies } from 'std/http/cookie.ts';
import { supabase } from "./supabase.ts";

export const getUserFromCookie = async (req: Request) => {
  const cookies = getCookies(req.headers);
  if (cookies.token) {
    const { data: { user } } = await supabase.auth.getUser(cookies.token);
    return user || null;
  }
  return null;
};
