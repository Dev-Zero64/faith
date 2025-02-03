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
import { eventData } from "@/types/eventData"; // Importando dados fictícios de um arquivo separado
import { Link } from "react-router-dom";

// Componente para botões de ação
const ActionButton = ({
  label,
  color = "blue",
  onClick,
  ariaLabel,
}: {
  label: string;
  color?: "blue" | "red";
  onClick?: () => void;
  ariaLabel: string;
}) => {
  const buttonColors = {
    blue: "text-blue-500 hover:text-blue-600",
    red: "text-red-500 hover:text-red-600",
  };

  return (
    <button
      className={`${buttonColors[color]} transition-colors`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {label}
    </button>
  );
};

// Componente para renderizar cada linha da tabela
const TableRowComponent = ({ event }: { event: any }) => {
  const isPast = event.status === "past";

  return (
    <TableRow className={isPast ? "opacity-70" : ""}>
      <TableCell>{event.date}</TableCell>
      <TableCell>{event.title}</TableCell>
      <TableCell>{event.description}</TableCell>
      <TableCell>{event.participants}</TableCell>
      <TableCell>
        <div className="flex gap-2">
          <ActionButton
            label="Editar"
            color="blue"
            ariaLabel={`Editar evento ${event.title}`}
          />
          <ActionButton
            label="Excluir"
            color="red"
            ariaLabel={`Excluir evento ${event.title}`}
          />
        </div>
      </TableCell>
    </TableRow>
  );
};

const EventosPage = () => {
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
          <h1 className="text-3xl font-bold text-gray-800">Eventos</h1>
          <Link to="/eventos/novo">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              aria-label="Adicionar novo evento"
            >
              Novo Evento
            </button>
          </Link>
        </div>

        {/* Tabela de Eventos */}
        <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Participantes</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {eventData.map((event) => (
                <TableRowComponent key={event.id} event={event} />
              ))}
            </TableBody>
          </Table>
        </div>
      </motion.div>
    </>
  );
};

export default EventosPage;
