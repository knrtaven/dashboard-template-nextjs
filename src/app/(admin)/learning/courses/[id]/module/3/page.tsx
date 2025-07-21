
"use client";

import CultureCrossroads from '@/components/modules/lesson3/CultureCrossroads'
import VariantSelector from '@/components/modules/lesson3/VariantSelector'
import DialogueModule from '@/components/modules/lesson3/DialogueModule'
import React, { useState } from 'react'

type VariantType = 'culture-crossroads' | 'dialogue-scenarios' | null;

export default function Module3Demo() {
  const [selectedVariant, setSelectedVariant] = useState<VariantType>(null);

  const handleSelectVariant = (variant: 'culture-crossroads' | 'dialogue-scenarios') => {
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
    return <CultureCrossroads onBack={handleBackToSelector} />;
  }

  if (selectedVariant === 'dialogue-scenarios') {
    return <DialogueModule onBack={handleBackToSelector} />;
  }

  return null;
}
