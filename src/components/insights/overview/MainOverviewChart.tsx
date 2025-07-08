'use client';
import { ApexOptions } from 'apexcharts';
import { Info } from 'lucide-react';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const MainOverviewChart = () => {
  const options: ApexOptions = {
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'left',
    },
    colors: ['#7a5af8', '#000000', '#808080'], // Purple line, black/gray bars
    chart: {
      fontFamily: 'Outfit, sans-serif',
      height: 310,
      type: 'line',
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: 'straight',
      width: [4, 0, 0], // 2x thicker line (4px)
    },
    markers: {
      size: 6, // Show markers (circles)
      colors: ['#7a5af8'], // Purple markers
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: {
        size: 8,
      },
    },
    fill: {
      type: 'solid', // Remove gradient
    },
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      shared: true,
      intersect: false,
      x: {
        format: 'dd MMM yyyy',
      },
    },
    plotOptions: {
      bar: {
        columnWidth: '30%', // Thinner bars
        distributed: false
      }
    },
    xaxis: {
      type: 'category',
      categories: [
        'Jul-24', 'Aug-24', 'Sep-24', 'Oct-24', 
        'Nov-24', 'Dec-24', 'Jan-25', 'Feb-25', 
        'Mar-25', 'Apr-25', 'May-25', 'Jun-25'
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '12px',
          colors: ['#6B7280'],
        },
      },
      title: {
        text: '',
        style: {
          fontSize: '0px',
        },
      },
    },
  };

  const series = [
    {
      name: 'Adjusted score',
      type: 'line',
      data: [45, 52, 38, 60, 55, 48, 50, 55, 45, 60, 52, 48],
    },
    {
      name: 'Respondents',
      type: 'bar',
      data: [30, 40, 25, 50, 35, 45, 40, 35, 30, 45, 40, 35],
    },
    {
      name: 'Participants',
      type: 'bar',
      data: [20, 30, 35, 40, 25, 35, 30, 25, 20, 35, 30, 25],
    },
  ];

  return (
    <div className="h-full w-full shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col px-6 py-8">
        {/* Title and description */}
        <h2 className="text-lg font-medium dark:text-white">Lead-Rite</h2>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">Adjusted score</p>
        <div className="mt-1 flex flex-row items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Info className="h-4 w-4" />
          <p>
            The degree to which leaders are engaged in applying the Lead-rite behaviours and
            principles.
          </p>
        </div>

        {/* Chart */}
        <ReactApexChart options={options} series={series} type="area" height={310} />
      </div>
    </div>
  );
};

export default MainOverviewChart;
