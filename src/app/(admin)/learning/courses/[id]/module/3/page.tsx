
"use client";

import LessonFlow from '@/components/modules/lesson3/components/LessonFlow'
import VariantSelector from '@/components/modules/lesson3/VariantSelector'
import CultureCrossroads from '@/components/modules/lesson3/CultureCrossroads'
import DialogueModule from '@/components/modules/lesson3/DialogueModule'
import StoryModule from '@/components/modules/lesson3/StoryModule'
import React, { useState } from 'react'

type VariantType = 'culture-crossroads' | 'dialogue-scenarios' | 'story' | null;

export default function Module3Demo() {
  const [selectedVariant, setSelectedVariant] = useState<VariantType>(null);

  const handleSelectVariant = (variant: 'culture-crossroads' | 'dialogue-scenarios' | 'story') => {
    setSelectedVariant(variant);
  };

  const handleBackToSelector = () => {
    setSelectedVariant(null);
  };

  // Show variant selector if no variant is selected
  if (!selectedVariant) {
    return <VariantSelector onSelectVariant={handleSelectVariant} />;
  }

  // Render selected variant
  if (selectedVariant === 'culture-crossroads') {
    return <LessonFlow LessonComponent={CultureCrossroads} onBack={handleBackToSelector} />;
  }

  if (selectedVariant === 'dialogue-scenarios') {
    return <LessonFlow LessonComponent={DialogueModule} onBack={handleBackToSelector} />;
  }

  if (selectedVariant === 'story') {
    return <LessonFlow LessonComponent={StoryModule} onBack={handleBackToSelector} />;
  }

  return null;
}
