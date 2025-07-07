import React from 'react';
import OverviewCard from './OverviewCard';

const OverviewCards = () => {
  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-lg text-gray-500 font-medium'>
        Overview
      </h2>
      <OverviewCard />
    </div>
  );
};

export default OverviewCards;