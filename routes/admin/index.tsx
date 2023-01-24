import { Head } from "$fresh/runtime.ts";
import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import { WithSession } from "fresh_session";
import MainLayout from "../../layouts/MainLayout.tsx";
import { User } from "../../libs/types.ts";

export type AdminData = { session: Record<string, User> };

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

export default function AdminHome({ data }: PageProps<AdminData>) {
  const { session } = data;
  const user = session.user;

  return (
    <MainLayout user={user}>
      <Head>
        <title>Minifrog 🐸 🍋 | Admin Page</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <img
          src="/logo.svg"
          class="w-32 h-32"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />
        <p class="my-6">
          This is private, you should be logged in to see this.
        </p>
      </div>
    </MainLayout>
  );
}
