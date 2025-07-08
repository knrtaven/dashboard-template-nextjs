import { cn } from '@/lib/cn-helper';
import Link from 'next/link';
import { FC } from 'react';

const tabs = [
  {
    label: 'Current',
    value: 'current',
  },
  {
    label: 'Historical',
    value: 'history',
  },
];

interface OverviewTabsProps {
  activeTab: 'current' | 'history';
  slug: string;
}

const OverviewTabs: FC<OverviewTabsProps> = ({ activeTab, slug }) => {
  return (
    <div className="w-full border-b">
      <div className="flex flex-row gap-4">
        {tabs.map((tab) => (
          <Link
            key={tab.value}
            href={`/insights/overview/${slug}/${tab.value}`}
            className={cn(
              'text-md font-medium text-gray-500 hover:text-gray-700 py-2',
              activeTab === tab.value && 'text-theme-purple-500 border-theme-purple-500 border-b-3'
            )}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OverviewTabs;
