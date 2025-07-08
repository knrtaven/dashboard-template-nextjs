import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface BehaviourCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const BehaviourCard = ({ icon, title, description }: BehaviourCardProps) => {
  const Icon = icon;

  const slug = title.toLowerCase().replace(/ /g, '-');

  return (
    <Link
      href={`/insights/behaviour/${slug}`}
      className="aspect-square h-52 w-52 shrink-0 cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="space-y-3 p-4">
        <Icon className="text-theme-purple-500 h-8 w-8" />
        <h3 className="text-lg font-medium text-black dark:text-white">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
    </Link>
  );
};

export default BehaviourCard;
