import { Chapter, Question } from '@/components/InteractiveVideoPlayer/types';

export const chapters: Chapter[] = [
  {
    id: 1,
    title: 'Welcome to Appellon',
    startTime: 0,
    endTime: 30,
    description: 'Course introduction',
  },
  {
    id: 2,
    title: 'Main Content',
    startTime: 30,
    endTime: 120,
    description: 'Core learning material',
  },
];

export const questions: Question[] = [
  // First trigger time
  {
    id: 1,
    triggerTime: 31,
    question: 'Appellon is about helping your organisation to develop',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'New Products', correct: false },
      { id: 'b', text: 'Better ways of working', correct: true },
      { id: 'c', text: 'Improve HR practices', correct: false },
      { id: 'd', text: 'Sales Strategies', correct: false },
    ],
    feedback: {
      correct: "That's right!\nAppellon is here to help your organization work better together",
      incorrect: 'Not quite!\nAppellon is here to help your organization work better together',
    },
    nextAction: 'continue',
  },
  {
    id: 2,
    triggerTime: 31,
    question: 'Do helpful behaviours release oxytocin?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'Yes', correct: true },
      { id: 'b', text: 'No', correct: false },
    ],
    feedback: {
      correct:
        "That's right!\nHelpful behaviours release oxytocin, which makes us feel connected and supported.",
      incorrect:
        'Not quite!\nHelpful behaviours release oxytocin, which makes us feel connected and supported',
    },
    nextAction: 'continue',
  },

  // Second trigger time
  {
    id: 3,
    triggerTime: 62,
    question: 'Every decision we make falls on continuum',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'True', correct: true },
      { id: 'b', text: 'False', correct: false },
    ],
    feedback: {
      correct:
        "That's right!\nEvery decision falls somewhere on the continuum of helpful and harmful behaviours.",
      incorrect:
        'Not quite!\nEvery decision falls somewhere on the continuum of helpful and harmful behaviours.',
    },
    nextAction: 'continue',
  },
  {
    id: 4,
    triggerTime: 62,
    question: 'Do helpful behaviours release oxytocin?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'Yes', correct: true },
      { id: 'b', text: 'No', correct: false },
    ],
    feedback: {
      correct:
        "That's right!\nHelpful behaviours release oxytocin, which makes us feel connected and supported.",
      incorrect:
        'Not quite!\nHelpful behaviours release oxytocin, which makes us feel connected and supported',
    },
    nextAction: 'continue',
  },

  // Third trigger time
  {
    id: 5,
    triggerTime: 99,
    question: 'We can improve our connection, performance, achievement and ______',
    type: 'text-input',
    correctAnswer: 'wellbeing',
    feedback: {
      correct:
        "That's right!\nWhen we work together, we can improve our connection, performance, achievement and wellbeing.",
      incorrect:
        'Not quite!\nWhen we work together, we can improve our connection, performance, achievement and wellbeing.',
    },
    nextAction: 'continue',
  },
  {
    id: 6,
    triggerTime: 99,
    question: 'Appellon is about helping your organisation to develop',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'New Products', correct: false },
      { id: 'b', text: 'Better ways of working', correct: true },
      { id: 'c', text: 'Improve HR practices', correct: false },
      { id: 'd', text: 'Sales Strategies', correct: false },
    ],
    feedback: {
      correct: "That's right!\nAppellon is here to help your organization work better together",
      incorrect: 'Not quite!\nAppellon is here to help your organization work better together',
    },
    nextAction: 'continue',
  },

  // Fourth trigger time
  {
    id: 7,
    triggerTime: 139,
    question: 'Appellon is about helping your organisation to develop',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'New Products', correct: false },
      { id: 'b', text: 'Better ways of working', correct: true },
      { id: 'c', text: 'Improve HR practices', correct: false },
      { id: 'd', text: 'Sales Strategies', correct: false },
    ],
    feedback: {
      correct: "That's right!\nAppellon is here to help your organization work better together",
      incorrect: 'Not quite!\nAppellon is here to help your organization work better together',
    },
    nextAction: 'continue',
  },
  {
    id: 8,
    triggerTime: 139,
    question: 'We can improve our connection, performance, achievement and ______',
    type: 'text-input',
    correctAnswer: 'wellbeing',
    feedback: {
      correct:
        "That's right!\nWhen we work together, we can improve our connection, performance, achievement and wellbeing.",
      incorrect:
        'Not quite!\nWhen we work together, we can improve our connection, performance, achievement and wellbeing.',
    },
    nextAction: 'continue',
  },

  // Fifth trigger time
  {
    id: 9,
    triggerTime: 176,
    question: 'Do helpful behaviours release oxytocin?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'Yes', correct: true },
      { id: 'b', text: 'No', correct: false },
    ],
    feedback: {
      correct:
        "That's right!\nHelpful behaviours release oxytocin, which makes us feel connected and supported.",
      incorrect:
        'Not quite!\nHelpful behaviours release oxytocin, which makes us feel connected and supported',
    },
    nextAction: 'continue',
  },
  {
    id: 10,
    triggerTime: 176,
    question: 'Do helpful behaviours release oxytocin?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'Yes', correct: true },
      { id: 'b', text: 'No', correct: false },
    ],
    feedback: {
      correct:
        "That's right!\nHelpful behaviours release oxytocin, which makes us feel connected and supported.",
      incorrect:
        'Not quite!\nHelpful behaviours release oxytocin, which makes us feel connected and supported',
    },
    nextAction: 'continue',
  },

  // Sixth trigger time
  {
    id: 11,
    triggerTime: 203,
    question: 'Appellon is about helping your organisation to develop',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'New Products', correct: false },
      { id: 'b', text: 'Better ways of working', correct: true },
      { id: 'c', text: 'Improve HR practices', correct: false },
      { id: 'd', text: 'Sales Strategies', correct: false },
    ],
    feedback: {
      correct: "That's right!\nAppellon is here to help your organization work better together",
      incorrect: 'Not quite!\nAppellon is here to help your organization work better together',
    },
    nextAction: 'continue',
  },
  {
    id: 12,
    triggerTime: 203,
    question: 'Do helpful behaviours release oxytocin?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'Yes', correct: true },
      { id: 'b', text: 'No', correct: false },
    ],
    feedback: {
      correct:
        "That's right!\nHelpful behaviours release oxytocin, which makes us feel connected and supported.",
      incorrect:
        'Not quite!\nHelpful behaviours release oxytocin, which makes us feel connected and supported',
    },
    nextAction: 'continue',
  },
];

export const videoUrl = "https://uvupczshcgzfnfdqadwc.supabase.co/storage/v1/object/public/public-storage//lesson1_2.mp4";