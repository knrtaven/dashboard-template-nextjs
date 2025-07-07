'use client';
import { ChevronRight } from "lucide-react";
import Button from "../ui/button/Button";

const InsightsHeader = () => {
  return (
    <div className="rounded-lg flex lg:justify-between justify-start items-center gap-5 px-10 h-50 bg-[#7f56d9]">

       {/* Left Side */}
        <div className='text-white space-y-2'>
          <h2 className="text-2xl font-bold text-white">
          Apollo Care Alliance
          </h2>
          <p className=" mt-1">
            Welcome to your Culture and wellbeing platform
          </p>
          <p className='text-sm'>
            Members: <span className="font-bold">1,200</span>
          </p>
        </div>
        

        {/* Right Side */}
        <div className="hidden lg:flex items-center bg-[#a795cd] text-white w-96 rounded-lg px-4 py-6">
          <div className="flex flex-row items-center justify-between w-full">
            <h2 className="text-lg font-medium">
              Learning Progress
            </h2>
            <Button variant="outline" size="xs" className="!rounded-full">
              <ChevronRight />
            </Button>
          </div>

          <div>

          </div>
        </div>

      </div>
  );
};

export default InsightsHeader;