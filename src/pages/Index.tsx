import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { supabase } from "@/services/supabase";
import { Users, Church, DollarSign, Calendar } from "lucide-react";

// Interface para as estatísticas
interface Stat {
  title: string;
  value: string | number;
  color: string;
  icon: any; // Ícone React
}

// Componente para exibir cada estatística
const StatCard = ({ stat }: { stat: Stat }) => {
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

// Componente genérico para seções com título e conteúdo
const SectionCard = ({
  title,
  children,
  delay = 0,
  direction = "left",
}: {
  title: string;
  children: React.ReactNode;
  delay?: number;
  direction?: "left" | "right";
}) => {
  const xDirection = direction === "left" ? -20 : 20;
  return (
    <motion.div
      initial={{ opacity: 0, x: xDirection }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-4" aria-label={title}>
        {title}
      </h2>
      {children}
    </motion.div>
  );
};

// Função genérica para buscar dados do Supabase
const fetchData = async (table: string, queryFn?: (query: any) => any) => {
  let query = supabase.from(table).select("*");
  if (queryFn) {
    query = queryFn(query);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data;
};

const Index = () => {
  const [eventCount, setEventCount] = useState<number>(0);
  const [memberCount, setMemberCount] = useState<number>(0);
  const [cellCount, setCellCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [nextEvent, setNextEvent] = useState<any>(null);
  const [totalEntradas, setTotalEntradas] = useState<number>(0);

  useEffect(() => {
    const fetchDataAndSetState = async (
      table: string,
      setState: (value: any) => void,
      queryFn?: (query: any) => any
    ) => {
      try {
        const data = await fetchData(table, queryFn);
        setState(data.length || 0);
      } catch (err: any) {
        setError(err.message || `Erro ao buscar dados de ${table}.`);
      } finally {
        setLoading(false);
      }
    };

    fetchDataAndSetState("membros", setMemberCount);
    fetchDataAndSetState("eventos", setEventCount);
    fetchDataAndSetState("celulas", setCellCount);

    const fetchNextEvent = async () => {
      try {
        const data = await fetchData("eventos", (query) =>
          query
            .gte("data", new Date().toISOString())
            .order("data", { ascending: true })
            .limit(1)
        );
        setNextEvent(data[0] || null);
      } catch (err: any) {
        setError(err.message || "Erro ao buscar próximo evento.");
      } finally {
        setLoading(false);
      }
    };

    const fetchEntradas = async () => {
      try {
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        const data = await fetchData("entradas", (query) =>
          query.gte("data", startOfMonth.toISOString()).select("valor")
        );
        const total = data.reduce(
          (sum, entrada) => sum + (entrada.valor || 0),
          0
        );
        setTotalEntradas(total || 0);
      } catch (err: any) {
        setError(err.message || "Erro ao buscar entradas financeiras.");
      } finally {
        setLoading(false);
      }
    };

    fetchNextEvent();
    fetchEntradas();
  }, []);

  const stats: Stat[] = [
    {
      title: "Membros Cadastrados",
      value: loading ? "Carregando..." : memberCount,
      color: "bg-blue-500",
      icon: Users,
    },
    {
      title: "Eventos Realizados",
      value: loading ? "Carregando..." : eventCount,
      color: "bg-green-500",
      icon: Calendar,
    },
    {
      title: "Entradas Financeiras",
      value: loading
        ? "Carregando..."
        : totalEntradas.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
      color: "bg-purple-500",
      icon: DollarSign,
    },
    {
      title: "Células Ativas",
      value: loading ? "Carregando..." : cellCount,
      color: "bg-yellow-500",
      icon: Church,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8 space-y-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl text-center font-bold text-gray-800"
        >
          Dashboard
        </motion.h1>
        {error && <p className="text-red-500 text-center text-sm">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={stat.title} stat={stat} />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SectionCard title="Próximos Eventos" delay={0.4} direction="left">
            {nextEvent ? (
              <div className="flex items-center space-x-4">
                <Calendar className="text-blue-500" size={24} />
                <div>
                  <h3 className="font-semibold">{nextEvent.nome}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(nextEvent.data).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ) : (
              <p>Nenhum evento programado</p>
            )}
          </SectionCard>
          <SectionCard title="Resumo Financeiro" delay={0.4} direction="right">
            <p className="text-gray-600">Em breve...</p>
          </SectionCard>
        </div>
      </div>
    </div>
  );
};

export default Index;
