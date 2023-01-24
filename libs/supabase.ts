import { AuthChangeEvent, createClient, Session } from "supabase";
import { Session as FreshSession } from "fresh_session";
import { User } from "./types.ts";
import "https://deno.land/std@0.145.0/dotenv/load.ts";

export type SupaSession = Session | null;

const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY") as string;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const setUserSession = async (supaSession: SupaSession, freshSession: FreshSession) => {
  if (!supaSession) {
    return { user: null, error: Error("No supabase session") };
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", supaSession.user.id)
    .single();

  if (error) {
    return { user: null, error };
  }

  const user: User = {
    ...profile,
    email: supaSession.user.email as string,
  };

  freshSession.set("access_token", supaSession.access_token);
  freshSession.set("expires_in", supaSession.expires_in);
  freshSession.set("provider_token", supaSession.provider_token);
  freshSession.set("refresh_token", supaSession.refresh_token);
  freshSession.set("user", user);

  return { user, error: null };
};

export const authStateChangeHandler = (event: AuthChangeEvent, supaSession: SupaSession) => {
  console.log(event);
  if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED" && supaSession) {
    console.log('signed in');
  }

  if (event === "SIGNED_OUT") {
    console.log('signed out');
  }
}