import { ArrowDown, ArrowUp } from 'lucide-react';

const OverviewCard = () => {
  const percentageChange = 1;
  return (
    <div className='w-full shrink-0 cursor-pointer h-52 aspect-square rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden hover:shadow-md transition-shadow duration-200'>
      <div className='px-4 py-6 space-y-3'>
        <div className='flex items-center gap-2'>
          <h3 className='text-6xl font-thin text-theme-purple-500'>
            72%
          </h3>
          <span className='text-green-500 flex items-center gap-1'>
            {
              percentageChange > 0 ? (
                <>
                  {percentageChange}%
                  <ArrowUp className='w-4 h-4 text-green-500' />
                </>
              ) : (
                <>
                  -{percentageChange}%
                  <ArrowDown className='w-4 h-4 text-red-500' />
                </>
              )
            }
          </span>
        </div>
        <h2 className='text-lg font-bold text-gray-800'>
          Lead-Rite
        </h2>
        <p className='text-sm text-gray-500'>
          Lead-Rite analytics provide insight into the degree to which leadership are leading wisely in the best interest of the organization.
        </p>
      </div>
    </div>
  );
};

export default OverviewCard;