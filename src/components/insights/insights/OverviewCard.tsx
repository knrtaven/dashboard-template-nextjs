import { ArrowDown, ArrowUp, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface OverviewCardProps {
  title: string;
  description: string;
  score?: number;
  percentageChange?: number;
  visibleTo: string[];
}

const OverviewCard = ({
  title,
  description,
  score,
  percentageChange,
  visibleTo,
}: OverviewCardProps) => {
  return (
    <Link
      href={`/insights/overview/${title.toLowerCase().replace(/ /g, '-')}/current`}
      className="relative h-full w-full shrink-0 cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="absolute top-4 right-4 hidden lg:flex">
        <button className="rounded-full border border-gray-200 bg-white p-2 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>
      </div>
      <div className="space-y-3 px-4 py-6">
        {(score !== undefined || percentageChange !== undefined) && (
          <div className="flex items-center gap-2">
            {score !== undefined && (
              <h3 className="text-theme-purple-500 text-6xl font-thin">{score}%</h3>
            )}
            {percentageChange !== undefined && (
              <span
                className={`flex items-center gap-1 ${percentageChange > 0 ? 'text-green-500' : 'text-red-500'}`}
              >
                {percentageChange > 0 ? '+' : ''}
                {percentageChange}%
                {percentageChange > 0 ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <ArrowDown className="h-4 w-4" />
                )}
              </span>
            )}
          </div>
        )}
        <h2 className="text-lg font-bold text-gray-800 dark:text-white">{title}</h2>
        <div className="flex flex-wrap gap-2">
          {visibleTo.map((role) => (
            <span
              key={role}
              className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300"
            >
              {role}
            </span>
          ))}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
    </Link>
  );
};

export default OverviewCard;
