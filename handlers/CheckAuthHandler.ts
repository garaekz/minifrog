import { MiddlewareHandlerContext } from "$fresh/server.ts";

export const checkAuthHandler = async (ctx: MiddlewareHandlerContext) => {
  const { user } = ctx.state;
  if (!user) {
    return await new Response(null, {
      status: 302,
      headers: {
        Location: "/login",
      },
    });
  }

  return await ctx.next();
};
