import React from "react";
import StatCard from "@/components/Index/StatCard";

interface Stat {
  title: string;
  value: string | number;
  color: string;
  icon: any;
}

interface StatListProps {
  stats: Stat[];
}

const StatList: React.FC<StatListProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <StatCard key={stat.title} stat={stat} />
      ))}
    </div>
  );
};

export default StatList;
