import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ExpensesTableProps {
  expensesData: any[];
  loading: boolean;
  handleEdit: (expense: any) => void;
  handleDelete: (id: number) => void;
}

// Componente para renderizar cada linha da tabela
const ExpenseRow = ({
  expense,
  handleEdit,
  handleDelete,
}: {
  expense: any;
  handleEdit: (expense: any) => void;
  handleDelete: (id: number) => void;
}) => {
  return (
    <TableRow>
      <TableCell>{expense.data}</TableCell>
      <TableCell>{expense.detalhes}</TableCell>
      <TableCell>{expense.categoria}</TableCell>
      <TableCell className="text-red-600 font-bold">
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(expense.valor)}
      </TableCell>
      <TableCell>
        <div className="flex gap-2">
          <button
            className="text-blue-500 hover:text-blue-600 transition-colors"
            onClick={() => handleEdit(expense)}
            aria-label={`Editar saída ${expense.detalhes}`}
          >
            Editar
          </button>
          <button
            className="text-red-500 hover:text-red-600 transition-colors"
            onClick={() => handleDelete(expense.id)}
            aria-label={`Excluir saída ${expense.detalhes}`}
          >
            Excluir
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
};

const ExpensesTable: React.FC<ExpensesTableProps> = ({
  expensesData,
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
                Carregando saídas...
              </TableCell>
            </TableRow>
          ) : expensesData.length > 0 ? (
            expensesData.map((expense) => (
              <ExpenseRow
                key={expense.id}
                expense={expense}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Nenhuma saída encontrada.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExpensesTable;