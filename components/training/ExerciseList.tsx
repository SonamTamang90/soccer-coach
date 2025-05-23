import {
  ClockIcon,
  UserGroupIcon,
  ChartBarIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

interface Exercise {
  id: string;
  title: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  players: number;
  description: string;
  skills: string[];
}

const mockExercises: Exercise[] = [
  {
    id: "1",
    title: "Passing Triangle Drill",
    duration: "20 min",
    difficulty: "Intermediate",
    category: "Technical",
    players: 6,
    description:
      "Improve passing accuracy and movement in a triangular formation",
    skills: ["Passing", "Movement", "First Touch"],
  },
  {
    id: "2",
    title: "Small-Sided Game",
    duration: "30 min",
    difficulty: "Advanced",
    category: "Tactical",
    players: 8,
    description: "4v4 game focusing on quick transitions and pressing",
    skills: ["Decision Making", "Pressing", "Transition"],
  },
];

export function ExerciseList() {
  return (
    <div className="mt-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockExercises.map((exercise) => (
          <div
            key={exercise.id}
            className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="flex flex-1 flex-col p-6">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {exercise.title}
                </h3>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <ClockIcon className="mr-2 h-5 w-5" />
                    <span>{exercise.duration}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <UserGroupIcon className="mr-2 h-5 w-5" />
                    <span>{exercise.players} players</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <ChartBarIcon className="mr-2 h-5 w-5" />
                    <span>{exercise.difficulty}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <TagIcon className="mr-2 h-5 w-5" />
                    <span>{exercise.category}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {exercise.description}
                  </p>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    Skills:
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {exercise.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center rounded-full bg-cyan-100 px-2.5 py-0.5 text-xs font-medium text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
