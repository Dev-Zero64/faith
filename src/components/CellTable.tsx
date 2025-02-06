import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CellRow } from "@/pages/Celulas";

interface CellTableProps {
  cellsData: any[];
  loading: boolean;
  handleEdit: (cell: any) => void;
  handleDelete: (id: number) => void;
}

const CellTable: React.FC<CellTableProps> = ({
  cellsData,
  loading,
  handleEdit,
  handleDelete,
}) => {
  return (
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
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Carregando células...
              </TableCell>
            </TableRow>
          ) : cellsData.length > 0 ? (
            cellsData.map((cell) => (
              <CellRow
                key={cell.id}
                cell={cell}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Nenhuma célula encontrada.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CellTable;