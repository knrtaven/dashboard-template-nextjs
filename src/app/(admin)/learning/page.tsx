import LearningCards from '@/components/learning/LearningCards';
import LearningHeadline from '@/components/learning/LearningHeadline';
import type { Metadata } from 'next';

import CurrentModule from '@/components/learning/CurrentModule';

export const metadata: Metadata = {
  title: 'Appellon',
  description: 'Appellon',
};

export default function Learning() {
  return (
    <div className="flex flex-col gap-8">
      <LearningHeadline />

      {/* Temporary ata? just for demo */}
      {/* <IncompleteCards/> */}
      <CurrentModule id="1" />

      <LearningCards />
    </div>
  );
}
