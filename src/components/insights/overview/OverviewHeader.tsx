import Button from '@/components/ui/button/Button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface OverviewHeaderProps {
  title: string;
  description: string;
}

const OverviewHeader = ({ title, description }: OverviewHeaderProps) => {
  return (
    <div className="relative flex h-50 items-center justify-start gap-5 rounded-lg bg-[#7f56d9] px-10 md:gap-7">
      <div className="space-y-2 text-white">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="xs"
            className="!rounded-full"
            asChild={true}
          >
            <Link href="/insights">
              <ChevronLeft />
            </Link>
          </Button>
          <h3 className="text-xl font-thin md:text-2xl">Apollo Care Alliance</h3>
        </div>
        <h2 className="text-2xl font-medium md:text-3xl">{title} analytics</h2>
        <p className="text-sm text-gray-300 md:text-base">{description}</p>
      </div>
    </div>
  );
};

export default OverviewHeader;
