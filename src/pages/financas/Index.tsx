import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const FinancasPage = () => {
  const data = [
    { name: 'Jan', entradas: 4000, saidas: 2400 },
    { name: 'Fev', entradas: 3000, saidas: 1398 },
    { name: 'Mar', entradas: 2000, saidas: 9800 },
  ];

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <h1 className="text-3xl font-bold text-gray-800">Finanças</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-2">Total de Entradas</h3>
            <p className="text-2xl font-bold text-green-600">R$ 9.000,00</p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-2">Total de Saídas</h3>
            <p className="text-2xl font-bold text-red-600">R$ 13.598,00</p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-2">Saldo</h3>
            <p className="text-2xl font-bold text-blue-600">R$ -4.598,00</p>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Movimentações</h2>
          <div className="w-full h-[300px]">
            <LineChart
              width={800}
              height={300}
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
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
        </Card>
      </motion.div>
    </Layout>
  );
};

export default FinancasPage;