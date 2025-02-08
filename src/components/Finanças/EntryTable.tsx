import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EntryRow } from "@/pages/Entradas";

interface EntryTableProps {
  entriesData: any[];
  loading: boolean;
  handleEdit: (entry: any) => void;
  handleDelete: (id: number) => void;
}

const EntryTable: React.FC<EntryTableProps> = ({
  entriesData,
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
            <TableHead>Detalhes</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Carregando entradas...
              </TableCell>
            </TableRow>
          ) : entriesData.length > 0 ? (
            entriesData.map((entry) => (
              <EntryRow
                key={entry.id}
                entry={entry}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Nenhuma entrada encontrada.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default EntryTable;