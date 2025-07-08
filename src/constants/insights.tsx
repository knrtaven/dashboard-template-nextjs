import { Award, ChartNoAxesColumnIncreasing, LucideIcon, ShieldCheck, Trophy } from "lucide-react";

export const behaviours: {
 icon: LucideIcon;
 title: string;
 description: string;
}[] = [
  {
    icon: Award,
    title: "Connection",
    description: "We Put Residents First",
  },
  {
    icon: ShieldCheck,
    title: 'Wellbeing',
    description: 'Safety & quality in everything we do'
  },
  {
    icon: Trophy,
    title: 'Achievement',
    description: 'Work Together, Achieve Together'
  },
  {
    icon: ChartNoAxesColumnIncreasing,
    title: 'Performance',
    description: 'We use our resources wisely'
  }
]

export const insightsOverview: {
  title: string;
  description: string;
  score?: number;
  percentageChange?: number;
  visibleTo: string[]
}[] = [
  {
    title: 'Lead-Rite',
    description: 'Lead-Rite analytics provide insight into the degree to which leadership are leading wisely in the best interest of the organization.',
    score: 72,
    percentageChange: -8,
    visibleTo: ['Super Admin', 'Leader']
  },
  {
    title: 'Work-Rite',
    description: 'Your work-rite score is a combination of behaviour application, performance focus and well-being outcomes.',
    score: 60,
    percentageChange: 3,
    visibleTo: ['Super Admin', 'Leader', 'Workforce']
  },
  {
    title: 'Care-Rite',
    description: 'Your Care-Rite score measures how well clients and residents psychological, emotional and spiritual (PES) needs are being met.',
    score: 79,
    percentageChange: 0,
    visibleTo: ['Super Admin']
  },
  {
    title: 'Showcase',
    description: 'How behaviours have been demonstrated and what impact this has had on teams and the organisation.',
    visibleTo: ['Super Admin', 'Leader', 'Workforce'],
    score: 51
  },
  {
    title: 'Platform Analytics',
    description: 'How platform data has been monitored and what insights this has provided into user engagement and overall performance.',
    visibleTo: ['Super Admin', 'View Only', 'Leader', 'Site View Only', 'Appellon Board Members']
  }
]

export const getBehaviour = async (slug: string) => {
  const behaviour = behaviours.find((behaviour) => behaviour.title.toLowerCase() === slug.toLowerCase());
  return behaviour;
};

export const getOverview = async (slug: string) => {
  const overview = insightsOverview.find((overview) => overview.title.toLowerCase() === slug.toLowerCase());
  return overview;
};