import OverviewHeader from '@/components/insights/overview/OverviewHeader';
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
      <OverviewHeader title={overview.title} description={overview.description} />
    </div>
  );
};

export default CurrentOverview;
