import { Handlers } from "$fresh/server.ts";
import { supabase } from "../../libs/supabase.ts";
import { Provider } from "supabase";
import { config } from "../../libs/config.ts";

const providers = ["github", "gitlab", "google"];

export const handler: Handlers = {
  async GET(req, ctx) {
    const provider = ctx.params.provider as Provider;
    if (!providers.includes(provider)) {
      return await new Response("Invalid provider", { status: 400 });
    }

    try {
      const { data: { url } } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: await getRedirectUrl(provider)
        },
      });

      if (!url) {
        return await new Response("Couldn't finish the login try because an error", { status: 500 });
      }

      return await new Response('', {
        status: 302,
        headers: { location: url },
      });
    } catch (err) {
      return await new Response(err.message, { status: 500 });
    }
  },
};

const getRedirectUrl = async (provider: Provider) => {
  return await `${config.baseUrl}/auth/${provider}/callback`;
}