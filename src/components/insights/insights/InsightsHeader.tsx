'use client';
import { ApexOptions } from 'apexcharts';
import { Trophy } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const InsightsHeader = () => {
  const [progressValue, setProgressValue] = useState(75);

  // Simulate dynamic progress updates
  useEffect(() => {
    const interval = setInterval(() => {
      setProgressValue((prev) => {
        const newValue = prev + (Math.random() - 0.5) * 4;
        return Math.max(65, Math.min(95, Math.round(newValue)));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Dynamic color based on progress value
  const getProgressColor = (value: number) => {
    if (value >= 90) return '#10b981'; // Green
    if (value >= 75) return '#f59e0b'; // Amber
    return '#ef4444'; // Red
  };

  const progressColor = getProgressColor(progressValue);

  // ApexCharts configuration
  const chartOptions: ApexOptions = {
    chart: {
      type: 'radialBar' as const,
      height: 128,
      width: 128,
      sparkline: {
        enabled: true,
      },
      animations: {
        enabled: true,
        speed: 500,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 500,
        },
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 270,
        hollow: {
          margin: 0,
          size: '65%',
          background: 'transparent',
        },
        track: {
          background: 'rgba(255, 255, 255, 0.1)',
          strokeWidth: '100%',
          margin: 0,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: true,
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#ffffff',
            offsetY: -5,
            formatter: (val: number) => Math.round(val) + '%',
          },
        },
      },
    },
    fill: {
      type: 'solid',
      colors: [progressColor],
    },
    stroke: {
      lineCap: 'round' as const,
    },
    labels: ['Progress'],
  };

  const chartSeries = [progressValue];

  return (
    <div
      className="border-border relative flex h-50 items-center justify-between overflow-hidden rounded-lg border p-6"
      style={{ backgroundColor: '#7f56d9' }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 h-96 w-96 translate-x-48 -translate-y-48 rounded-full bg-white"></div>
        <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-32 translate-y-32 rounded-full bg-white"></div>
      </div>

      {/* Left Section - Welcome Message */}
      <div className="relative z-10 flex-1">
        <h1 className="mb-2 text-3xl font-bold text-white">Apollo Care Alliance</h1>
        <p className="text-lg text-purple-100">Welcome to your Culture and wellbeing platform</p>
        <p className="mt-4 text-base text-purple-100">
          Members: <span className="font-bold">1,200</span>
        </p>
      </div>

      {/* Right Section - Chart, Trophy, and Text */}
      <div className="relative z-10 flex items-center gap-6">
        {/* Enhanced Functional ApexCharts Radial Chart */}
        <div className="relative">
          {/* Outer glow effect - color changes with progress */}
          <div
            className="absolute inset-0 scale-110 animate-pulse rounded-full blur-xl transition-colors duration-500"
            style={{ backgroundColor: `${progressColor}20` }}
          ></div>

          {/* Chart container with enhanced styling */}
          <div className="relative hidden rounded-full border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-sm transition-all duration-500 md:block">
            <div className="flex h-32 w-32 items-center justify-center">
              <Chart
                options={chartOptions}
                series={chartSeries}
                type="radialBar"
                height={128}
                width={128}
              />
            </div>

            {/* Additional center label */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="mt-6 text-center">
                <p className="text-xs font-medium text-white/80">Complete</p>
              </div>
            </div>
          </div>

          {/* Dynamic decorative elements */}
          <div
            className="absolute -top-2 -right-2 h-4 w-4 animate-ping rounded-full transition-colors duration-500"
            style={{ backgroundColor: progressColor }}
          ></div>
          <div className="absolute -bottom-2 -left-2 h-3 w-3 animate-pulse rounded-full bg-yellow-400"></div>
        </div>

        {/* Trophy and Explanatory Text */}
        <div className="hidden max-w-xs items-center gap-4 xl:flex">
          <div className="relative flex-shrink-0">
            {/* Trophy container with conditional glow */}
            <div
              className={`relative rounded-full p-4 shadow-xl transition-all duration-500 ${
                progressValue >= 75
                  ? 'bg-gradient-to-br from-yellow-400 to-orange-500'
                  : 'bg-gradient-to-br from-gray-400 to-gray-600'
              }`}
            >
              <Trophy className="h-8 w-8 text-white drop-shadow-lg" />
              {/* Shine effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/30 to-transparent"></div>
            </div>
            {/* Conditional trophy glow */}
            {progressValue >= 75 && (
              <div className="absolute inset-0 scale-110 animate-pulse rounded-full bg-yellow-400/30 blur-lg"></div>
            )}
          </div>

          <div>
            <p className="mb-2 text-sm leading-tight font-bold text-white drop-shadow-sm">
              Top achievers with over 75% completion.
            </p>
            <p className="text-xs leading-relaxed text-purple-100">
              Making a difference, boosting wellbeing, and loving their work!
            </p>

            {/* Dynamic status indicator */}
            <div className="mt-2 flex items-center gap-2">
              <div
                className="h-2 w-2 animate-pulse rounded-full transition-colors duration-500"
                style={{ backgroundColor: progressColor }}
              ></div>
              <span className="text-xs font-medium text-purple-200">
                {progressValue >= 90
                  ? 'Exceptional'
                  : progressValue >= 75
                    ? 'Top Achiever'
                    : 'Keep Going'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsHeader;
