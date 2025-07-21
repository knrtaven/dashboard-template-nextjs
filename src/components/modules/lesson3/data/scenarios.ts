export interface Choice {
  id: string;
  text: string;
  description: string;
}

export interface Scenario {
  id: string;
  step: number;
  title?: string;
  content: string[];
  choices?: Choice[];
  isEnd?: boolean;
  branch?: 'option1' | 'option2';
  nextScenario?: {
    option1?: string;
    option2?: string;
  };
}

export interface ModuleState {
  currentStep: number;
  currentScenario: string;
  choices: Record<number, string>;
  branch: 'option1' | 'option2' | null;
  isComplete: boolean;
}

export const scenarios: Record<string, Scenario> = {
  // Initial scenario
  introduction: {
    id: 'introduction',
    step: 1,
    title: 'Culture Crossroads',
    content: [
      "You've just been hired as a team lead at TechInnovate, a growing software company.",
      "On your first day, you notice the team seems disengaged and morale is low.",
      "During a team meeting, one of your colleagues, Alex, shares an idea that gets immediately dismissed by others.",
      "You can see Alex is discouraged."
    ],
    choices: [
      {
        id: 'speak_up',
        text: 'Speak Up',
        description: 'Speak up and encourage the team to give Alex\'s idea more consideration, creating space for everyone\'s input.'
      },
      {
        id: 'stay_quiet',
        text: 'Stay Quiet',
        description: 'Stay quiet and move on with the meeting agenda. You\'re new and don\'t want to disrupt the existing dynamics.'
      }
    ],
    nextScenario: {
      option1: 'spoke_up_outcome',
      option2: 'stayed_quiet_outcome'
    }
  },

  // Branch 1: Spoke up outcomes
  spoke_up_outcome: {
    id: 'spoke_up_outcome',
    step: 2,
    branch: 'option1',
    content: [
      'You speak up: "I think Alex\'s idea has merit. Let\'s explore it a bit more before moving on."',
      'The team seems surprised but gives Alex a chance to elaborate.',
      'After the meeting, your manager mentions they appreciate how you\'re fostering inclusivity.',
      'A week later, you notice a conflict brewing between two team members over project responsibilities.'
    ],
    choices: [
      {
        id: 'facilitate_conversation',
        text: 'Facilitate Discussion',
        description: 'Facilitate a private conversation between them to address the underlying issues and find common ground.'
      },
      {
        id: 'let_them_figure_out',
        text: 'Focus on Deadline',
        description: 'Tell them to figure it out themselves as professionals should, focusing instead on meeting the project deadline.'
      }
    ],
    nextScenario: {
      option1: 'facilitated_outcome',
      option2: 'deadline_focused_outcome'
    }
  },

  // Branch 2: Stayed quiet outcomes
  stayed_quiet_outcome: {
    id: 'stayed_quiet_outcome',
    step: 2,
    branch: 'option2',
    content: [
      'You remain silent as the meeting continues.',
      'Over the next few weeks, you notice team members rarely share ideas during meetings.',
      'Your manager asks you to help improve team collaboration.',
      'Meanwhile, you discover that a team member has been working excessive hours to meet deadlines, showing signs of burnout.'
    ],
    choices: [
      {
        id: 'address_workload',
        text: 'Address Workload',
        description: 'Address the workload issue directly and help redistribute tasks more evenly across the team.'
      },
      {
        id: 'praise_dedication',
        text: 'Praise Dedication',
        description: 'Praise their dedication publicly and suggest others should show the same commitment to the project.'
      }
    ],
    nextScenario: {
      option1: 'workload_addressed_outcome',
      option2: 'dedication_praised_outcome'
    }
  },

  // Final outcomes - Branch 1
  facilitated_outcome: {
    id: 'facilitated_outcome',
    step: 3,
    branch: 'option1',
    content: [
      'You arrange a private meeting with both team members.',
      'Through open dialogue, you discover the conflict stems from unclear role boundaries.',
      'You work together to establish clear responsibilities and communication protocols.',
      'The team dynamic improves significantly, and both members thank you for your intervention.'
    ],
    isEnd: true
  },

  deadline_focused_outcome: {
    id: 'deadline_focused_outcome',
    step: 3,
    branch: 'option1',
    content: [
      'You tell them to resolve their differences privately and focus on the deadline.',
      'The conflict escalates, affecting team productivity and morale.',
      'Your manager notices the tension and questions your leadership approach.',
      'You realize that avoiding difficult conversations as a leader can have lasting negative consequences.'
    ],
    isEnd: true
  },

  // Final outcomes - Branch 2
  workload_addressed_outcome: {
    id: 'workload_addressed_outcome',
    step: 3,
    branch: 'option2',
    content: [
      'You meet with the overworked team member and assess their workload.',
      'Together, you identify tasks that can be redistributed or streamlined.',
      'You implement a more balanced workload distribution system.',
      'The team member\'s wellbeing improves, and overall team productivity increases sustainably.'
    ],
    isEnd: true
  },

  dedication_praised_outcome: {
    id: 'dedication_praised_outcome',
    step: 3,
    branch: 'option2',
    content: [
      'You publicly praise the team member\'s dedication in the next team meeting.',
      'Other team members feel pressured to work similar hours to match this "standard."',
      'Burnout spreads across the team, leading to mistakes and decreased quality.',
      'You learn that celebrating unsustainable work practices can damage team culture and wellbeing.'
    ],
    isEnd: true
  }
};

export const getScenarioById = (id: string): Scenario | undefined => {
  return scenarios[id];
};

export const getNextScenario = (currentScenario: Scenario, choiceId: string): string | undefined => {
  if (!currentScenario.nextScenario) return undefined;
  
  if (choiceId === currentScenario.choices?.[0]?.id) {
    return currentScenario.nextScenario.option1;
  } else if (choiceId === currentScenario.choices?.[1]?.id) {
    return currentScenario.nextScenario.option2;
  }
  
  return undefined;
};

export const getStepTitle = (step: number): string => {
  const titles = [
    'Initial Challenge',
    'First Decision Impact',
    'Second Challenge',
    'Final Outcome'
  ];
  return titles[step - 1] || `Step ${step}`;
};

export const initialState: ModuleState = {
  currentStep: 1,
  currentScenario: 'introduction',
  choices: {},
  branch: null,
  isComplete: false
};