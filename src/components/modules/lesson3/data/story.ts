export interface StorySlide {
  id: number;
  content: string;
  imageUrl: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export const storySlides: StorySlide[] = [
  {
    id: 1,
    content: "Mary was stuck. As a manager of a regional grocery chain, she had been struggling for months to fill key positions. No matter how many job ads she posted, they weren't getting results.\n\nThe stores were understaffed, her team was stretched thin, and morale was slipping.",
    imageUrl: "https://zxkkfqxwop.ufs.sh/f/3HDjxwG57N0K2M8gM93EoR9ZSwuVAg6FjPKQqaIMl7sGW4Uh"
  },
  {
    id: 2,
    content: "Then, Mary had an idea: what if the entire team got involved? Instead of trying to deal with hiring alone, she turned it into a team effort.",
    imageUrl: "https://zxkkfqxwop.ufs.sh/f/3HDjxwG57N0Kl9v2vINNFXmEKIJtRV5dT4iz3kLnwZCBSrc6"
  },
  {
    id: 3,
    content: "She gathered everyone together, explained the challenge, and opened the floor for ideas. What happened next was incredible.",
    imageUrl: "https://zxkkfqxwop.ufs.sh/f/3HDjxwG57N0KRhN9ISQbLM3U4xmCDYlOtA1EBpnwW5ZJIjfq"
  },
  {
    id: 4,
    content: "The maintenance crew put up hiring flyers around town. Sarah, a cashier, started spreading the word at school drop-offs and sports events. Team members invited friends and family to shadow them for a day.\n\nAnd suddenly, people wanted to join.",
    imageUrl: "https://zxkkfqxwop.ufs.sh/f/3HDjxwG57N0K5lY0GUMHTjW26NAe1i0QYKnvPolqXIzcZhat"
  },
  {
    id: 5,
    content: "Within weeks, the store had filled its vacant positions. Even better, they had a list of people ready to join the team in the future.\n\nAnd the biggest win was that the team felt like they weren't just showing up for work, they were making a real difference.",
    imageUrl: "https://zxkkfqxwop.ufs.sh/f/3HDjxwG57N0KvUncAwr1uVRdEXi4FwMg58YlfUsI3SWCrnjB"
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What was Mary's main challenge in the story?",
    options: [
      {
        id: "a",
        text: "Dealing with low product inventory",
        isCorrect: false
      },
      {
        id: "b", 
        text: "Struggling to fill key positions despite posting job ads",
        isCorrect: true
      },
      {
        id: "c",
        text: "Managing conflicts between team members",
        isCorrect: false
      }
    ]
  },
  {
    id: 2,
    question: "What approach did Mary take to solve her problem?",
    options: [
      {
        id: "a",
        text: "She hired a professional recruiting agency",
        isCorrect: false
      },
      {
        id: "b",
        text: "She increased the salary offers for open positions", 
        isCorrect: false
      },
      {
        id: "c",
        text: "She turned hiring into a collaborative team effort",
        isCorrect: true
      }
    ]
  },
  {
    id: 3,
    question: "What was the biggest benefit of Mary's approach beyond filling positions?",
    options: [
      {
        id: "a",
        text: "It saved the company money on recruitment costs",
        isCorrect: false
      },
      {
        id: "b",
        text: "Team members felt they were making a real difference",
        isCorrect: true
      },
      {
        id: "c",
        text: "Mary got promoted to a higher management position",
        isCorrect: false
      }
    ]
  }
];