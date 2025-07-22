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
  endingType?: 'POSITIVE' | 'MIXED' | 'NEGATIVE';
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

  // Step 3 outcomes - Branch 1 (Spoke up path)
  facilitated_outcome: {
    id: 'facilitated_outcome',
    step: 3,
    branch: 'option1',
    content: [
      'You arrange a mediation session between the two team members.',
      'By creating a safe space for honest communication, they discover their conflict stemmed from miscommunication and unclear expectations.',
      'They develop a collaborative plan moving forward.',
      'Three months into your role, your team is preparing for a major product launch when a critical bug is discovered.'
    ],
    choices: [
      {
        id: 'collaborative_problem_solve',
        text: 'Collaborative Problem-Solving',
        description: 'Gather the team to collectively problem-solve without blame, focusing on solutions rather than finding fault.'
      },
      {
        id: 'identify_responsible',
        text: 'Identify Responsible Party',
        description: 'Identify who\'s responsible for the bug and ensure they fix it immediately, making it clear that such mistakes are unacceptable.'
      }
    ],
    nextScenario: {
      option1: 'collaborative_success',
      option2: 'blame_culture'
    }
  },

  deadline_focused_outcome: {
    id: 'deadline_focused_outcome',
    step: 3,
    branch: 'option1',
    content: [
      'You tell the team members to resolve their issues on their own.',
      'The tension between them grows and begins affecting other team members.',
      'Project milestones start slipping. Your manager expresses concern about team dynamics.',
      'As pressure mounts with an approaching deadline, you need to make a decision about how to proceed.'
    ],
    choices: [
      {
        id: 'emergency_meeting',
        text: 'Emergency Team Meeting',
        description: 'Call an emergency team meeting to reset expectations, clear the air, and rebuild collaborative relationships.'
      },
      {
        id: 'strict_oversight',
        text: 'Implement Strict Oversight',
        description: 'Implement stricter oversight and daily progress reports to force the team back on track through accountability.'
      }
    ],
    nextScenario: {
      option1: 'emergency_meeting_recovery',
      option2: 'toxic_environment'
    }
  },

  // Step 3 outcomes - Branch 2 (Stayed quiet path)
  workload_addressed_outcome: {
    id: 'workload_addressed_outcome',
    step: 3,
    branch: 'option2',
    content: [
      'You reorganize the workload and implement a more sustainable work schedule.',
      'The team member thanks you privately, and others appreciate the more balanced approach.',
      'Team energy improves noticeably.',
      'Six months into your role, the company announces a significant strategic pivot that will require everyone to learn new skills quickly.'
    ],
    choices: [
      {
        id: 'supportive_learning',
        text: 'Create Learning Environment',
        description: 'Create a supportive learning environment where team members can share knowledge and help each other adapt.'
      },
      {
        id: 'independent_learning',
        text: 'Independent Learning',
        description: 'Set firm expectations that everyone needs to get up to speed independently or risk being left behind.'
      }
    ],
    nextScenario: {
      option1: 'learning_culture_success',
      option2: 'fragmented_team'
    }
  },

  dedication_praised_outcome: {
    id: 'dedication_praised_outcome',
    step: 3,
    branch: 'option2',
    content: [
      'After publicly praising the overworked employee, others reluctantly begin working longer hours too.',
      'Two weeks later, the overworked employee takes sick leave due to stress, and another team member submits their resignation.',
      'Your manager calls you in for an urgent discussion about team wellbeing.'
    ],
    choices: [
      {
        id: 'acknowledge_mistake',
        text: 'Acknowledge Mistake',
        description: 'Acknowledge your mistake and propose a comprehensive wellness and workload management plan.'
      },
      {
        id: 'maintain_pressure',
        text: 'Maintain Standards',
        description: 'Argue that high-pressure environments are normal in tech and the team needs to toughen up to succeed.'
      }
    ],
    nextScenario: {
      option1: 'wellness_recovery',
      option2: 'team_collapse'
    }
  },

  // Final Endings - Path 1: Collaborative Success (POSITIVE)
  collaborative_success: {
    id: 'collaborative_success',
    step: 4,
    branch: 'option1',
    content: [
      'Your team comes together impressively to fix the bug.',
      'The collaborative approach not only resolves the immediate issue but strengthens team bonds.',
      'The product launches successfully, and your team is recognized for both their technical solution and exemplary teamwork.',
      'One year into your leadership role, your team is now known throughout the company for its positive culture and high performance.',
      'Other departments are asking how you achieved this transformation.',
      'POSITIVE ENDING: You\'ve created a resilient, collaborative team culture where psychological safety allows innovation to flourish. Team members support each other through challenges and celebrate successes together. Employee satisfaction scores are at an all-time high, and your approach is being modeled across the organization. Your leadership has made a lasting positive impact on the workplace culture.'
    ],
    isEnd: true,
    endingType: 'POSITIVE'
  },

  // Final Endings - Path 2: Blame Culture (MIXED)
  blame_culture: {
    id: 'blame_culture',
    step: 4,
    branch: 'option1',
    content: [
      'You identify the developer responsible for the bug and demand they fix it immediately.',
      'While the issue gets resolved in time for launch, the team atmosphere becomes tense.',
      'People become hesitant to take risks or admit mistakes.',
      'Over the following months, innovation slows as team members prioritize avoiding blame over proposing creative solutions.',
      'MIXED ENDING: Your team meets its targets but operates in a culture of fear. While productivity appears stable on the surface, underlying issues of low psychological safety and risk aversion limit your team\'s potential. High-performing team members begin looking for opportunities elsewhere, citing the stressful environment as their primary reason for leaving.'
    ],
    isEnd: true,
    endingType: 'MIXED'
  },

  // Final Endings - Path 3: Emergency Meeting Recovery (POSITIVE)
  emergency_meeting_recovery: {
    id: 'emergency_meeting_recovery',
    step: 4,
    branch: 'option1',
    content: [
      'Your emergency meeting initially faces resistance, but your willingness to acknowledge the situation creates space for honest dialogue.',
      'The team works through their conflicts and recommits to collaboration.',
      'Though you miss some initial deadlines, the project ultimately succeeds with stronger team cohesion.',
      'Your manager commends your ability to turn a challenging situation around.',
      'POSITIVE ENDING: Your willingness to address problems directly but compassionately has transformed your team. Though the path wasn\'t always smooth, you\'ve established a culture where conflicts are addressed constructively rather than avoided. The team now approaches challenges with confidence, knowing they can work through difficulties together. Your leadership has created lasting positive change in the workplace culture.'
    ],
    isEnd: true,
    endingType: 'POSITIVE'
  },

  // Final Endings - Path 4: Toxic Environment (NEGATIVE)
  toxic_environment: {
    id: 'toxic_environment',
    step: 4,
    branch: 'option1',
    content: [
      'Your implementation of strict oversight and daily reporting creates immediate resentment.',
      'While the project barely meets its deadline, three team members request transfers immediately afterward.',
      'Your manager expresses concern about the high turnover and controlling management style that\'s developed under your leadership.',
      'NEGATIVE ENDING: Your focus on control rather than culture has created a toxic work environment. Team members feel micromanaged and untrusted, leading to compliance without commitment. Innovation has stalled, and your team has gained a reputation as an undesirable place to work. The company now faces significant costs in recruiting and training replacements for departing staff.'
    ],
    isEnd: true,
    endingType: 'NEGATIVE'
  },

  // Final Endings - Path 5: Learning Culture Success (POSITIVE)
  learning_culture_success: {
    id: 'learning_culture_success',
    step: 4,
    branch: 'option2',
    content: [
      'You organize skill-sharing sessions and create learning pairs where team members support each other.',
      'The transition period is challenging but manageable as everyone helps each other adapt.',
      'Your team becomes the first to successfully implement the new strategic direction, earning recognition from company leadership.',
      'POSITIVE ENDING: Your investment in creating a learning culture has paid off tremendously. The team has developed resilience and adaptability that extends beyond the immediate challenge. Team members feel valued for both their contributions and their growth potential. Your approach has created a sustainable positive culture that balances high performance with employee wellbeing.'
    ],
    isEnd: true,
    endingType: 'POSITIVE'
  },

  // Final Endings - Path 6: Fragmented Team (MIXED)
  fragmented_team: {
    id: 'fragmented_team',
    step: 4,
    branch: 'option2',
    content: [
      'Your sink-or-swim approach creates immediate anxiety within the team.',
      'Some members adapt quickly while others struggle silently, afraid to ask for help.',
      'The implementation of the strategic pivot is inconsistent, with some aspects excellently executed and others falling short.',
      'Team cohesion suffers as competitive rather than collaborative dynamics emerge.',
      'MIXED ENDING: Your team has partially succeeded in its objectives but at a significant cost to morale and collaboration. The uneven implementation of new initiatives reflects the fragmented nature of your team culture. While some high performers thrive in the competitive environment, overall innovation and problem-solving capacity are limited by the lack of knowledge sharing and mutual support.'
    ],
    isEnd: true,
    endingType: 'MIXED'
  },

  // Final Endings - Path 7: Wellness Recovery (POSITIVE)
  wellness_recovery: {
    id: 'wellness_recovery',
    step: 4,
    branch: 'option2',
    content: [
      'You openly acknowledge the mistake to your team and work with HR to implement comprehensive wellness initiatives and realistic workload planning.',
      'Though it takes time to rebuild trust, your honesty and corrective actions gradually improve team morale.',
      'The employee on sick leave returns and expresses appreciation for the changes.',
      'POSITIVE ENDING: Your willingness to acknowledge mistakes and take meaningful corrective action has transformed a potential disaster into a turning point for your team. By prioritizing employee wellbeing alongside performance, you\'ve created a sustainable culture where people feel valued as humans, not just resources. The team has developed a healthy approach to work-life balance that actually enhances their creativity and productivity.'
    ],
    isEnd: true,
    endingType: 'POSITIVE'
  },

  // Final Endings - Path 8: Team Collapse (NEGATIVE)
  team_collapse: {
    id: 'team_collapse',
    step: 4,
    branch: 'option2',
    content: [
      'You maintain that high pressure is just part of the industry. Your manager is visibly disappointed with your response.',
      'Within two months, half your team has either transferred or resigned.',
      'Projects fall behind as remaining team members struggle with the increased workload and low morale.',
      'Upper management steps in to address the situation.',
      'NEGATIVE ENDING: Your refusal to address the toxic culture has resulted in a team collapse. The high turnover has created significant costs for the company in lost productivity, institutional knowledge, and recruitment expenses. Your reputation as a leader has been severely damaged, and you\'re placed on a performance improvement plan focusing on people management skills and emotional intelligence.'
    ],
    isEnd: true,
    endingType: 'NEGATIVE'
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

export const getStepTitleMobile = (step: number): string => {
  const mobileTitles = [
    'Challenge',
    'Decision',
    'Impact',
    'Outcome'
  ];
  return mobileTitles[step - 1] || `Step ${step}`;
};

export const initialState: ModuleState = {
  currentStep: 1,
  currentScenario: 'introduction',
  choices: {},
  branch: null,
  isComplete: false
};