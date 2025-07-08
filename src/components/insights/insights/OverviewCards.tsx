import React from 'react';
import OverviewCard from './OverviewCard';
import { insightsOverview } from '../../../constants/insights';

const OverviewCards = () => {
  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-lg text-gray-500 font-medium'>
        Overview
      </h2>
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
        {insightsOverview.map((insight) => (
          <OverviewCard
            key={insight.title}
            title={insight.title}
            description={insight.description}
            score={insight.score}
            percentageChange={insight.percentageChange}
            visibleTo={insight.visibleTo}
          />
        ))}
      </div>
    </div>
  );
};

export default OverviewCards;
