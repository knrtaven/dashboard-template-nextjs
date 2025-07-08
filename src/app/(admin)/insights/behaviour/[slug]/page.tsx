import BehaviourAddCard from '@/components/insights/behaviour/BehaviourAddCard';
import BehaviourHeader from '@/components/insights/behaviour/BehaviourHeader';
import { getBehaviour } from '@/constants/insights';
import { notFound } from 'next/navigation';

const BehaviourPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const behaviour = await getBehaviour(slug);

  if (!behaviour) {
    return notFound();
  }

  return (
    <div className="flex flex-col gap-4">
      <BehaviourHeader
        title={behaviour.title}
        description={behaviour.description}
        icon={behaviour.icon}
      />
      <BehaviourAddCard />
    </div>
  );
};

export default BehaviourPage;
