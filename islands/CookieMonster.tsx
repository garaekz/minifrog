import { IS_BROWSER } from "$fresh/runtime.ts";
import { Cookie, setCookie } from 'std/http/cookie.ts';

export default function CookieMonster({ provider }: { provider: string}) {
  if (IS_BROWSER) {
    const currentUrl = window.location.href
    const url = new URL(currentUrl);
    const token = url.hash.split('&')[0].split('=')[1];
  
    if (token) {
      const headers = new Headers();
      
      const cookie: Cookie = { name: "supabase.session.token", value: token, path: "/", httpOnly: true, secure: true, sameSite: "Lax" };
      setCookie(headers, cookie);
      window.location.href = `/admin`
    }
  }

  return (
    <div></div>
  );
}
