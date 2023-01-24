import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { WithSession } from "fresh_session";
import MainLayout from "../../../layouts/MainLayout.tsx";
import { AdminData } from "../index.tsx";

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

export default function MyPosts({ data }: PageProps<AdminData>) {
  const { session: { user } } = data;
  return (
    <MainLayout user={user}>
      <Head>
        <title>Minifrog 🐸 🍋 | Admin Page</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <h1 class="text-4xl font-bold dark:text-gray-200"> Welcome to the admin page</h1>
      </div>
    </MainLayout>
  );
}
