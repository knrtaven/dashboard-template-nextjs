import { behaviours } from '@/constants/insights';
import { ScrollArea, ScrollBar } from '../ui/scroll-area/ScrollArea';
import BehaviourCard from './BehaviourCard';

const BehaviourCards = () => {
  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-lg text-gray-500 font-medium'>
        Our behaviours
      </h2>
      <ScrollArea>
        <div className='flex space-x-4 py-1'>
          {
            behaviours.map((behaviour) => (
              <BehaviourCard key={behaviour.title} icon={behaviour.icon} title={behaviour.title} description={behaviour.description} />
            ))
          }
        </div>
        <ScrollBar orientation="horizontal" className='hidden' />
      </ScrollArea>
    </div>
  );
};

export default BehaviourCards;