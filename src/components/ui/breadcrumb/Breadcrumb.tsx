"use client";

import React from "react";
import { ArrowLeftCircle } from "lucide-react";

interface BreadcrumbProps {
  client: string;
  path: string;
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  client,
  path,
  className = "",
}) => {
  return (
    <div className={`flex items-center justify-center px-5 py-3 ${className}`}>
      <div className="flex max-w-[1032px] flex-grow items-center justify-start gap-4">
        <button
          onClick={() => {}}
          className="group flex h-8 w-8 min-w-8 items-center justify-center rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Go back"
        >
          <ArrowLeftCircle
            className="h-5 w-5 text-white transition-colors group-hover:text-gray-600 dark:group-hover:text-gray-300"
            strokeWidth={1.7}
          />
        </button>
        <h1 className="flex-grow text-xl font-normal text-white">
          {client} / {path}
        </h1>
      </div>
    </div>
  );
};

export default Breadcrumb;
