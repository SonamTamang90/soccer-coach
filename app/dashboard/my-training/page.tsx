"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarIcon,
  ClockIcon,
  ChartBarIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

interface Exercise {
  _id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  difficulty: "beginner" | "intermediate" | "advanced";
  category: "technical" | "tactical" | "physical" | "mental";
  status: "assigned" | "in_progress" | "completed";
  assignedDate: string;
  completedDate?: string;
}

interface TrainingProgress {
  totalExercises: number;
  completedExercises: number;
  averageScore: number;
  streak: number; // consecutive days of training
}

export default function MyTraining() {
  const router = useRouter();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [progress, setProgress] = useState<TrainingProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    const mockExercises: Exercise[] = [
      {
        _id: "1",
        name: "Ball Control Drills",
        description:
          "Practice various ball control techniques including first touch, dribbling, and ball manipulation.",
        duration: 30,
        difficulty: "intermediate",
        category: "technical",
        status: "assigned",
        assignedDate: "2024-03-19",
      },
      {
        _id: "2",
        name: "Shooting Practice",
        description:
          "Work on shooting accuracy and power from different positions.",
        duration: 45,
        difficulty: "advanced",
        category: "technical",
        status: "completed",
        assignedDate: "2024-03-18",
        completedDate: "2024-03-18",
      },
    ];

    const mockProgress: TrainingProgress = {
      totalExercises: 10,
      completedExercises: 7,
      averageScore: 85,
      streak: 5,
    };

    setExercises(mockExercises);
    setProgress(mockProgress);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        My Training
      </h2>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Completion Rate
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {progress
                  ? Math.round(
                      (progress.completedExercises / progress.totalExercises) *
                        100
                    )
                  : 0}
                %
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ChartBarIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Average Score
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {progress?.averageScore || 0}%
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CalendarIcon className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Training Streak
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {progress?.streak || 0} days
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ClockIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Training Time
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {exercises.reduce((acc, ex) => acc + ex.duration, 0)} mins
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Assigned Exercises */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Assigned Exercises
          </h3>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {exercises.map((exercise) => (
              <li
                key={exercise._id}
                className="px-4 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() =>
                  router.push(`/dashboard/my-training/exercise/${exercise._id}`)
                }
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                      {exercise.name}
                    </h4>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {exercise.description}
                    </p>
                    <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {exercise.duration} mins
                      </span>
                      <span className="capitalize">{exercise.difficulty}</span>
                      <span className="capitalize">{exercise.category}</span>
                    </div>
                  </div>
                  <div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${
                        exercise.status === "completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : exercise.status === "in_progress"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      }`}
                    >
                      {exercise.status
                        .replace("_", " ")
                        .charAt(0)
                        .toUpperCase() + exercise.status.slice(1)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
