import { ChevronLeft, LucideIcon } from 'lucide-react';
import React from 'react';
import Button from '../../ui/button/Button';
import Link from 'next/link';

interface BehaviourHeaderProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

const BehaviourHeader = ({ title, description, icon }: BehaviourHeaderProps) => {
  const Icon = icon;
  return (
    <div className="relative flex h-50 items-center justify-start gap-5 rounded-lg bg-[#7f56d9] px-10 md:gap-7">
      <Button
        variant="outline"
        size="xs"
        className="absolute top-3 left-3 !rounded-full"
        // asChild={true}
      >
        <Link href="/insights">
          <ChevronLeft />
        </Link>
      </Button>

      <div className="rounded-3xl bg-white p-5">
        <Icon className="text-theme-purple-500 h-10 w-10" />
      </div>

      <div className="space-y-2 text-white">
        <h3 className="text-xl font-thin md:text-2xl">Behaviour</h3>
        <h2 className="text-2xl font-medium md:text-3xl">{title}</h2>
        <p className="text-sm text-gray-300 md:text-base">{description}</p>
      </div>
    </div>
  );
};

export default BehaviourHeader;
