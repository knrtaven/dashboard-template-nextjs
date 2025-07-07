import { ArrowDown, ArrowUp } from 'lucide-react';

interface OverviewCardProps {
  title: string;
  description: string;
  score: number;
  percentageChange: number;
  visibleTo: string[];
}

const OverviewCard = ({
  title,
  description,
  score,
  percentageChange,
  visibleTo
}: OverviewCardProps) => {
  return (
    <div className='w-full shrink-0 cursor-pointer h-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden hover:shadow-md transition-shadow duration-200'>
      <div className='px-4 py-6 space-y-3'>
        <div className='flex items-center gap-2'>
          <h3 className='text-6xl font-thin text-theme-purple-500'>
            {score}%
          </h3>
          <span className={`flex items-center gap-1 ${percentageChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {percentageChange > 0 ? '+' : ''}{percentageChange}%
            {percentageChange > 0 ? (
              <ArrowUp className='w-4 h-4' />
            ) : (
              <ArrowDown className='w-4 h-4' />
            )}
          </span>
        </div>
        <h2 className='text-lg font-bold text-gray-800'>
          {title}
        </h2>
        <div className="flex flex-wrap gap-2">
          {visibleTo.map((role) => (
            <span 
              key={role}
              className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            >
              {role}
            </span>
          ))}
        </div>
        <p className='text-sm text-gray-500'>
          {description}
        </p>
      </div>
    </div>
  );
};

export default OverviewCard;
