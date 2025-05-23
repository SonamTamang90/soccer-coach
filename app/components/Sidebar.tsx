"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  UserGroupIcon,
  CalendarIcon,
  AcademicCapIcon,
  TrophyIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

interface NavSection {
  name: string;
  items: NavItem[];
  icon: React.ComponentType<{ className?: string }>;
}

const navigation: NavSection[] = [
  {
    name: "Dashboard",
    icon: HomeIcon,
    items: [
      { name: "Overview", href: "/dashboard", icon: HomeIcon },
      { name: "Quick Stats", href: "/dashboard/stats", icon: ChartBarIcon },
      {
        name: "Recent Activities",
        href: "/dashboard/activities",
        icon: CalendarIcon,
      },
    ],
  },
  {
    name: "Team Management",
    icon: UserGroupIcon,
    items: [
      { name: "Team Overview", href: "/dashboard/team", icon: UserGroupIcon },
      {
        name: "Player Roster",
        href: "/dashboard/team/roster",
        icon: UserGroupIcon,
      },
      {
        name: "Team Statistics",
        href: "/dashboard/team/stats",
        icon: ChartBarIcon,
      },
      {
        name: "Team Calendar",
        href: "/dashboard/team/calendar",
        icon: CalendarIcon,
      },
    ],
  },
  {
    name: "Training",
    icon: AcademicCapIcon,
    items: [
      {
        name: "Training Schedule",
        href: "/dashboard/training",
        icon: CalendarIcon,
      },
      {
        name: "Training Sessions",
        href: "/dashboard/training/sessions",
        icon: AcademicCapIcon,
      },
      {
        name: "Training Programs",
        href: "/dashboard/training/programs",
        icon: AcademicCapIcon,
      },
      {
        name: "Exercise Library",
        href: "/dashboard/training/exercises",
        icon: AcademicCapIcon,
      },
      {
        name: "Training Videos",
        href: "/dashboard/training/videos",
        icon: AcademicCapIcon,
      },
    ],
  },
  {
    name: "Player Development",
    icon: UserGroupIcon,
    items: [
      {
        name: "Individual Training",
        href: "/dashboard/my-training",
        icon: AcademicCapIcon,
      },
      {
        name: "Performance Tracking",
        href: "/dashboard/performance",
        icon: ChartBarIcon,
      },
      {
        name: "Skill Assessment",
        href: "/dashboard/skills",
        icon: AcademicCapIcon,
      },
      {
        name: "Progress Reports",
        href: "/dashboard/progress",
        icon: ChartBarIcon,
      },
      { name: "Player Notes", href: "/dashboard/notes", icon: AcademicCapIcon },
    ],
  },
  {
    name: "Matches",
    icon: TrophyIcon,
    items: [
      {
        name: "Upcoming Matches",
        href: "/dashboard/matches",
        icon: CalendarIcon,
      },
      {
        name: "Match History",
        href: "/dashboard/matches/history",
        icon: TrophyIcon,
      },
      {
        name: "Match Statistics",
        href: "/dashboard/matches/stats",
        icon: ChartBarIcon,
      },
      {
        name: "Match Reports",
        href: "/dashboard/matches/reports",
        icon: TrophyIcon,
      },
      {
        name: "Opposition Analysis",
        href: "/dashboard/matches/analysis",
        icon: ChartBarIcon,
      },
    ],
  },
  {
    name: "Analytics",
    icon: ChartBarIcon,
    items: [
      {
        name: "Team Performance",
        href: "/dashboard/analytics/team",
        icon: ChartBarIcon,
      },
      {
        name: "Player Statistics",
        href: "/dashboard/analytics/players",
        icon: ChartBarIcon,
      },
      {
        name: "Training Metrics",
        href: "/dashboard/analytics/training",
        icon: ChartBarIcon,
      },
      {
        name: "Progress Trends",
        href: "/dashboard/analytics/trends",
        icon: ChartBarIcon,
      },
      {
        name: "Custom Reports",
        href: "/dashboard/analytics/reports",
        icon: ChartBarIcon,
      },
    ],
  },
  {
    name: "Settings",
    icon: Cog6ToothIcon,
    items: [
      {
        name: "Team Settings",
        href: "/dashboard/settings/team",
        icon: Cog6ToothIcon,
      },
      {
        name: "User Management",
        href: "/dashboard/settings/users",
        icon: UserGroupIcon,
      },
      {
        name: "Notifications",
        href: "/dashboard/settings/notifications",
        icon: Cog6ToothIcon,
      },
      {
        name: "System Config",
        href: "/dashboard/settings/system",
        icon: Cog6ToothIcon,
      },
      {
        name: "Help & Support",
        href: "/dashboard/settings/help",
        icon: Cog6ToothIcon,
      },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSection = (sectionName: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  };

  const isActive = (href: string) => {
    return pathname === href || pathname?.startsWith(href + "/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const SidebarContent = () => (
    <div className="flex h-full w-64 flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Soccer Coach
        </h1>
        <button
          onClick={closeMobileMenu}
          className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {navigation.map((section) => (
          <div key={section.name} className="space-y-1">
            <button
              onClick={() => toggleSection(section.name)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              <div className="flex items-center">
                <section.icon className="mr-3 h-5 w-5" />
                <span>{section.name}</span>
              </div>
              {expandedSections[section.name] ? (
                <ChevronDownIcon className="h-4 w-4" />
              ) : (
                <ChevronRightIcon className="h-4 w-4" />
              )}
            </button>
            {expandedSections[section.name] && (
              <div className="ml-4 space-y-1">
                {section.items.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium ${
                      isActive(item.href)
                        ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-200"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="ml-auto rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-600 dark:bg-indigo-900 dark:text-indigo-200">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleMobileMenu}
        className="fixed top-4 left-4 z-50 lg:hidden rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900 bg-opacity-50 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </div>
    </>
  );
}
