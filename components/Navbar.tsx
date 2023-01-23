import { User } from "../libs/types.ts";
import { useState } from "preact/hooks";
import UserNavbarMenu from "../islands/UserNavbarMenu.tsx";

export function Navbar({ user }: { user: User }) {
  return (
    <nav class="flex justify-center w-full dark:bg-gray-800">
      <div class="flex justify-between flex-wrap py-4 max-w-5xl w-full mx-auto ">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <a href="/">
            <img
              src="/logo.svg"
              class="w-10 h-10"
              alt="the fresh logo: a sliced lemon dripping with juice"
            />
          </a>
        </div>
        <div class="block lg:hidden">
          <button class="flex items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white">
            <svg
              class="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div class="block lg:flex lg:items-center lg:w-auto">
          <div class="flex">
            <a
              href="#responsive-header"
              class="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4"
            >
              Docs
            </a>
            <a
              href="#responsive-header"
              class="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4"
            >
              Examples
            </a>
            <a
              href="#responsive-header"
              class="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4"
            >
              Blog
            </a>
            {user ? (
              <UserNavbarMenu user={user} />
            ) : (
              <a
                href="/login"
                class="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white"
              >
                Login
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
