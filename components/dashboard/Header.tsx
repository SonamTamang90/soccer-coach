"use client";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

interface UserData {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface HeaderProps {
  user: UserData | null;
  onLogout: () => void;
}

export default function Header({ user, onLogout }: HeaderProps) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex-1">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Dashboard
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={toggleTheme}
          className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-gray-800 dark:text-gray-300 dark:hover:text-gray-200"
        >
          <span className="sr-only">Toggle dark mode</span>
          {theme === "dark" ? (
            <SunIcon className="h-6 w-6" aria-hidden="true" />
          ) : (
            <MoonIcon className="h-6 w-6" aria-hidden="true" />
          )}
        </button>

        <button
          type="button"
          className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-gray-800 dark:text-gray-300 dark:hover:text-gray-200"
        >
          <span className="sr-only">View notifications</span>
          <BellIcon className="h-6 w-6" aria-hidden="true" />
        </button>

        {/* Profile dropdown */}
        <Menu as="div" className="relative ml-3">
          <div>
            <Menu.Button className="flex items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-gray-800">
              <span className="sr-only">Open user menu</span>
              {user?.avatar ? (
                <Image
                  className="h-8 w-8 rounded-full"
                  src={user.avatar}
                  alt={user.name}
                  width={32}
                  height={32}
                />
              ) : (
                <UserCircleIcon className="h-8 w-8 text-gray-400 dark:text-gray-300" />
              )}
              <span className="ml-2 hidden text-sm font-medium text-gray-700 md:block dark:text-gray-300">
                {user?.name}
              </span>
              <ChevronDownIcon className="ml-1 h-5 w-5 text-gray-400 dark:text-gray-300" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 dark:ring-gray-700">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/dashboard/profile"
                    className={`${
                      active ? "bg-gray-100 dark:bg-gray-700" : ""
                    } block px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                  >
                    Your Profile
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/dashboard/settings"
                    className={`${
                      active ? "bg-gray-100 dark:bg-gray-700" : ""
                    } block px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                  >
                    Settings
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={onLogout}
                    className={`${
                      active ? "bg-gray-100 dark:bg-gray-700" : ""
                    } block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200`}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </header>
  );
}
