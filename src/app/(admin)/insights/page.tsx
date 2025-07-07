import BehaviourCards from '@/components/insights/BehaviourCards';
import InsightsHeader from '@/components/insights/InsightsHeader';
import OverviewCards from '@/components/insights/OverviewCards';

const Insights = () => {
  return (
    <div className='flex flex-col gap-5'>
      <InsightsHeader />

      <BehaviourCards />

      <OverviewCards />
    </div>
  );
};

export default Insights;