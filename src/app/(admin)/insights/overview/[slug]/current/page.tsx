import AchievementBySite from '@/components/insights/overview/AchievementBySite';
import AchievementChart from '@/components/insights/overview/AchievementChart';
import ConsumptionBySite from '@/components/insights/overview/ConsumptionBySite';
import ConsumptionOverviewChart from '@/components/insights/overview/ConsumptionOverviewChart';
import MainOverviewChart from '@/components/insights/overview/MainOverviewChart';
import OverviewBySiteChart from '@/components/insights/overview/OverviewBySiteChart';
import OverviewHeader from '@/components/insights/overview/OverviewHeader';
import OverviewTabs from '@/components/insights/overview/OverviewTabs';
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
      </div>
    </div>
  );
};

export default CurrentOverview;
