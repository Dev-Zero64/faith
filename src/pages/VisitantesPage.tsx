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

// Dados fictícios para a tabela (substitua por seus dados reais)
const visitorsData = [
  {
    id: 1,
    name: "João Silva",
    date: "2023-10-15",
    event: "Culto de Domingo",
    contact: "(11) 98765-4321",
  },
  {
    id: 2,
    name: "Maria Souza",
    date: "2023-10-10",
    event: "Reunião de Célula",
    contact: "(21) 98765-1234",
  },
  {
    id: 3,
    name: "Pedro Almeida",
    date: "2023-10-20",
    event: "Congresso de Jovens",
    contact: "(31) 98765-5678",
  },
];

// Componente para renderizar cada linha da tabela
const VisitorRow = ({ visitor }: { visitor: any }) => {
  return (
    <TableRow>
      <TableCell>{visitor.name}</TableCell>
      <TableCell>{visitor.date}</TableCell>
      <TableCell>{visitor.event}</TableCell>
      <TableCell>{visitor.contact}</TableCell>
      <TableCell>
        <div className="flex gap-2">
          <button
            className="text-blue-500 hover:text-blue-600 transition-colors"
            aria-label={`Editar visitante ${visitor.name}`}
          >
            Editar
          </button>
          <button
            className="text-red-500 hover:text-red-600 transition-colors"
            aria-label={`Excluir visitante ${visitor.name}`}
          >
            Excluir
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
};

const VisitantesPage = () => {
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
          <h1 className="text-3xl font-bold text-gray-800">Visitantes</h1>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            aria-label="Adicionar novo visitante"
          >
            Novo Visitante
          </button>
        </div>

        {/* Tabela de Visitantes */}
        <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Data da Visita</TableHead>
                <TableHead>Evento/Célula</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visitorsData.map((visitor) => (
                <VisitorRow key={visitor.id} visitor={visitor} />
              ))}
            </TableBody>
          </Table>
        </div>
      </motion.div>
    </>
  );
};

export default VisitantesPage;
