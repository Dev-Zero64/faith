import React from "react";
import { Card } from "@/components/ui/card";

interface FinanceCardProps {
  title: string;
  value: number;
  color: string;
}

const FinanceCard: React.FC<FinanceCardProps> = ({ title, value, color }) => {
  const formattedValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
  return (
    <Card className="p-6">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p
        className={`text-2xl font-bold ${
          value >= 0 ? "text-green-600" : "text-red-600"
        }`}
      >
        {formattedValue}
      </p>
    </Card>
  );
};

export default FinanceCard;