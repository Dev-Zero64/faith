import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ActionButton } from "../Layout/ActionButton";

interface Event {
  id: number;
  data: string;
  nome: string;
  detalhes: string;
  status?: string;
}

interface TableRowComponentProps {
  event: Event;
  handleEdit: (event: Event) => void;
  handleDelete: (id: number) => void;
}

// Componente para renderizar cada linha da tabela
const TableRowComponent: React.FC<TableRowComponentProps> = ({
  event,
  handleEdit,
  handleDelete,
}) => {
  const isPast = event.status === "past";
  return (
    <TableRow className={isPast ? "opacity-70" : ""}>
      <TableCell>{event.data}</TableCell>
      <TableCell>{event.nome}</TableCell>
      <TableCell>{event.detalhes}</TableCell>
      <TableCell>
        <div className="flex gap-2">
          <ActionButton
            label="Editar"
            color="blue"
            onClick={() => handleEdit(event)}
            ariaLabel={`Editar evento ${event.nome}`}
          />
          <ActionButton
            label="Excluir"
            color="red"
            onClick={() => handleDelete(event.id)}
            ariaLabel={`Excluir evento ${event.nome}`}
          />
        </div>
      </TableCell>
    </TableRow>
  );
};

interface EventTableProps {
  eventsData: Event[];
  loading: boolean;
  handleEdit: (event: Event) => void;
  handleDelete: (id: number) => void;
}

const EventTable: React.FC<EventTableProps> = ({
  eventsData,
  loading,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            <TableHead>Título</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                Carregando eventos...
              </TableCell>
            </TableRow>
          ) : eventsData.length > 0 ? (
            eventsData.map((event) => (
              <TableRowComponent
                key={event.id}
                event={event}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                Nenhum evento encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default EventTable;
