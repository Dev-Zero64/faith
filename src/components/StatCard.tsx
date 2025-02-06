import React from "react";
import { motion } from "framer-motion";

interface Stat {
  title: string;
  value: string | number;
  color: string;
  icon: any; // Ícone React
}

const StatCard: React.FC<{ stat: Stat }> = ({ stat }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-full ${stat.color}`}>
          <stat.icon size={24} className="text-white" aria-hidden="true" />
        </div>
        <div>
          <p className="text-gray-500 text-sm">{stat.title}</p>
          <p
            className="text-2xl font-bold text-gray-800"
            aria-label={`${stat.title}: ${stat.value}`}
          >
            {stat.value}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
