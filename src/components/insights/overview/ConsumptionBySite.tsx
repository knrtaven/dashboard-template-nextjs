'use client';

import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const ConsumptionBySite = () => {
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
  const seriesData = [85, 92, 90, 88, 80, 95, 87, 83, 94, 89];

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
    <div className="flex flex-col gap-3">
      <div className="h-full w-full shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="flex flex-col px-6 py-8">
          {/* Title and description */}
          <h2 className="text-lg font-medium dark:text-white">Consumption Rate by Site Jun-25</h2>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">Adjusted score</p>

          {/* Chart */}
          <ReactApexChart options={options} series={series} type="bar" height={400} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Consumption rate may be zero in the first month due to the baseline survey (as
          there&apos;s no learning modules during this period).
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          The graphs below show the average percentages by category, based on the number of
          responses received. Hover over any of the data points to view the number of responses.
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          The <span className="font-bold">adjusted score</span> is the score based on how many
          people responded verses how many people could have responded.
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          The <span className="font-bold">raw score</span> is the score based on the ratings
          provided by the number of people who responded.
        </p>
      </div>
    </div>
  );
};

export default ConsumptionBySite;
