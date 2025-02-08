import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import FinanceCard from "@/components/Finanças/FinanceCard";
import FinanceChart from "@/components/Finanças/FinanceChart";
import FinanceLayout from "@/components/Finanças/FinanceLayout";
import { supabase } from "@/services/supabase";

const FinancasPage = () => {
  // Estados para armazenar os dados
  const [totalEntradas, setTotalEntradas] = useState(0);
  const [totalSaidas, setTotalSaidas] = useState(0);
  const [saldo, setSaldo] = useState(0);
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar os dados do Supabase
  const fetchFinancialData = async () => {
    try {
      setLoading(true);

      // Buscar entradas
      const { data: entradasData, error: entradasError } = await supabase
        .from("entradas")
        .select("valor, data");

      if (entradasError) {
        console.error("Erro ao buscar entradas:", entradasError);
      }

      // Buscar saídas
      const { data: saidasData, error: saidasError } = await supabase
        .from("saidas")
        .select("valor, data");

      if (saidasError) {
        console.error("Erro ao buscar saídas:", saidasError);
      }

      // Processar os dados
      const entradasPorMes = groupByMonth(entradasData || [], true); // Entradas são positivas
      const saidasPorMes = groupByMonth(saidasData || [], false); // Saídas são negativas

      // Mesclar os dados por mês
      const mesesUnicos = [
        ...new Set([
          ...Object.keys(entradasPorMes),
          ...Object.keys(saidasPorMes),
        ]),
      ].sort();

      const chartDataFormatted = mesesUnicos.map((mes) => ({
        name: mes,
        entradas: entradasPorMes[mes] || 0,
        saidas: saidasPorMes[mes] || 0,
      }));

      // Calcular totais
      const totalEntradas = Object.values(entradasPorMes).reduce(
        (sum, val) => sum + val,
        0
      );
      const totalSaidas = Object.values(saidasPorMes).reduce(
        (sum, val) => sum + Math.abs(val),
        0
      );
      const saldoCalculado = totalEntradas - totalSaidas;

      // Atualizar estados
      setTotalEntradas(totalEntradas);
      setTotalSaidas(totalSaidas);
      setSaldo(saldoCalculado);
      setChartData(chartDataFormatted);
    } catch (err) {
      console.error("Erro inesperado:", err);
    } finally {
      setLoading(false);
    }
  };

  // Função para agrupar dados por mês
  const groupByMonth = (data: any[], isPositive: boolean) => {
    const grouped: Record<string, number> = {};

    data.forEach((item) => {
      const date = new Date(item.data);
      const month = `${date.getMonth() + 1}/${date.getFullYear()}`;
      grouped[month] =
        (grouped[month] || 0) + (isPositive ? item.valor : -item.valor);
    });

    return grouped;
  };

  // Chama a função fetchFinancialData quando o componente é montado
  useEffect(() => {
    fetchFinancialData();
  }, []);

  return (
    <FinanceLayout>
      <h1 className="text-3xl font-bold text-gray-800">Finanças</h1>

      {/* Cartões de Resumo Financeiro */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FinanceCard
          title="Total de Entradas"
          value={totalEntradas}
          color="green"
        />
        <FinanceCard title="Total de Saídas" value={totalSaidas} color="red" />
        <FinanceCard
          title="Saldo"
          value={saldo}
          color={saldo >= 0 ? "green" : "red"}
        />
      </div>

      {/* Gráfico de Movimentações */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Movimentações</h2>
        {loading ? (
          <p>Carregando dados...</p>
        ) : (
          <FinanceChart data={chartData} />
        )}
      </Card>
    </FinanceLayout>
  );
};

export default FinancasPage;
