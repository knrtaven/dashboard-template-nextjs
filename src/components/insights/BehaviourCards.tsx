import { behaviours } from '@/constants/insights';
import BehaviourCard from './BehaviourCard';

const BehaviourCards = () => {
  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-lg text-gray-500 font-medium'>
        Our behaviours
      </h2>
      <div className='flex flex-row gap-4 h-52 overflow-x-auto'>
        {
          behaviours.map((behaviour) => (
            <BehaviourCard key={behaviour.title} icon={behaviour.icon} title={behaviour.title} description={behaviour.description} />
          ))
        }
      </div>
    </div>
  );
};

export default BehaviourCards;