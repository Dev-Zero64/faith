import { motion } from 'framer-motion';
import { Users, Church, DollarSign, Calendar } from 'lucide-react';

const Index = () => {
  const stats = [
    { title: 'Total de Membros', value: '120', icon: Users, color: 'bg-blue-500' },
    { title: 'Células Ativas', value: '15', icon: Church, color: 'bg-green-500' },
    { title: 'Eventos do Mês', value: '8', icon: Calendar, color: 'bg-purple-500' },
    { title: 'Dízimos do Mês', value: 'R$ 15.000', icon: DollarSign, color: 'bg-yellow-500' },
  ];

  return (
    <div className="space-y-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-800"
      >
        Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Próximos Eventos</h2>
          <p className="text-gray-600">Em breve...</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Resumo Financeiro</h2>
          <p className="text-gray-600">Em breve...</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;