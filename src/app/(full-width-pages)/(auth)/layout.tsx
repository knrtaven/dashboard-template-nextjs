import { ThemeProvider } from "@/context/ThemeContext";
import React from "react";
import { Appellon_banner } from "../../../../public/images/logo";

export default function AuthLayout({
  children,
}: {
  
  children: React.ReactNode;
}) {

  // Helper function to get image source
  const getImageSrc = (image: string | { src?: string; default?: string }): string => {
    if (typeof image === 'string') {
      return image;
    }
    if (image && typeof image === 'object' && 'src' in image) {
      return image.src ?? '';
    }
    if (image && typeof image === 'object' && 'default' in image) {
      return image.default ?? '';
    }
    return '';
  };

  return (
    <div className="relative p-6 bg-white dark:bg-gray-900 sm:p-0">
      <ThemeProvider>
        <div className="relative flex lg:flex-row w-full h-screen justify-center flex-col dark:bg-gray-900 sm:p-0">
          {children}
          
          {/* Right side with background image */}
          <div className="lg:w-1/2 w-full h-full relative hidden lg:block">
            {/* Background image container */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-brand-primary dark:bg-white/5"
              style={{
                backgroundImage: `url('${getImageSrc(Appellon_banner)}')`
              }}
            />
            
            {/* Content overlay */}
            <div className="relative h-full flex items-center justify-center z-10">
              <div className="flex flex-col items-center max-w-xs">
                {/* Your content here */}
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}