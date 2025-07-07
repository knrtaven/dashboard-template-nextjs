import BehaviourCards from '@/components/insights/BehaviourCards';
import InsightsHeader from '@/components/insights/InsightsHeader';

const Insights = () => {
  return (
    <div className='flex flex-col gap-4'>
      <InsightsHeader />

      <BehaviourCards />
    </div>
  );
};

export default Insights;