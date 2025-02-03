import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { stats } from "@/types/stats"; // Importando as stats do arquivo separado
import { Users, Church, DollarSign, Calendar } from "lucide-react";

// Componente para exibir cada estatística
const StatCard = ({ stat }: { stat: any }) => {
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

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Conteúdo principal */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Título da página */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl text-center font-bold text-gray-800"
        >
          Dashboard
        </motion.h1>

        {/* Seção de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={stat.title} stat={stat} />
          ))}
        </div>

        {/* Seção de Próximos Eventos e Resumo Financeiro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SectionCard title="Próximos Eventos" delay={0.4} direction="left">
            <p className="text-gray-600">Em breve...</p>
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
