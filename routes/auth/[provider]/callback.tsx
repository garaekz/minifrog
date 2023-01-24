
import { Handlers, HandlerContext, PageProps } from "$fresh/server.ts";
import { setCookie } from "std/http/cookie.ts";
import CookieMonster from "../../../islands/CookieMonster.tsx";
import { setUserSession, supabase } from "../../../libs/supabase.ts";
import { WithSession } from "fresh_session";
import { User } from "../../../libs/types.ts";

export type Data = { session: Record<string, string> };

export const handler: Handlers<Data, WithSession> = {
  POST: async (req, ctx) => {
    const formData = await req.formData();
    const access_token = formData.get("access_token");
    const expires_in = formData.get("expires_in");
    const provider_token = formData.get("provider_token");
    const refresh_token = formData.get("refresh_token");

    if (access_token && expires_in && provider_token && refresh_token) {
      const { data: { session: supaSession }, error: sessionError } = await supabase.auth.setSession({
        access_token: access_token as string,
        refresh_token: refresh_token as string,
      });

      if (sessionError) {
        return new Response("Error setting the session", { status: 500 });
      }

      const { session } = ctx.state;

      const { error } = await setUserSession(supaSession, session);

      if (error) {
        return new Response("Error setting the session", { status: 500 });
      }

      const headers = new Headers();
      headers.set("location", "/admin");

      return new Response("", {
        status: 302,
        headers,
      });
    }

    return new Response("Error setting the session", { status: 500 });
  },
};

export default function AuthProviderCallback(props: PageProps) {
  const { provider } = props.params;
  return (
    <>
      <CookieMonster provider={provider} />
    </>
  );
}
