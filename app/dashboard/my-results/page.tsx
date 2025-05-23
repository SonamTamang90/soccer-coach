"use client";

import React from "react";
import { Dumbbell, HeartPulse, Crosshair, Star, Timer } from "lucide-react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const stats = [
  {
    label: "Strength",
    value: 14.67,
    icon: Dumbbell,
    color: "text-green-500",
    bg: "bg-green-100",
  },
  {
    label: "Endurance",
    value: 0.43,
    icon: HeartPulse,
    color: "text-red-500",
    bg: "bg-red-100",
  },
  {
    label: "Precision",
    value: 5.45,
    icon: Crosshair,
    color: "text-blue-500",
    bg: "bg-blue-100",
  },
  {
    label: "Technique",
    value: 13.87,
    icon: Star,
    color: "text-yellow-500",
    bg: "bg-yellow-100",
  },
  {
    label: "Speed",
    value: 10.98,
    icon: Timer,
    color: "text-cyan-500",
    bg: "bg-cyan-100",
  },
];

const mockResults = [
  "Sprinters fast punch",
  "Sprinters fast punch",
  "Sprinters fast punch",
  "Sprinters fast punch",
  "Sprinters fast punch",
];

const mockValues = [3.54, 3.54, 3.54, 3.54, 3.54];

const radarData = {
  labels: ["Strength", "Endurance", "Precision", "Technique", "Speed"],
  datasets: [
    {
      label: "Score",
      data: [1.76, 3.69, 3.19, 2.63, 3.54],
      backgroundColor: "rgba(59, 130, 246, 0.2)",
      borderColor: "#3b82f6",
      borderWidth: 2,
      pointBackgroundColor: "#3b82f6",
    },
  ],
};

const radarOptions = {
  scales: {
    r: {
      angleLines: { display: false },
      suggestedMin: 0,
      suggestedMax: 5,
      pointLabels: {
        font: { size: 14 },
        color: "#64748b",
      },
      ticks: {
        display: false,
      },
      grid: {
        color: "#e5e7eb",
      },
    },
  },
  plugins: {
    legend: { display: false },
  },
  responsive: true,
  maintainAspectRatio: false,
};

const MyResults = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl shadow p-5 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className={`rounded-full p-2 ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </span>
              <span className="uppercase font-bold text-gray-500 text-xs tracking-wider">
                {stat.label}
              </span>
              <span className="ml-auto text-2xl font-bold text-gray-800">
                {stat.value}
              </span>
            </div>
            <ol className="mt-2 mb-2 space-y-1 text-sm text-gray-700">
              {mockResults.map((result, i) => (
                <li key={i} className="flex items-center justify-between">
                  <span>
                    {i + 1}. {result}
                  </span>
                  <span className="font-medium">{mockValues[i]}</span>
                </li>
              ))}
            </ol>
            <div className="flex items-center justify-end mt-auto">
              <a
                href="#"
                className="text-xs text-blue-600 font-semibold hover:underline"
              >
                TAKE THE TEST
              </a>
            </div>
          </div>
        ))}
        {/* Radar Chart Card */}
        <div className="bg-white rounded-xl shadow p-5 flex flex-col md:col-span-3 min-h-[300px]">
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-full h-60">
              <Radar data={radarData} options={radarOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyResults;
