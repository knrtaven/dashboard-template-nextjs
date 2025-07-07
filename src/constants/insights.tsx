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