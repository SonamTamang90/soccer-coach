"use client";
import React from "react";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";

// Mock player data (should match the IDs from the team page)
const players = [
  {
    id: 1,
    name: "John Smith",
    number: 9,
    imageUrl:
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&auto=format&fit=crop&q=60",
    nationality: "England",
    position: "Forward",
    height: "1.85 m",
    weight: "78 kg",
    currentTeam: "Eagles",
    birthday: "1997-04-15",
    age: 25,
    stats: [
      {
        season: 2018,
        team: "Eagles",
        goals: 20,
        assists: 8,
        yellow: 2,
        red: 0,
      },
      {
        season: 2019,
        team: "Eagles",
        goals: 18,
        assists: 10,
        yellow: 1,
        red: 0,
      },
      {
        season: 2020,
        team: "Eagles",
        goals: 22,
        assists: 12,
        yellow: 3,
        red: 0,
      },
      {
        season: 2021,
        team: "Eagles",
        goals: 15,
        assists: 7,
        yellow: 2,
        red: 0,
      },
      {
        season: 2022,
        team: "Eagles",
        goals: 17,
        assists: 9,
        yellow: 1,
        red: 0,
      },
    ],
  },
  // Add more players as needed
];

function getPlayer(id: number) {
  return players.find((p) => p.id === id);
}

interface PlayerDetailsProps {
  params: { id: string };
}

const PlayerDetails: React.FC<PlayerDetailsProps> = ({ params }) => {
  const router = useRouter();
  const player = getPlayer(Number(params.id));
  if (!player) return notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded transition-colors"
      >
        ← Back
      </button>
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-shrink-0">
          <div className="flex items-center mb-4">
            <div className="bg-primary text-white rounded-md w-14 h-14 flex items-center justify-center text-3xl font-bold mr-4">
              {player.number}
            </div>
            <h1 className="text-4xl font-bold text-gray-800">{player.name}</h1>
          </div>
          <Image
            src={player.imageUrl}
            alt={player.name}
            width={300}
            height={300}
            className="rounded-lg object-cover border"
          />
        </div>
        <div className="flex-1">
          <div className="bg-gray-50 border rounded-lg p-6 mb-8">
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              <div className="font-semibold">Nationality</div>
              <div>🇬🇧 {player.nationality}</div>
              <div className="font-semibold">Position</div>
              <div>{player.position}</div>
              <div className="font-semibold">Height</div>
              <div>{player.height}</div>
              <div className="font-semibold">Weight</div>
              <div>{player.weight}</div>
              <div className="font-semibold">Current Team</div>
              <div>{player.currentTeam}</div>
              <div className="font-semibold">Birthday</div>
              <div>{new Date(player.birthday).toLocaleDateString()}</div>
              <div className="font-semibold">Age</div>
              <div>{player.age}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4 border-b-4 border-primary pb-2 inline-block">
          Primary League
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-2 px-4 font-semibold">Season</th>
                <th className="py-2 px-4 font-semibold">Team</th>
                <th className="py-2 px-4 font-semibold">Goals</th>
                <th className="py-2 px-4 font-semibold">Assists</th>
                <th className="py-2 px-4 font-semibold">Yellow Cards</th>
                <th className="py-2 px-4 font-semibold">Red Cards</th>
              </tr>
            </thead>
            <tbody>
              {player.stats.map((stat) => (
                <tr key={stat.season} className="border-t">
                  <td className="py-2 px-4">{stat.season}</td>
                  <td className="py-2 px-4">{stat.team}</td>
                  <td className="py-2 px-4">{stat.goals}</td>
                  <td className="py-2 px-4">{stat.assists}</td>
                  <td className="py-2 px-4">{stat.yellow}</td>
                  <td className="py-2 px-4">{stat.red}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PlayerDetails;
