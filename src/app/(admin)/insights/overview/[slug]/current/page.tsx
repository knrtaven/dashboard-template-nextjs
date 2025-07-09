import AchievementBySite from '@/components/insights/overview/AchievementBySite';
import AchievementChart from '@/components/insights/overview/AchievementChart';
import ConsumptionBySite from '@/components/insights/overview/ConsumptionBySite';
import ConsumptionOverviewChart from '@/components/insights/overview/ConsumptionOverviewChart';
import ExecutionBySite from '@/components/insights/overview/ExecutionBySite';
import ExecutionChart from '@/components/insights/overview/ExecutionChart';
import InsightBySite from '@/components/insights/overview/InsightBySite';
import InsightChart from '@/components/insights/overview/InsightChart';
import MainOverviewChart from '@/components/insights/overview/MainOverviewChart';
import OverviewBySiteChart from '@/components/insights/overview/OverviewBySiteChart';
import OverviewHeader from '@/components/insights/overview/OverviewHeader';
import OverviewTabs from '@/components/insights/overview/OverviewTabs';
import ScoreMatrix from '@/components/insights/overview/ScoreMatrix';
import WellBeingBySite from '@/components/insights/overview/WellBeingBySite';
import WellBeingChart from '@/components/insights/overview/WellBeingChart';
import { getOverview } from '@/constants/insights';
import { notFound } from 'next/navigation';

const CurrentOverview = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const overview = await getOverview(slug);

  if (!overview) {
    return notFound();
  }

  return (
    <div className="flex flex-col gap-4">
      <OverviewHeader
        title={overview.title}
        description={overview.description}
        score={overview?.score ?? 0}
        percentageChange={overview?.percentageChange ?? 0}
      />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
        <OverviewTabs activeTab="current" slug={slug} />

        <MainOverviewChart />
        <OverviewBySiteChart />

        <ConsumptionOverviewChart />
        <ConsumptionBySite />

        <AchievementChart />
        <AchievementBySite />

        <ExecutionChart />
        <ExecutionBySite />

        <InsightChart />
        <InsightBySite />

        <WellBeingChart />
        <WellBeingBySite />

        <ScoreMatrix />
      </div>
    </div>
  );
};

export default CurrentOverview;
