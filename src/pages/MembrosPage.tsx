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
const membersData = [
  {
    id: 1,
    name: "João Silva",
    email: "joao.silva@example.com",
    phone: "(11) 98765-4321",
    cell: "Célula Jovens",
    status: "active", // 'active' ou 'inactive'
  },
  {
    id: 2,
    name: "Maria Souza",
    email: "maria.souza@example.com",
    phone: "(21) 98765-1234",
    cell: "Célula Família",
    status: "inactive",
  },
  {
    id: 3,
    name: "Pedro Almeida",
    email: "pedro.almeida@example.com",
    phone: "(31) 98765-5678",
    cell: "Célula Adolescentes",
    status: "active",
  },
];

// Componente para renderizar cada linha da tabela
const MemberRow = ({ member }: { member: any }) => {
  const isActive = member.status === "active";

  return (
    <TableRow className={isActive ? "" : "opacity-70"}>
      <TableCell>{member.name}</TableCell>
      <TableCell>{member.email}</TableCell>
      <TableCell>{member.phone}</TableCell>
      <TableCell>{member.cell}</TableCell>
      <TableCell>
        <div className="flex gap-2">
          <button
            className="text-blue-500 hover:text-blue-600 transition-colors"
            aria-label={`Editar membro ${member.name}`}
          >
            Editar
          </button>
          <button
            className="text-red-500 hover:text-red-600 transition-colors"
            aria-label={`Excluir membro ${member.name}`}
          >
            Excluir
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
};

const MembrosPage = () => {
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
          <h1 className="text-3xl font-bold text-gray-800">Membros</h1>
          <Link to={"/membros/novo"}>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            aria-label="Adicionar novo membro"
          >
            Novo Membro
          </button>
          </Link>
        </div>

        {/* Tabela de Membros */}
        <div className="bg-white rounded-lg shadow p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Célula</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {membersData.map((member) => (
                <MemberRow key={member.id} member={member} />
              ))}
            </TableBody>
          </Table>
        </div>
      </motion.div>
    </>
  );
};

export default MembrosPage;
