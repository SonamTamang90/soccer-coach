interface DashboardCardProps {
  title: string;
  description: string;
}

export default function DashboardCard({
  title,
  description,
}: DashboardCardProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
      <div className="p-5">
        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="mt-3 text-base text-gray-500 dark:text-gray-300">
          {description}
        </p>
      </div>
    </div>
  );
}
