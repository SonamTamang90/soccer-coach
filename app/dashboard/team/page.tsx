"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  UserGroupIcon,
  UserPlusIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

interface Player {
  _id: string;
  name: string;
  position: string;
  number: number;
  age: number;
  stats: {
    goals: number;
    assists: number;
    matches: number;
  };
}

interface Team {
  _id: string;
  name: string;
  players: Player[];
  stats: {
    matchesPlayed: number;
    wins: number;
    draws: number;
    losses: number;
  };
}

export default function TeamManagement() {
  const router = useRouter();
  const [team, setTeam] = useState<Team | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    const mockTeam: Team = {
      _id: "1",
      name: "FC United",
      players: [
        {
          _id: "1",
          name: "John Doe",
          position: "Forward",
          number: 9,
          age: 25,
          stats: { goals: 15, assists: 8, matches: 20 },
        },
        {
          _id: "2",
          name: "Mike Smith",
          position: "Midfielder",
          number: 8,
          age: 23,
          stats: { goals: 5, assists: 12, matches: 22 },
        },
      ],
      stats: {
        matchesPlayed: 25,
        wins: 15,
        draws: 5,
        losses: 5,
      },
    };
    setTeam(mockTeam);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Team Management
        </h2>
        <div className="flex space-x-4">
          <button
            onClick={() => router.push("/dashboard/team/add-player")}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <UserPlusIcon className="h-5 w-5 mr-2" />
            Add Player
          </button>
          <button
            onClick={() => router.push("/dashboard/team/settings")}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            <Cog6ToothIcon className="h-5 w-5 mr-2" />
            Team Settings
          </button>
        </div>
      </div>

      {/* Team Overview */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Team Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Matches Played
            </p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {team?.stats.matchesPlayed}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Wins</p>
            <p className="text-2xl font-semibold text-green-600 dark:text-green-400">
              {team?.stats.wins}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Draws</p>
            <p className="text-2xl font-semibold text-yellow-600 dark:text-yellow-400">
              {team?.stats.draws}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Losses</p>
            <p className="text-2xl font-semibold text-red-600 dark:text-red-400">
              {team?.stats.losses}
            </p>
          </div>
        </div>
      </div>

      {/* Team Roster */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Team Roster
          </h3>
          <div className="flex items-center">
            <UserGroupIcon className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {team?.players.length} Players
            </span>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Player
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Age
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Stats
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {team?.players.map((player) => (
                <tr
                  key={player._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() =>
                    router.push(`/dashboard/team/player/${player._id}`)
                  }
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {player.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {player.position}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {player.number}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {player.age}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {player.stats.goals}G {player.stats.assists}A (
                      {player.stats.matches}M)
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
