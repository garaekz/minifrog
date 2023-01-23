import { Head } from "$fresh/runtime.ts";
import { HandlerContext, PageProps } from "$fresh/server.ts";
import MainLayout from "../../../layouts/MainLayout.tsx";

export default function CreatePost(props: PageProps) {
  const { user } = props.data;
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
