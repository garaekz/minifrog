import { IS_BROWSER } from "$fresh/runtime.ts";
import { useEffect, useState } from "preact/hooks";
import ElementDismisser from "../components/ElementDismisser.tsx";
import { User } from "../libs/types.ts";

export default function UserNavbarMenu({ user }: { user: User }) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <ElementDismisser isOpen={isUserMenuOpen} setIsOpen={setIsUserMenuOpen}>
      <div class="relative">
        <button
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          class="group flex mt-4 lg:mt-0 text-gray-300 hover:text-white mr-4 ring-0 focus:outline-none"
        >
          <img src={user.avatar_url} class="w-8 h-8 rounded-full mr-2" />
          <span class="font-bold group-hover:scale-105 transform transition duration-300 ease-in-out">
            {user.username}
          </span>
        </button>
        <div
          class={`${
            isUserMenuOpen ? "" : "hidden"
          } absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div class="py-1" role="none">
            <a
              href="/admin/posts/create"
              class="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
            >
              New Post
            </a>
            <a
              href="/admin/posts"
              class="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
            >
              My Posts
            </a>
            <a
              href="#"
              class="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
            >
              My Profile
            </a>
            <form
              method="POST"
              action="#"
              role="none"
              class="border-t border-gray-200"
            >
              <button
                type="submit"
                class="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                role="menuitem"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </div>
    </ElementDismisser>
  );
}
