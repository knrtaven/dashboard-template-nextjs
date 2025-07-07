import { LucideIcon } from 'lucide-react';

interface BehaviourCardProps {
  icon: LucideIcon
  title: string;
  description: string;
}

const BehaviourCard = ({ icon, title, description }: BehaviourCardProps) => {
  const Icon = icon;

  return (
    <div className='w-52 h-52 aspect-square rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden hover:shadow-md transition-shadow duration-200'>
      <div className='p-4 space-y-3'>
        <Icon className='w-8 h-8 text-theme-purple-500' />
        <h3>
          {title}
        </h3>
      </div>
    </div>
  );
};

export default BehaviourCard;