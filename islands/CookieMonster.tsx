import { IS_BROWSER } from "$fresh/runtime.ts";
import { supabase } from "../libs/supabase.ts";

export default function CookieMonster({ provider }: { provider: string }) {
  if (IS_BROWSER) {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const hash = url.hash.split('&');
    hash[0] = hash[0].replace('#', '');
    const hashObject = Object.fromEntries(hash.map((item) => item.split('=')));

    if (hashObject) {
      const form = document.createElement("form");
      form.method = "post";
      form.action = `/auth/${provider}/callback`;

      const access_token = document.createElement("input");
      access_token.type = "hidden";
      access_token.name = "access_token";
      access_token.value = hashObject.access_token;

      const expires_in = document.createElement("input");
      expires_in.type = "hidden";
      expires_in.name = "expires_in";
      expires_in.value = hashObject.expires_in;

      const provider_token = document.createElement("input");
      provider_token.type = "hidden";
      provider_token.name = "provider_token";
      provider_token.value = hashObject.provider_token;

      const refresh_token = document.createElement("input");
      refresh_token.type = "hidden";
      refresh_token.name = "refresh_token";
      refresh_token.value = hashObject.refresh_token;

      form.appendChild(access_token);
      form.appendChild(expires_in);
      form.appendChild(provider_token);
      form.appendChild(refresh_token);

      document.body.appendChild(form);
      form.submit();
    }
  }

  return <div></div>;
}
