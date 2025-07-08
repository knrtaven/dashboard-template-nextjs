"use client";
import React, { useState } from "react";

interface SwitchProps {
  label: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  color?: "blue" | "gray" | string; // Allow any string for hex values
}

const Switch: React.FC<SwitchProps> = ({
  label,
  defaultChecked = false,
  disabled = false,
  onChange,
  color = "blue", // Default to blue color
}) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const handleToggle = () => {
    if (disabled) return;
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    if (onChange) {
      onChange(newCheckedState);
    }
  };

  // Function to determine if color is a predefined theme or hex
  const isHexColor = (color: string) => {
    return color.startsWith("#");
  };

  // Get the appropriate background class
  const getBackgroundClass = () => {
    if (disabled) return "bg-gray-100 pointer-events-none dark:bg-gray-800";

    if (!isChecked) return "bg-gray-200 dark:bg-white/10";

    if (isHexColor(color)) {
      return `bg-[${color}]`; // Use the hex color directly
    }

    // Predefined colors
    switch (color) {
      case "blue":
        return "bg-brand-500";
      case "gray":
        return "bg-gray-800 dark:bg-white/10";
      default:
        return "bg-brand-500"; // Default to blue if unrecognized
    }
  };

  return (
    <label
      className={`flex cursor-pointer items-center gap-3 text-sm font-medium select-none ${
        disabled ? "text-gray-400" : "text-gray-700 dark:text-gray-400"
      }`}
      onClick={handleToggle}
    >
      <div className="relative">
        <div
          className={`block h-6 w-11 rounded-full transition duration-150 ease-linear ${getBackgroundClass()}`}
        ></div>
        <div
          className={`shadow-theme-sm absolute top-0.5 left-0.5 h-5 w-5 transform rounded-full duration-150 ease-linear ${
            isChecked ? "translate-x-full bg-white" : "translate-x-0 bg-white"
          }`}
        ></div>
      </div>
      {label}
    </label>
  );
};

export default Switch;
