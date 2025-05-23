"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardCard } from "@/components/dashboard";
import {
  UserCircleIcon,
  UserGroupIcon,
  CalendarIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";

interface UserData {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "player" | "coach" | "team_manager";
  teamId?: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push("/sign-in");
    }
  }, [router]);

  if (!isClient || !user) {
    return null;
  }

  const isTeamManager = user.role === "team_manager";
  const isCoach = user.role === "coach";
  const isPlayer = user.role === "player";

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Welcome back, {user.name}!
      </h2>

      {/* Role-specific welcome message */}
      <div className="overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
            {isTeamManager && "Team Management Dashboard"}
            {isCoach && "Coach's Dashboard"}
            {isPlayer && "Player's Dashboard"}
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-400">
            <p>
              {isTeamManager &&
                "Manage your team, schedule training sessions, and track team performance."}
              {isCoach &&
                "Plan training sessions, monitor player progress, and manage team activities."}
              {isPlayer &&
                "Track your training progress, view upcoming sessions, and monitor your performance."}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {(isTeamManager || isCoach) && (
          <>
            <DashboardCard
              title="Team Management"
              description="Manage team roster, view player profiles, and handle team settings."
              icon={<UserGroupIcon className="h-6 w-6" />}
              onClick={() => router.push("/dashboard/team")}
            />
            <DashboardCard
              title="Training Schedule"
              description="Create and manage training sessions, drills, and team practices."
              icon={<CalendarIcon className="h-6 w-6" />}
              onClick={() => router.push("/dashboard/training")}
            />
            <DashboardCard
              title="Performance Analytics"
              description="Track team performance metrics and player statistics."
              icon={<ChartBarIcon className="h-6 w-6" />}
              onClick={() => router.push("/dashboard/analytics")}
            />
          </>
        )}

        {isPlayer && (
          <>
            <DashboardCard
              title="My Training"
              description="View your training schedule and assigned exercises."
              icon={<ClipboardDocumentListIcon className="h-6 w-6" />}
              onClick={() => router.push("/dashboard/my-training")}
            />
            <DashboardCard
              title="Progress Tracking"
              description="Monitor your performance metrics and improvement over time."
              icon={<ChartBarIcon className="h-6 w-6" />}
              onClick={() => router.push("/dashboard/progress")}
            />
            <DashboardCard
              title="Achievements"
              description="View your accomplishments and earned badges."
              icon={<TrophyIcon className="h-6 w-6" />}
              onClick={() => router.push("/dashboard/achievements")}
            />
          </>
        )}
      </div>

      {/* Recent Activity Section */}
      <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
            Recent Activity
          </h3>
          <div className="mt-4">
            {/* This would be populated with actual activity data */}
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isTeamManager && "No recent team activities"}
              {isCoach && "No recent training sessions"}
              {isPlayer && "No recent training activities"}
            </p>
          </div>
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
            Upcoming Events
          </h3>
          <div className="mt-4">
            {/* This would be populated with actual event data */}
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isTeamManager && "No upcoming team events"}
              {isCoach && "No upcoming training sessions"}
              {isPlayer && "No upcoming training sessions"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
