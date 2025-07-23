'use client';

import React, { useState } from 'react';
import Chatbox from '@/components/AIChatbox/Chatbox';
import PostVideoSurvey from '@/components/modules/lesson3/components/PostVideoSurvey';
import { useRouter } from 'next/navigation' // or 'next/router' for Pages Router

type ModuleStep = 'chatbox' | 'survey';

export default function Module4Demo() {
  const [currentStep, setCurrentStep] = useState<ModuleStep>('chatbox');
  const router = useRouter()
  const handleChatboxComplete = () => {
    console.log(currentStep)
    setCurrentStep('survey');
  };

  const handleSurveyComplete = () => {
    // You can add additional logic here, such as:
    // - Saving completion status
    // - Redirecting to next module
    // - Showing completion message
    router.push('/learning')
    console.log('Module 4 completed!');
  };

  // Render based on current step
  switch (currentStep) {
    case 'chatbox':
      return <Chatbox onNextStep={handleChatboxComplete} />;
    
    case 'survey':
      return <PostVideoSurvey onSurveyComplete={handleSurveyComplete} />;
    
    default:
      return <Chatbox onNextStep={handleChatboxComplete} />;
  }
}