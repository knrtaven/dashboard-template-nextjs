'use client';

import { ApexOptions } from 'apexcharts';
import { Info } from 'lucide-react';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});
import React from 'react';

const OverviewBySiteChart = () => {
  // Generate mock data
  const categories = [
    'Company A', 'Company B', 'Company C', 'Company D', 'Company E',
    'Company F', 'Company G', 'Company H', 'Company I', 'Company J'
  ];
  const seriesData = [85, 72, 90, 65, 80, 55, 95, 60, 75, 50];

  const options: ApexOptions = {
    chart: {
      type: 'bar',
    },
    plotOptions: {
      bar: {
        horizontal: true,
        colors: {
          ranges: [{
            from: 0,
            to: 100,
            color: '#8B5CF6' // theme-purple-500
          }]
        }
      }
    },
    xaxis: {
      categories: categories
    }
  };

  const series = [{
    name: 'Percentage',
    data: seriesData
  }];

  return (
    <div className="h-full w-full shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col px-6 py-8">
        {/* Title and description */}
        <h2 className="text-lg font-medium">Lead-Rite</h2>
        <p className="text-sm font-light text-gray-500">Adjusted score</p>
        <div className="mt-1 flex flex-row items-center gap-2 text-sm text-gray-600">
          <Info className="h-4 w-4" />
          <p>
            The degree to which leaders are engaged in applying the Lead-rite behaviours and
            principles.
          </p>
        </div>

        {/* Chart */}
        <ReactApexChart options={options} series={series} type="bar" height={310} />
      </div>
    </div>
  );
};

export default OverviewBySiteChart;
