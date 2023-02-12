import { HandlerContext, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { ComponentChildren } from "preact";
import { Navbar } from "../components/Navbar.tsx";
import { User } from "../libs/types.ts";

const handle = {
  GET: async (_: Request, ctx: HandlerContext) => {
    return await ctx.render(ctx.state);
  },
};

export default function MainLayout({ children, user, headTitle }: { children: ComponentChildren, user: User | null, headTitle?: string }) {
  return (
    <>
      <Head>
        <title>
          { headTitle ? `${headTitle} | Minifrog 🐸 🍋` : "Minifrog 🐸 🍋" }
        </title>
      </Head>
      <Navbar user={user} />
      <div class="min-w-full min-h-screen w-full h-full dark:bg-gray-900 text-gray-900 dark:text-gray-100 pt-20">
        {children}
      </div>
    </>
  );
}