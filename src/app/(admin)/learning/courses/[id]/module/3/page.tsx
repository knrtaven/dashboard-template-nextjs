
"use client";

import CultureCrossroadsFlow from '@/components/modules/lesson3/CultureCrossroadsFlow'
import VariantSelector from '@/components/modules/lesson3/VariantSelector'
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
    return <CultureCrossroadsFlow onBack={handleBackToSelector} />;
  }

  if (selectedVariant === 'dialogue-scenarios') {
    return <DialogueModule onBack={handleBackToSelector} />;
  }

  if (selectedVariant === 'story') {
    return <StoryModule onBack={handleBackToSelector} />;
  }

  return null;
}
