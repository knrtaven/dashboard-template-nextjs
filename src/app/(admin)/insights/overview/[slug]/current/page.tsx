import MainOverviewChart from '@/components/insights/overview/MainOverviewChart';
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
      <OverviewTabs activeTab="current" slug={slug} />

      <MainOverviewChart />
    </div>
  );
};

export default CurrentOverview;
