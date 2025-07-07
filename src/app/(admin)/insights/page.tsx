import BehaviourCards from '@/components/insights/BehaviourCards';
import InsightsHeader from '@/components/insights/InsightsHeader';
import OverviewCards from '@/components/insights/OverviewCards';
import SitesPerformance from '@/components/insights/SitesPerformance';

const Insights = () => {
  return (
    <div className="flex flex-col gap-5">
      <InsightsHeader />

      <BehaviourCards />

       <OverviewCards />

      <SitesPerformance />
    </div>
  );
};

export default Insights;
