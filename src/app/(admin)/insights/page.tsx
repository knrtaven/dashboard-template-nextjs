import BehaviourCards from '@/components/insights/insights/BehaviourCards';
import InsightsHeader from '@/components/insights/insights/InsightsHeader';
import OverviewCards from '@/components/insights/insights/OverviewCards';
import SitesPerformance from '@/components/insights/insights/SitesPerformance';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: "Appellon",
  description:
    "Appellon",
};
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
