interface DashboardCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export default function DashboardCard({
  title,
  description,
  icon,
  onClick,
}: DashboardCardProps) {
  return (
    <div
      className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800 cursor-pointer transition-transform duration-200 hover:scale-105"
      onClick={onClick}
    >
      <div className="p-5">
        <div className="flex items-center">
          {icon && (
            <div className="flex-shrink-0 mr-4 text-indigo-600 dark:text-indigo-400">
              {icon}
            </div>
          )}
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
              {title}
            </h3>
            <p className="mt-3 text-base text-gray-500 dark:text-gray-300">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
