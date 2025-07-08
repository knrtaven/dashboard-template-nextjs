import React, { useRef, useEffect } from "react";

interface TextareaProps {
  placeholder?: string; // Placeholder text
  rows?: number; // Number of rows
  value?: string; // Current value
  onChange?: (value: string) => void; // Change handler
  className?: string; // Additional CSS classes
  disabled?: boolean; // Disabled state
  error?: boolean; // Error state
  hint?: string; // Hint text to display
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void; // Key down handler
  maxHeight?: number; // Add maxHeight prop (in pixels)
  borderless?: boolean; // Add option to hide border
}

const TextArea: React.FC<TextareaProps> = ({
  placeholder = "Enter your message", // Default placeholder
  rows = 3, // Default number of rows
  value = "", // Default value
  onChange, // Callback for changes
  className = "", // Additional custom styles
  disabled = false, // Disabled state
  error = false, // Error state
  hint = "", // Default hint text
  onKeyDown, // Key down handler
  maxHeight = 200, // Default max height (200px)
  borderless = false, // Default to showing borders
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
    // Auto-adjust height on content change
    adjustHeight();
  };

  // Function to adjust the height of the textarea based on content
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = "auto";

    // Calculate new height based on scrollHeight
    const newHeight = Math.min(textarea.scrollHeight, maxHeight);
    textarea.style.height = `${newHeight}px`;

    // Add scrollbar if content exceeds maxHeight
    textarea.style.overflowY =
      textarea.scrollHeight > maxHeight ? "auto" : "hidden";
  };

  // Handle Enter key press and auto-expand
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      // Insert a newline character at the cursor position
      const textarea = e.currentTarget;
      const cursorPosition = textarea.selectionStart;
      const textBeforeCursor = textarea.value.substring(0, cursorPosition);
      const textAfterCursor = textarea.value.substring(cursorPosition);

      const newValue = textBeforeCursor + "\n" + textAfterCursor;

      // Update the textarea value
      if (onChange) {
        onChange(newValue);
      }

      // Set cursor position after the new line (async to ensure value is updated)
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = cursorPosition + 1;
          textareaRef.current.selectionEnd = cursorPosition + 1;
        }
      }, 0);
    }

    // Call the provided onKeyDown handler if it exists
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  // Adjust height when value changes
  useEffect(() => {
    adjustHeight();
  }, [value]);

  // Build the class list - remove shadow if borderless
  let textareaClasses = `w-full rounded-lg px-4 py-2.5 text-sm ${!borderless ? "shadow-theme-xs" : ""} focus:outline-hidden resize-none ${className}`;

  // Apply border styling
  if (!borderless) {
    textareaClasses += " border";
  }

  if (disabled) {
    textareaClasses += ` bg-gray-100 opacity-50 text-gray-500 ${!borderless && "border-gray-300"} cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`;
  } else if (error) {
    textareaClasses += ` bg-transparent text-gray-400 ${!borderless && "border-gray-300"} focus:border-error-300 focus:ring-3 focus:ring-error-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-error-800`;
  } else {
    textareaClasses += ` bg-transparent text-gray-400 ${!borderless ? "border-gray-300" : ""} focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800`;
  }

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={textareaClasses}
        style={{
          overflow: "hidden",
          overflowY: "auto",
        }}
      />
      {hint && (
        <p
          className={`mt-2 text-sm ${
            error ? "text-error-500" : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {hint}
        </p>
      )}
    </div>
  );
};

export default TextArea;
