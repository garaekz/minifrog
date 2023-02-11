import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import MainLayout from "../layouts/MainLayout.tsx";
import { User } from "../libs/types.ts";
import { AdminData } from "./admin/index.tsx";
import { WithSession } from "fresh_session";
import RichContent from "../islands/RichContent.tsx";

export const handler: Handlers<
AdminData,
WithSession
> = {
  GET: (_, ctx) => {
    const { session } = ctx.state;

    return ctx.render({
      session: session.data,
    });
  },
};

export default function Home({ data }: PageProps<AdminData>) {
  const { session } = data;
  const user = session.user;
  
  return (
    <MainLayout user={user}>
      <Head>
        <title>Minifrog 🐸 🍋 | Home</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <img
          src="/logo.svg"
          class="w-32 h-32"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />
        <p class="my-6">
          Welcome to `fresh`. Try updating this message in the ./routes/index.tsx
          file, and refresh.
        </p>
        <RichContent />
      </div>
    </MainLayout>
  );
}
