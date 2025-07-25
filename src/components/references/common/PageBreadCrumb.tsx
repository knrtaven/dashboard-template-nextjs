import Link from "next/link";
import React from "react";

interface BreadcrumbProps {
  pageTitle: string;
  breadcrumbs: { label: string; href: string }[];
}

const PageBreadcrumb: React.FC<BreadcrumbProps> = ({ pageTitle, breadcrumbs }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
      <h2
        className="text-xl font-semibold text-gray-800 dark:text-white/90"
        x-text="pageName"
      >
        {pageTitle}
      </h2>
      <nav>
        <ol className="flex items-center gap-1.5">
          <li>
            <Link
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
              href="/"
            >
              Home
             
            </Link>
          </li>
          {breadcrumbs.map((crumb, idx) => (
            <li key={crumb.href} className="flex items-center">
              <svg
                className="stroke-current mx-1"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                  stroke=""
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {idx === breadcrumbs.length - 1 ? (
                <span className="text-sm text-gray-800 dark:text-white/90">{crumb.label}</span>
              ) : (
                <Link
                  className="text-sm text-gray-500 dark:text-gray-400"
                  href={crumb.href}
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default PageBreadcrumb;
