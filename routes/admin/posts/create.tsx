import { Handlers, PageProps } from "$fresh/server.ts";
import { useEffect, useState } from "preact/hooks";
import { WithSession } from "fresh_session";
import CreatePostIsland from "../../../islands/CreatePost.tsx";
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
  const [content, setContent] = useState<string>("");
  
  const callback = payload => {
    setContent(payload)
    console.log(content)
  }

  useEffect(() => {
    console.log('content changed', content);
  }, [content]);
  
  return (
    <MainLayout user={user} headTitle="New Post">
      <div class="p-4 mx-auto max-w-screen-md">
        <CreatePostIsland />
      </div>
      {/* <div class="p-4 mx-auto max-w-screen-md">
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
            <RichContent callback={callback}/>
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
      </div> */}
    </MainLayout>
  );
}
