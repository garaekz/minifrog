
import { PageProps } from "$fresh/server.ts";
import CookieMonster from "../../../islands/CookieMonster.tsx";

export default function AuthProviderCallback(props: PageProps) {
  const { provider } = props.params;
  return (
    <>
      <CookieMonster provider={provider} />
    </>
  );
}
