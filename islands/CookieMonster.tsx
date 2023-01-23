import { IS_BROWSER } from "$fresh/runtime.ts";

export default function CookieMonster({ provider }: { provider: string}) {
  if (IS_BROWSER) {
    const currentUrl = window.location.href
    const url = new URL(currentUrl);
    const token = url.hash.split('&')[0].split('=')[1];
  
    if (token) {
      document.cookie = `supatoken=${token}; path=/; Secure`
      window.location.href = `/admin`
    }
  }

  return (
    <div></div>
  );
}
