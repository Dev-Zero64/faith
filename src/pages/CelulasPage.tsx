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
const cellsData = [
  {
    id: 1,
    name: "Célula Jovens",
    leader: "João Silva",
    members: 15,
    address: "Rua das Flores, 123",
    status: "active", // 'active' ou 'inactive'
  },
  {
    id: 2,
    name: "Célula Família",
    leader: "Maria Souza",
    members: 8,
    address: "Avenida Brasil, 456",
    status: "inactive",
  },
  {
    id: 3,
    name: "Célula Adolescentes",
    leader: "Pedro Almeida",
    members: 20,
    address: "Praça Central, 789",
    status: "active",
  },
];

// Componente para renderizar cada linha da tabela
const CellRow = ({ cell }: { cell: any }) => {
  const isActive = cell.status === "active";

  return (
    <TableRow className={isActive ? "" : "opacity-70"}>
      <TableCell>{cell.name}</TableCell>
      <TableCell>{cell.leader}</TableCell>
      <TableCell>{cell.members}</TableCell>
      <TableCell>{cell.address}</TableCell>
      <TableCell>
        <div className="flex gap-2">
          <button
            className="text-blue-500 hover:text-blue-600 transition-colors"
            aria-label={`Editar célula ${cell.name}`}
          >
            Editar
          </button>
          <button
            className="text-red-500 hover:text-red-600 transition-colors"
            aria-label={`Excluir célula ${cell.name}`}
          >
            Excluir
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
};

const CelulasPage = () => {
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
          <h1 className="text-3xl font-bold text-gray-800">Células</h1>
          <Link to="/celulas/nova">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            aria-label="Adicionar nova célula"
          >
            Nova Célula
          </button>
          </Link>
        </div>

        {/* Tabela de Células */}
        <div className="bg-white rounded-lg shadow p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Líder</TableHead>
                <TableHead>Membros</TableHead>
                <TableHead>Endereço</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cellsData.map((cell) => (
                <CellRow key={cell.id} cell={cell} />
              ))}
            </TableBody>
          </Table>
        </div>
      </motion.div>
    </>
  );
};

export default CelulasPage;
