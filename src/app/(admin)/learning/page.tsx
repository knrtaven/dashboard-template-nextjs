
import IncompleteCards from "@/components/learning/IncompleteCards";
import LearningCards from "@/components/learning/LearningCards";
import LearningHeadline from "@/components/learning/LearningHeadline";
import type { Metadata } from "next";

import React from "react";


export const metadata: Metadata = {
  title: "Appellon",
  description:
    "Appellon",
};

export default function Learning() {
  return (
    <div className="flex flex-col gap-4">
      

      <LearningHeadline/>

      <IncompleteCards/>
      
      <LearningCards/>
    
    
    </div>
  );
}
