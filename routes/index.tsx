import { Head } from "$fresh/runtime.ts";
import { HandlerContext, PageProps } from "$fresh/server.ts";
import MainLayout from "../layouts/MainLayout.tsx";

export const handler = {
  GET: async (req: Request, ctx: HandlerContext) => {
    return await ctx.render(ctx.state);
  },
};

export default function Home(props: PageProps) {
  const { user } = props.data;

  return (
    <MainLayout>
      <Head>
        <title>Fresh App</title>
      </Head>
      {user && (
        <h1> Hi {user.user_metadata.user_name} </h1>
      )}
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
