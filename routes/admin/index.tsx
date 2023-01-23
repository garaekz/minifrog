import { Head } from "$fresh/runtime.ts";
import { HandlerContext, PageProps } from "$fresh/server.ts";
import { checkAuthHandler } from "../../handlers/CheckAuthHandler.ts";
import MainLayout from "../../layouts/MainLayout.tsx";

export const handler = {
  GET: async (_: Request, ctx: HandlerContext) => {
    return await ctx.render(ctx.state);
  },
};

export default function Home(props: PageProps) {
  const { user } = props.data;
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
