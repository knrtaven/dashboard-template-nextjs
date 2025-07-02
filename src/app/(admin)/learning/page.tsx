

import InteractiveVideoPlayer from "@/components/InteractiveVideoPlayer/interActiveVideoPlayer";
import LearningCards from "@/components/learning/LearningCards";
import LearningHeadline from "@/components/learning/LearningHeadline";
import type { Metadata } from "next";

import React from "react";


export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Learning() {
  return (
    <div className="flex flex-col gap-4">

<InteractiveVideoPlayer
  
/>
      <LearningHeadline/>
    
      
      <LearningCards/>
      <div className="rounded-lg flex justify-evenly gap-5 h-50 bg-[#7f56d9]">
        <div>
        <span>Your learning Path</span>

        <p>Please complete your lessons each month.</p>
        </div>
        
        <div className="bg-[#0205d3] h-10 boredr">
          items here
        </div>

      </div>

      <div className="rounded-lg flex justify-evenly gap-5 h-50 bg-[#7f56d9]">
        <div>
        <span>Your learning Path</span>

        <p>Please complete your lessons each month.</p>
        </div>
        
        <div className="bg-[#0205d3] h-10 boredr">
          items here
        </div>

      </div>

      <div className="rounded-lg flex justify-evenly gap-5 h-50 bg-[#7f56d9]">
        <div>
        <span>Your learning Path</span>

        <p>Please complete your lessons each month.</p>
        </div>
        
        <div className="bg-[#0205d3] h-10 boredr">
          items here
        </div>

      </div>
      
      {/* <div className="col-span-12 space-y-6 xl:col-span-7">
        <EcommerceMetrics />

        <MonthlySalesChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget />
      </div>

      <div className="col-span-12">
        <StatisticsChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <DemographicCard />
      </div>

      <div className="col-span-12 xl:col-span-7">
        <RecentOrders />
      </div> */}
    </div>
  );
}
