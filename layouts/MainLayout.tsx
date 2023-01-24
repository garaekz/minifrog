import { HandlerContext, PageProps } from "$fresh/server.ts";
import { ComponentChildren } from "preact";
import { Navbar } from "../components/Navbar.tsx";
import { User } from "../libs/types.ts";

const handle = {
  GET: async (_: Request, ctx: HandlerContext) => {
    return await ctx.render(ctx.state);
  },
};

export default function MainLayout({ children, user }: { children: ComponentChildren, user: User | null }) {
  return (
    <>
      <Navbar user={user} />
      <div class="min-w-full min-h-screen w-full h-full dark:bg-gray-700 ">{children}</div>
    </>
  );
}