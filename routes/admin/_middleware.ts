import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { WithSession } from "fresh_session";

export const handler = (_: Request, ctx: MiddlewareHandlerContext<WithSession>) => {
  const { session } = ctx.state;
  if (!session.get("user")) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/login",
      },
    });
  }

  return ctx.next();
};