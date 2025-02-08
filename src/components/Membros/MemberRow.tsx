import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";

interface MemberRowProps {
  member: any;
  handleEdit: (member: any) => void;
  handleDelete: (id: number) => void;
}

export const MemberRow: React.FC<MemberRowProps> = ({
  member,
  handleEdit,
  handleDelete,
}) => {
  return (
    <TableRow>
      <TableCell>{member.nome}</TableCell>
      <TableCell>{member.data_nascimento}</TableCell>
      <TableCell>
        {member.sexo.charAt(0).toUpperCase() + member.sexo.slice(1)}
      </TableCell>
      <TableCell>{member.cep}</TableCell>
      <TableCell>{member.email}</TableCell>
      <TableCell>{member.batizado ? "Sim" : "Não"}</TableCell>
      <TableCell>{member.estado_civil}</TableCell>
      <TableCell>{member.escolaridade}</TableCell>
      <TableCell>
        <div className="flex gap-2">
          <button
            className="text-blue-500 hover:text-blue-600 transition-colors"
            onClick={() => handleEdit(member)}
            aria-label={`Editar membro ${member.nome}`}
          >
            Editar
          </button>
          <button
            className="text-red-500 hover:text-red-600 transition-colors"
            onClick={() => handleDelete(member.id)}
            aria-label={`Excluir membro ${member.nome}`}
          >
            Excluir
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
};
