import { AuthChangeEvent, createClient, Session } from "supabase";
import { Session as FreshSession } from "fresh_session";
import { User } from "./types.ts";

export type SupaSession = Session | null;

const supabaseUrl = "https://ackljedzzuaraoreoeoj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFja2xqZWR6enVhcmFvcmVvZW9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQxODgwMTcsImV4cCI6MTk4OTc2NDAxN30.g5mY5Ybp_uGS2bONOxkHE4b3Y13NlW22euXSiyICpwA";

export const supabase = await createClient(supabaseUrl, supabaseKey);

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

export const authStateChangeHandler = async (event: AuthChangeEvent, supaSession: SupaSession) => {
  // const freshSession = new FreshSession();
  // console.log(freshSession);
  // console.log(event);
  if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED" && supaSession) {
    // const { error } = await setUserSession(supaSession, freshSession);
    // if (error) {
    //   console.log(error);
    // }
  }

  if (event === "SIGNED_OUT") {
    console.log("signed out");
    // freshSession.clear();
  }
}