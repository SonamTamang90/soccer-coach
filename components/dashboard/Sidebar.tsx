"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarLinks, bottomLinks } from "@/constants/sidebarLinks";
import Logo from "../Logo";

interface SidebarProps {
  onLogout: () => void;
}

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

interface SidebarHeading {
  heading: string;
  items: SidebarItem[];
}

type SidebarLink = SidebarItem | SidebarHeading;

export default function Sidebar({ onLogout }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-gray-900 dark:bg-indigo-950">
      <div className="flex h-24 items-center justify-center">
        <Logo color="text-white" />
      </div>
      <div className="flex grow flex-col justify-between py-4">
        <nav className="space-y-2">
          {(sidebarLinks as SidebarLink[]).map((item) => {
            if ("heading" in item) {
              return (
                <div key={item.heading} className="mt-6">
                  <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    {item.heading}
                  </h3>
                  <div className="mt-1">
                    {item.items.map((subItem) => {
                      const isActive = pathname === subItem.href;
                      return (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={`group flex items-center w-full px-3 py-2 text-sm font-medium relative ${
                            isActive
                              ? "bg-cyan-600 text-white dark:bg-indigo-900"
                              : "text-gray-400 hover:bg-cyan-600/40 hover:text-white dark:hover:bg-indigo-800"
                          }`}
                        >
                          {isActive && (
                            <div className="absolute left-0 top-0 h-full w-1 bg-cyan-400" />
                          )}
                          <subItem.icon
                            className={`mr-3 h-5 w-5 flex-shrink-0 ${
                              isActive ? "text-white" : "text-gray-400"
                            }`}
                            aria-hidden="true"
                          />
                          <span className="flex-1">{subItem.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            }

            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center w-full px-3 py-2 text-sm font-medium relative ${
                  isActive
                    ? "bg-cyan-600 text-white dark:bg-indigo-900"
                    : "text-gray-400 hover:bg-cyan-600/40 hover:text-white dark:hover:bg-indigo-800"
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 h-full w-1 bg-cyan-400" />
                )}
                <item.icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 ${
                    isActive ? "text-white" : "text-gray-400"
                  }`}
                  aria-hidden="true"
                />
                <span className="flex-1">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="space-y-2 pt-6">
          {bottomLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center w-full px-3 py-2 text-sm font-medium relative ${
                  isActive
                    ? "bg-cyan-600 text-white dark:bg-indigo-900"
                    : "text-gray-400 hover:bg-cyan-600/40 hover:text-white dark:hover:bg-indigo-800"
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 h-full w-1 bg-cyan-400" />
                )}
                <item.icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 ${
                    isActive ? "text-white" : "text-gray-400"
                  }`}
                  aria-hidden="true"
                />
                <span className="flex-1">{item.name}</span>
              </Link>
            );
          })}
          <button
            onClick={onLogout}
            className="group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-indigo-100 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-800"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
