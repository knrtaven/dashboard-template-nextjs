"use client";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

export default function TwoFactorForm() {
  const router = useRouter();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (index: number, value: string) => {
    // Only allow single digits
    if (value.length > 1) return;
    
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    
    // Handle arrow keys
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    
    // Only process if it's exactly 6 digits
    if (/^\d{6}$/.test(pastedData)) {
      const newCode = pastedData.split('');
      setCode(newCode);
      // Focus the last input
      inputRefs.current[5]?.focus();
    }
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8 text-center">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Authentication
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your verification code to continue!
            </p>
          </div>

          <form onSubmit={(e) => {
            e.preventDefault();
            // Check if all digits are filled
            if (code.every(digit => digit !== '')) {
              router.push('/learning');
            }
          }}>
            <div className="space-y-6">
              <div>
                {/* Six-digit input grid */}
                <div className="flex justify-center gap-2 sm:gap-3 mb-6">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      ref={el =>{ inputRefs.current[index] = el}}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      className="w-12 h-12 sm:w-14 sm:h-14 text-center text-lg font-semibold border-2 border-gray-300 rounded-lg focus:border-[#7f56d9] focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-[#7f56d9]"
                      autoComplete="off"
                    />
                  ))}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={!code.every(digit => digit !== '')}
                  className="w-full py-3 px-4 bg-[#7f56d9] hover:bg-[#6d48c7] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200 dark:disabled:bg-gray-600"
                >
                  Verify Code
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}