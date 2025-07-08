import Button from '@/components/ui/button/Button';
import { cn } from '@/lib/cn-helper';
import { ArrowDown, ArrowUp, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

interface OverviewHeaderProps {
  title: string;
  description: string;
  score: number;
  percentageChange?: number;
}

const OverviewHeader = ({ title, description, score, percentageChange }: OverviewHeaderProps) => {
  return (
    <div className="relative flex h-50 flex-row items-center justify-start gap-5 rounded-lg bg-[#7f56d9] px-10 md:gap-7 lg:justify-between">
      {/* Left Side */}
      <div className="space-y-2 text-white lg:w-1/2">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="xs" className="!rounded-full" asChild={true}>
            <Link href="/insights">
              <ChevronLeft />
            </Link>
          </Button>
          <h3 className="text-xl font-thin md:text-2xl">Apollo Care Alliance / {title}</h3>
        </div>
        <h2 className="text-2xl font-medium md:text-3xl">{title} analytics</h2>
        <p className="text-sm text-gray-300 md:text-base">{description}</p>
      </div>

      {/* Right Side */}
      <div className="hidden w-1/2 max-w-md rounded-lg bg-[#a795cd] px-4 py-6 text-white lg:flex">
        <div className="flex flex-col items-start justify-center gap-2">
          <h2 className="text-lg font-thin">{title} score</h2>
          <div className="flex flex-row items-center gap-7">
            <h3 className="text-6xl font-thin">{score}%</h3>
            <div className="space-y-1">
              <span
                className={cn(
                  'flex items-center gap-1',
                  percentageChange && percentageChange > 0 ? 'text-green-500' : 'text-red-500'
                )}
              >
                {percentageChange && percentageChange > 0 ? '+' : ''}
                {percentageChange && percentageChange}%
                {percentageChange && percentageChange > 0 ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <ArrowDown className="h-4 w-4" />
                )}
              </span>
              <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                2nd Quartile
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewHeader;
