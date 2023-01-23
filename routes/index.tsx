import { Head } from "$fresh/runtime.ts";
import { HandlerContext, PageProps } from "$fresh/server.ts";
import MainLayout from "../layouts/MainLayout.tsx";
import { User } from "../libs/types.ts";

export const handler = {
  GET: async (req: Request, ctx: HandlerContext) => {
    return await ctx.render(ctx.state);
  },
};

export default function Home({ data: { user } }: { data: { user: User } } ) {
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
      </div>
    </MainLayout>
  );
}
