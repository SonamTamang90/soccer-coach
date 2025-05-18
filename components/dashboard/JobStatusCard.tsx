import { ReactNode } from "react";

interface JobStatusCardProps {
  title: string;
  count: number;
  icon: ReactNode;
  color: string;
  onClick?: () => void;
}

export default function JobStatusCard({
  title,
  count,
  icon,
  color,
  onClick,
}: JobStatusCardProps) {
  return (
    <div
      onClick={onClick}
      className={`overflow-hidden rounded-lg ${color} shadow transition-transform duration-200 hover:scale-105 cursor-pointer`}
    >
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0 rounded-md bg-white bg-opacity-20 p-3">
            {icon}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="truncate text-sm font-medium text-gray-900 dark:text-white">
                {title}
              </dt>
              <dd>
                <div className="text-lg font-medium text-gray-900 dark:text-white">
                  {count}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
