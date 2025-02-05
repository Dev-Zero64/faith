import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Navbar } from "@/components/Navbar";
import { useEffect, useState } from "react";
import { supabase } from "@/services/supabase";

// Componente para exibir um cartão de resumo financeiro
const FinanceCard = ({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) => {
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
const [totalEntradas, setTotalEntradas] = useState(0);
const [error, setError] = useState<string | null>(null);
useEffect(() => {
  const fetchEntradas = async () => {
    try {
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const { data, error } = await supabase
        .from("entradas")
        .select("valor")
        .gte("data", startOfMonth.toISOString());

      if (error) throw error;

      const total = data?.reduce(
        (sum, entrada) => sum + (entrada.valor || 0),
        0
      );
      setTotalEntradas(total || 0);
    } catch (err: any) {
      setError(err.message || "Erro ao buscar entradas financeiras.");
    }
  };

  fetchEntradas();
}, []);

// Componente para exibir o gráfico de movimentações
const FinanceChart = ({ data }: { data: any[] }) => {
  return (
    <div className="w-full h-[300px]">
      <LineChart
        width={800}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        className="mx-auto"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="entradas" stroke="#10B981" />
        <Line type="monotone" dataKey="saidas" stroke="#EF4444" />
      </LineChart>
    </div>
  );
};

const FinancasPage = () => {
  // Dados fictícios para o gráfico
  const data = [
    { name: "Jan", entradas: 12, saidas: 2400 },
    { name: "Fev", entradas: 3000, saidas: 1398 },
    { name: "Mar", entradas: 2000, saidas: 9800 },
  ];

  // Cálculo automático dos totais
  const totalEntradas = data.reduce((sum, item) => sum + item.entradas, 0);
  const totalSaidas = data.reduce((sum, item) => sum + item.saidas, 0);
  const saldo = totalEntradas - totalSaidas;

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6 container mx-auto px-4 py-8"
      >
        {/* Título */}
        <h1 className="text-3xl font-bold text-gray-800">Finanças</h1>

        {/* Cartões de Resumo Financeiro */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FinanceCard
            title="Total de Entradas"
            value={totalEntradas}
            color="green"
          />
          <FinanceCard
            title="Total de Saídas"
            value={totalSaidas}
            color="red"
          />
          <FinanceCard
            title="Saldo"
            value={saldo}
            color={saldo >= 0 ? "green" : "red"}
          />
        </div>

        {/* Gráfico de Movimentações */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Movimentações</h2>
          <FinanceChart data={data} />
        </Card>
      </motion.div>
    </>
  );
};

export default FinancasPage;
