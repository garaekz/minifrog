import { Head } from "$fresh/runtime.ts";

export default function Login() {
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <img
          src="/logo.svg"
          class="w-32 h-32"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />
        <h1>Login Page</h1>
        <p class="my-6">
          Welcome to `fresh`. Try updating this message in the ./routes/index.tsx
          file, and refresh.
        </p>
        <SocialLoginButton provider="github">Login with Github</SocialLoginButton>
      </div>
    </>
  );
}

// Social Login button
export function SocialLoginButton({ provider, children } : { provider: string, children: Element|string }) {
  return (
    <a href={`/login/${provider}`} class="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      {children}
    </a>
  )
}
