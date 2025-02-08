import React from "react";

interface ActionButtonProps {
  label: string;
  color?: "blue" | "red";
  onClick?: () => void;
  ariaLabel: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  color = "blue",
  onClick,
  ariaLabel,
}) => {
  const buttonColors = {
    blue: "text-blue-500 hover:text-blue-600",
    red: "text-red-500 hover:text-red-600",
  };
  return (
    <button
      className={`${buttonColors[color]} transition-colors`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {label}
    </button>
  );
};