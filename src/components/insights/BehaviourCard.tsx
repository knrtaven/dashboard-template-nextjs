import { LucideIcon } from 'lucide-react';

interface BehaviourCardProps {
  icon: LucideIcon
  title: string;
  description: string;
}

const BehaviourCard = ({ icon, title, description }: BehaviourCardProps) => {
  const Icon = icon;

  return (
    <div className='w-52 shrink-0 cursor-pointer h-52 aspect-square rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden hover:shadow-md transition-shadow duration-200'>
      <div className='p-4 space-y-3'>
        <Icon className='w-8 h-8 text-theme-purple-500' />
        <h3 className='text-lg font-medium'>
          {title}
        </h3>
        <p className='text-sm text-gray-500'>
          {description}
        </p>
      </div>
    </div>
  );
};

export default BehaviourCard;