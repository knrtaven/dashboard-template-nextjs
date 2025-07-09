'use client';

import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const WellBeingBySite = () => {
  // Generate mock data
  const categories = [
    'Company A',
    'Company B',
    'Company C',
    'Company D',
    'Company E',
    'Company F',
    'Company G',
    'Company H',
    'Company I',
    'Company J',
  ];
  const seriesData = [42, 48, 45, 41, 49, 43, 47, 50, 44, 46];

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: false,
    },
    dataLabels: {
      enabled: true, // Show numbers on bars
      style: {
        colors: ['#fff'], // White text for contrast
      },
      offsetX: 10, // Position inside bars
    },
    legend: {
      show: false, // Remove legend
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '70%', // More spacing between bars
        distributed: false,
        colors: {
          ranges: [
            {
              from: 0,
              to: 100,
              color: '#8B5CF6',
            },
          ],
        },
      },
    },
    xaxis: {
      min: 0,
      max: 100,
      categories: categories,
      labels: {
        show: false, // Hide numbers on bottom
      },
      axisBorder: {
        show: false, // Hide x-axis line
      },
    },
  };

  const series = [
    {
      name: 'Percentage',
      data: seriesData,
    },
  ];

  return (
    <div className="h-full w-full shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col px-6 py-8">
        {/* Title and description */}
        <h2 className="text-lg font-medium dark:text-white">Well-being by Site Jun-25</h2>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">Adjusted score</p>

        {/* Chart */}
        <ReactApexChart options={options} series={series} type="bar" height={400} />
      </div>
    </div>
  );
};

export default WellBeingBySite;
