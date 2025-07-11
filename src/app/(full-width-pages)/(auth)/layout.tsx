// import GridShape from "@/components/references/common/GridShape";
// import ThemeTogglerTwo from "@/components/references/common/ThemeTogglerTwo";

import { ThemeProvider } from "@/context/ThemeContext";
// import Image from "next/image";
import Link from "next/link";
import React from "react";
// import { Appellon_logo } from "../../../../public/images/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <ThemeProvider>
        <div className="relative flex lg:flex-row w-full h-screen justify-center flex-col  dark:bg-gray-900 sm:p-0">
          {children}
          <div className="lg:w-1/2 w-full h-full bg-brand-primary dark:bg-white/5 lg:grid items-center hidden">
            <div className="relative items-center justify-center  flex z-1">
              {/* <!-- ===== Common Grid Shape Start ===== --> */}
            
              <div className="flex flex-col items-center max-w-xs">
                <Link href="/" className="block mb-4">
                  {/* <Image
                    width={231}
                    height={48}
                    src={Appellon_logo}
                    alt="Logo"
                  /> */}
                </Link>
                <p className="text-center text-3xl font-bold text-neutral-100 dark:text-white/60">
                  Appellon
                </p>
              </div>
            </div>
          </div>
          {/* <div className="fixed bottom-6 right-6 z-50 hidden sm:block">
            <ThemeTogglerTwo />
          </div> */}
        </div>
      </ThemeProvider>
    </div>
  );
}
