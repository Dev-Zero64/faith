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
const entriesData = [
  {
    id: 1,
    date: "2023-10-15",
    description: "Dízimo",
    category: "Contribuição",
    value: 500,
  },
  {
    id: 2,
    date: "2023-10-10",
    description: "Oferta Especial",
    category: "Doação",
    value: 1200,
  },
  {
    id: 3,
    date: "2023-10-20",
    description: "Venda de Livros",
    category: "Vendas",
    value: 300,
  },
];

// Componente para renderizar cada linha da tabela
const EntryRow = ({ entry }: { entry: any }) => {
  return (
    <TableRow>
      <TableCell>{entry.date}</TableCell>
      <TableCell>{entry.description}</TableCell>
      <TableCell>{entry.category}</TableCell>
      <TableCell className="text-green-600 font-bold">
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(entry.value)}
      </TableCell>
      <TableCell>
        <div className="flex gap-2">
          <button
            className="text-blue-500 hover:text-blue-600 transition-colors"
            aria-label={`Editar entrada ${entry.description}`}
          >
            Editar
          </button>
          <button
            className="text-red-500 hover:text-red-600 transition-colors"
            aria-label={`Excluir entrada ${entry.description}`}
          >
            Excluir
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
};

const EntradasPage = () => {
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
          <h1 className="text-3xl font-bold text-gray-800">Entradas</h1>
          <Link to="/financas/entradas/nova">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              aria-label="Adicionar nova entrada"
            >
              Nova Entrada
            </button>
          </Link>
        </div>

        {/* Tabela de Entradas */}
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
              {entriesData.map((entry) => (
                <EntryRow key={entry.id} entry={entry} />
              ))}
            </TableBody>
          </Table>
        </div>
      </motion.div>
    </>
  );
};

export default EntradasPage;
