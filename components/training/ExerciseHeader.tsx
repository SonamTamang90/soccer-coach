import { Button } from "../ui/Button";
import { PlusIcon } from "@heroicons/react/24/outline";

export function ExerciseHeader() {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-5 sm:flex sm:items-center sm:justify-between">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl">
          Exercises
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Browse and manage your team&apos;s training exercises
        </p>
      </div>
      <div className="mt-4 sm:ml-4 sm:mt-0">
        <Button className="inline-flex items-center gap-x-1.5">
          <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          New Exercise
        </Button>
      </div>
    </div>
  );
}
