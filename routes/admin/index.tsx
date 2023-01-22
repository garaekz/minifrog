import { Head } from "$fresh/runtime.ts";
import { HandlerContext, PageProps } from "$fresh/server.ts";

export const handler = {
  GET: async (req: Request, ctx: HandlerContext) => {
    const { user } = ctx.state;
    if (!user) {
      return await new Response('', {
        status: 302,
        headers: { location: '/login' },
      });
    }
    return await ctx.render(ctx.state);
  },
};

export default function Home(props: PageProps) {
  const { user } = props.data;
  return (
    <>
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
          This is private, you should be logged in to see this.
        </p>
      </div>
    </>
  );
}
