interface ConsolidatedJobCardProps {
  appliedCount: number;
  recentJobTitle?: string;
  daysSinceSubmission?: number;
  onClick?: () => void;
}

export default function ConsolidatedJobCard({
  appliedCount,
  recentJobTitle,
  daysSinceSubmission,
  onClick,
}: ConsolidatedJobCardProps) {
  return (
    <div
      onClick={onClick}
      className="overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Job Application Status
          </h3>
          <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
            Active
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Applied Jobs
            </span>
            <span className="mt-1 text-3xl font-bold text-blue-600 dark:text-blue-400">
              {appliedCount}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Recent Application
            </span>
            <span className="mt-1 text-lg font-medium text-gray-800 truncate dark:text-gray-200">
              {recentJobTitle || "No applications yet"}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Last Submitted
            </span>
            <span className="mt-1 text-2xl font-bold text-gray-800 dark:text-gray-200">
              {daysSinceSubmission !== undefined
                ? `${daysSinceSubmission} ${
                    daysSinceSubmission === 1 ? "day" : "days"
                  } ago`
                : "N/A"}
            </span>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Click to view all applications
            </span>
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
