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

  POST: async (req: Request, ctx) => {
    const { session } = ctx.state;
    const data = await req.formData();
    const title = data.get("title");
    const content = data.get("content");
    // TODO: Save to database, make this content with a wysiwyg editor
    console.log(title, content);
    return ctx.render({
      session: session.data,
    });
  },
};

export default function CreatePost({ data }: PageProps<AdminData>) {
  const { session: { user } } = data;
  return (
    <MainLayout user={user}>
      <Head>
        <title>Minifrog 🐸 🍋 | Admin Page</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <h1 class="text-4xl font-bold dark:text-gray-200">Create a new post</h1>
        <form
          method="POST"
          action=""
          class="mt-4 flex flex-col gap-4"
        >
          <div class="flex flex-col gap-2">
            <label for="title" class="dark:text-gray-200 text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              class="border-gray-300 border-2 rounded-md px-2 py-1"
            />

            <label for="content" class="dark:text-gray-200 text-gray-700">
              Content
            </label>
            <textarea
              name="content"
              id="content"
              class="border-gray-300 border-2 rounded-md px-2 py-1"
            ></textarea>
            <button
              type="submit"
              class="px-2 py-2 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600"
            >
              Create
            </button>
            <a href="/admin/posts" class="text-blue-500">
              Cancel
            </a>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
