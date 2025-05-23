"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarIcon,
  PlusIcon,
  UserGroupIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

interface TrainingSession {
  _id: string;
  title: string;
  date: string;
  time: string;
  duration: number; // in minutes
  type: "team" | "individual" | "position";
  focus: string;
  players: string[];
  status: "scheduled" | "completed" | "cancelled";
}

export default function TrainingSchedule() {
  const router = useRouter();
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    const mockSessions: TrainingSession[] = [
      {
        _id: "1",
        title: "Team Practice",
        date: "2024-03-20",
        time: "16:00",
        duration: 120,
        type: "team",
        focus: "Tactical Training",
        players: ["1", "2", "3"],
        status: "scheduled",
      },
      {
        _id: "2",
        title: "Striker Training",
        date: "2024-03-21",
        time: "15:00",
        duration: 90,
        type: "position",
        focus: "Finishing Drills",
        players: ["1", "5"],
        status: "scheduled",
      },
    ];
    setSessions(mockSessions);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Training Schedule
        </h2>
        <button
          onClick={() => router.push("/dashboard/training/new")}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          New Training Session
        </button>
      </div>

      {/* Upcoming Sessions */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Upcoming Sessions
          </h3>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {sessions.map((session) => (
              <li
                key={session._id}
                className="px-4 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() =>
                  router.push(`/dashboard/training/${session._id}`)
                }
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <CalendarIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                        {session.title}
                      </h4>
                      <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {session.date} at {session.time} ({session.duration}{" "}
                        mins)
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <UserGroupIcon className="h-4 w-4 mr-1" />
                        {session.type === "team"
                          ? "Team Training"
                          : session.type === "position"
                          ? "Position Training"
                          : "Individual Training"}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${
                        session.status === "scheduled"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : session.status === "completed"
                          ? "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {session.status.charAt(0).toUpperCase() +
                        session.status.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Focus: {session.focus}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Training Calendar */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Training Calendar
        </h3>
        {/* TODO: Implement calendar component */}
        <div className="text-center text-gray-500 dark:text-gray-400">
          Calendar view coming soon...
        </div>
      </div>
    </div>
  );
}
