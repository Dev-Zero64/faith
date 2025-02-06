import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MemberRow } from "./MemberRow";

interface MemberTableProps {
  membersData: any[];
  loading: boolean;
  handleEdit: (member: any) => void;
  handleDelete: (id: number) => void;
}

export const MemberTable: React.FC<MemberTableProps> = ({
  membersData,
  loading,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      {loading ? (
        <p className="text-gray-500">Carregando membros...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Data de Nascimento</TableHead>
              <TableHead>Sexo</TableHead>
              <TableHead>CEP</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Batizado</TableHead>
              <TableHead>Estado Civil</TableHead>
              <TableHead>Escolaridade</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {membersData.length > 0 ? (
              membersData.map((member) => (
                <MemberRow
                  key={member.id}
                  member={member}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center">
                  Nenhum membro encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
