import { Head } from "$fresh/runtime.ts";
import { HandlerContext, PageProps } from "$fresh/server.ts";
import MainLayout from "../../../layouts/MainLayout.tsx";

export const handler = {
  GET: async (_: Request, ctx: HandlerContext) => {
    return await ctx.render(ctx.state);
  },
};

export default function CreatePost(props: PageProps) {
  const { user } = props.data;
  return (
    <MainLayout user={user}>
      <Head>
        <title>Minifrog 🐸 🍋 | Admin Page</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <h1 class="text-4xl font-bold dark:text-gray-200">Create a new post</h1>
        <form
          method="POST"
          action="/admin/posts"
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
