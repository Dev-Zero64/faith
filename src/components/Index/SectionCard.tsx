import React from "react";
import { motion } from "framer-motion";

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
  delay?: number;
  direction?: "left" | "right";
}

const SectionCard: React.FC<SectionCardProps> = ({
  title,
  children,
  delay = 0,
  direction = "left",
}) => {
  const xDirection = direction === "left" ? -20 : 20;
  return (
    <motion.div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-4" aria-label={title}>
        {title}
      </h2>
      {children}
    </motion.div>
  );
};

export default SectionCard;
