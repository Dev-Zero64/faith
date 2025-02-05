import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Navbar } from "@/components/Navbar";
import { Link } from "react-router-dom";

// Dados fictícios para a tabela (substitua por seus dados reais)
const expensesData = [
  {
    id: 1,
    date: "2023-10-15",
    description: "Aluguel",
    category: "Despesa Fixa",
    value: -1500,
  },
  {
    id: 2,
    date: "2023-10-10",
    description: "Compra de Material",
    category: "Suprimentos",
    value: -300,
  },
  {
    id: 3,
    date: "2023-10-20",
    description: "Energia Elétrica",
    category: "Serviços",
    value: -200,
  },
];

// Componente para renderizar cada linha da tabela
const ExpenseRow = ({ expense }: { expense: any }) => {
  return (
    <TableRow>
      <TableCell>{expense.date}</TableCell>
      <TableCell>{expense.description}</TableCell>
      <TableCell>{expense.category}</TableCell>
      <TableCell className="text-red-600 font-bold">
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(expense.value)}
      </TableCell>
      <TableCell>
        <div className="flex gap-2">
          <button
            className="text-blue-500 hover:text-blue-600 transition-colors"
            aria-label={`Editar saída ${expense.description}`}
          >
            Editar
          </button>
          <button
            className="text-red-500 hover:text-red-600 transition-colors"
            aria-label={`Excluir saída ${expense.description}`}
          >
            Excluir
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
};

const SaidasPage = () => {
  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6 container mx-auto px-4 py-8"
      >
        {/* Cabeçalho */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Saídas</h1>
          <Link to="/financas/saidas/nova">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              aria-label="Adicionar nova saída"
            >
              Nova Saída
            </button>
          </Link>
        </div>

        {/* Tabela de Saídas */}
        <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expensesData.map((expense) => (
                <ExpenseRow key={expense.id} expense={expense} />
              ))}
            </TableBody>
          </Table>
        </div>
      </motion.div>
    </>
  );
};

export default SaidasPage;
