export interface DialogueLine {
  speaker: string;
  role: string;
  text: string;
  delay?: number; // Optional delay before showing this line (in ms)
}

export interface DialogueQuestion {
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export interface DialogueScenario {
  id: string;
  title: string;
  description: string;
  context: string;
  dialogue: DialogueLine[];
  question: DialogueQuestion;
}

export interface DialogueState {
  currentScenario: number;
  completedScenarios: number[];
  isComplete: boolean;
  answers: Record<number, string>;
}

export const dialogueScenarios: DialogueScenario[] = [
  {
    id: 'team-onboarding',
    title: 'Team Onboarding',
    description: 'A team lead welcomes a new team member',
    context: 'Jamie Miller, a team lead, is welcoming Alex Taylor to the team and explaining expectations.',
    dialogue: [
      {
        speaker: 'Jamie',
        role: 'Team Lead',
        text: 'Welcome to the team, Alex, we\'re excited to have you join our project.',
      },
      {
        speaker: 'Alex',
        role: 'New Team Member',
        text: 'Thanks Jamie, I\'m looking forward to contributing to the team.',
        delay: 1200
      },
      {
        speaker: 'Jamie',
        role: 'Team Lead',
        text: 'We have a team meeting every Monday at 10 AM to discuss our progress and challenges.',
        delay: 1200
      },
      {
        speaker: 'Alex',
        role: 'New Team Member',
        text: 'That sounds great, should I prepare anything for tomorrow\'s meeting?',
        delay: 1200
      },
      {
        speaker: 'Jamie',
        role: 'Team Lead',
        text: 'Just be ready to introduce yourself and share your background with the team.',
        delay: 1200
      },
      {
        speaker: 'Alex',
        role: 'New Team Member',
        text: 'Perfect, I\'ll prepare a brief introduction about my experience and skills.',
        delay: 1200
      }
    ],
    question: {
      question: 'What positive workplace culture element is demonstrated in this dialogue?',
      options: [
        {
          id: 'A',
          text: 'Clear communication of expectations',
          isCorrect: true,
          explanation: 'Correct! Jamie clearly communicates expectations to Alex about the team meeting and what to prepare, which helps new team members integrate smoothly.'
        },
        {
          id: 'B',
          text: 'Micromanagement',
          isCorrect: false,
          explanation: 'Not quite. In this dialogue, Jamie is providing clear expectations about team meetings and what Alex should prepare, which helps new team members feel welcome and prepared.'
        },
        {
          id: 'C',
          text: 'Avoiding responsibility',
          isCorrect: false,
          explanation: 'Not quite. In this dialogue, Jamie is providing clear expectations about team meetings and what Alex should prepare, which helps new team members feel welcome and prepared.'
        },
        {
          id: 'D',
          text: 'Competitive environment',
          isCorrect: false,
          explanation: 'Not quite. In this dialogue, Jamie is providing clear expectations about team meetings and what Alex should prepare, which helps new team members feel welcome and prepared.'
        }
      ]
    }
  },
  {
    id: 'new-perspectives',
    title: 'Valuing New Perspectives',
    description: 'A new team member shares insights about software tools',
    context: 'Alex Taylor shares observations about the team\'s current software tools with Jamie Miller.',
    dialogue: [
      {
        speaker: 'Alex',
        role: 'New Team Member',
        text: 'I noticed we\'re using an older version of the design software.',
      },
      {
        speaker: 'Jamie',
        role: 'Team Lead',
        text: 'Yes, we\'ve been considering an upgrade but haven\'t made the switch yet.',
        delay: 1200
      },
      {
        speaker: 'Alex',
        role: 'New Team Member',
        text: 'In my previous role, we found the newer version improved efficiency by about 30%.',
        delay: 1200
      },
      {
        speaker: 'Jamie',
        role: 'Team Lead',
        text: 'That\'s really valuable information, would you be willing to share more details?',
        delay: 1200
      },
      {
        speaker: 'Alex',
        role: 'New Team Member',
        text: 'Absolutely, I\'d be happy to prepare a brief overview of the benefits.',
        delay: 1200
      },
      {
        speaker: 'Jamie',
        role: 'Team Lead',
        text: 'That would be extremely helpful for our next planning meeting, thank you for speaking up.',
        delay: 1200
      }
    ],
    question: {
      question: 'What workplace culture principle is being demonstrated here?',
      options: [
        {
          id: 'A',
          text: 'Maintaining status quo',
          isCorrect: false,
          explanation: 'Not quite. This dialogue shows Jamie appreciating and valuing Alex\'s new perspective and experience rather than dismissing it because Alex is new to the team.'
        },
        {
          id: 'B',
          text: 'Valuing new perspectives',
          isCorrect: true,
          explanation: 'Correct! Jamie demonstrates a healthy workplace culture by being open to Alex\'s new perspective and valuing the input of a new team member rather than dismissing it.'
        },
        {
          id: 'C',
          text: 'Avoiding change',
          isCorrect: false,
          explanation: 'Not quite. This dialogue shows Jamie appreciating and valuing Alex\'s new perspective and experience rather than dismissing it because Alex is new to the team.'
        },
        {
          id: 'D',
          text: 'Hierarchical decision-making',
          isCorrect: false,
          explanation: 'Not quite. This dialogue shows Jamie appreciating and valuing Alex\'s new perspective and experience rather than dismissing it because Alex is new to the team.'
        }
      ]
    }
  },
  {
    id: 'learning-support',
    title: 'Learning Support',
    description: 'A team lead provides support for learning new tools',
    context: 'Jamie Miller checks in with Alex Taylor about learning the project management software.',
    dialogue: [
      {
        speaker: 'Jamie',
        role: 'Team Lead',
        text: 'How are you settling in with the project management software we use?',
      },
      {
        speaker: 'Alex',
        role: 'New Team Member',
        text: 'I\'m still learning some features, but I\'m having trouble with the reporting section.',
        delay: 1200
      },
      {
        speaker: 'Jamie',
        role: 'Team Lead',
        text: 'That section can be tricky at first, would you like some help with it?',
        delay: 1200
      },
      {
        speaker: 'Alex',
        role: 'New Team Member',
        text: 'That would be great, I was hesitant to ask since everyone seems so busy.',
        delay: 1200
      },
      {
        speaker: 'Jamie',
        role: 'Team Lead',
        text: 'Never hesitate to ask questions here, we all support each other\'s growth.',
        delay: 1200
      },
      {
        speaker: 'Alex',
        role: 'New Team Member',
        text: 'Thanks, that makes me feel much more comfortable about the learning curve.',
        delay: 1200
      }
    ],
    question: {
      question: 'What aspect of positive workplace culture is highlighted in this exchange?',
      options: [
        {
          id: 'A',
          text: 'Working independently without assistance',
          isCorrect: false,
          explanation: 'Not quite. This dialogue demonstrates psychological safety and a learning culture, where team members are encouraged to ask questions without fear and support each other\'s growth.'
        },
        {
          id: 'B',
          text: 'Psychological safety and learning culture',
          isCorrect: true,
          explanation: 'Correct! Jamie creates psychological safety by encouraging Alex to ask questions and emphasizing that team members support each other\'s growth and learning.'
        },
        {
          id: 'C',
          text: 'Prioritizing speed over accuracy',
          isCorrect: false,
          explanation: 'Not quite. This dialogue demonstrates psychological safety and a learning culture, where team members are encouraged to ask questions without fear and support each other\'s growth.'
        },
        {
          id: 'D',
          text: 'Avoiding difficult conversations',
          isCorrect: false,
          explanation: 'Not quite. This dialogue demonstrates psychological safety and a learning culture, where team members are encouraged to ask questions without fear and support each other\'s growth.'
        }
      ]
    }
  }
];

export const initialDialogueState: DialogueState = {
  currentScenario: 0,
  completedScenarios: [],
  isComplete: false,
  answers: {}
};

export const getScenarioByIndex = (index: number): DialogueScenario | undefined => {
  return dialogueScenarios[index];
};

export const getTotalScenarios = (): number => {
  return dialogueScenarios.length;
};