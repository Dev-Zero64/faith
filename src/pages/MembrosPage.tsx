import React, { useEffect, useState } from "react";
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
import { supabase } from "@/services/supabase";

// Componente para renderizar cada linha da tabela
const MemberRow = ({
  member,
  handleEdit,
  handleDelete,
}: {
  member: any;
  handleEdit: (member: any) => void;
  handleDelete: (id: number) => void;
}) => {
  return (
    <TableRow>
      <TableCell>{member.name}</TableCell>
      <TableCell>{member.data_nascimento}</TableCell>
      <TableCell>
        {member.sexo.charAt(0).toUpperCase() + member.sexo.slice(1)}
      </TableCell>
      <TableCell>{member.cep}</TableCell>

      <TableCell>
        <div className="flex gap-2">
          <button
            className="text-blue-500 hover:text-blue-600 transition-colors"
            //onClick={() => handleEdit(member)}
            aria-label={`Editar membro ${member.name}`}
          >
            Editar (Em breve)
          </button>
          <button
            className="text-red-500 hover:text-red-600 transition-colors"
            //onClick={() => handleDelete(member.id)}
            aria-label={`Excluir membro ${member.name}`}
          >
            Excluir (Em breve)
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
};

const MembrosPage = () => {
  const [membersData, setMembersData] = useState<any[]>([]); // Estado para armazenar os dados dos membros
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a visibilidade do modal
  const [editingMember, setEditingMember] = useState<any | null>(null); // Estado para armazenar o membro sendo editado

  // Função para buscar os dados do Supabase
  const fetchMembers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("membros").select("*");
      if (error) {
        console.error("Erro ao buscar membros:", error);
      } else {
        setMembersData(data || []);
      }
    } catch (err) {
      console.error("Erro inesperado:", err);
    } finally {
      setLoading(false);
    }
  };

  // Chama a função fetchMembers quando o componente é montado
  useEffect(() => {
    fetchMembers();
  }, []);

  // Função para abrir o modal de edição
  const handleEdit = (member: any) => {
    setEditingMember(member);
    setIsModalOpen(true);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingMember(null);
  };

  // Função para salvar as alterações no Supabase
  const handleSave = async (updatedData: any) => {
    try {
      const { error } = await supabase
        .from("membros")
        .update(updatedData)
        .eq("id", editingMember.id);

      if (error) {
        throw error;
      }

      // Atualiza os dados localmente
      setMembersData((prev) =>
        prev.map((member) =>
          member.id === editingMember.id
            ? { ...member, ...updatedData }
            : member
        )
      );

      handleCloseModal();
    } catch (err: any) {
      console.error("Erro ao atualizar membro:", err.message);
    }
  };

  // Função para excluir um membro
  const handleDelete = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir este membro?")) {
      return;
    }

    try {
      const { error } = await supabase.from("membros").delete().eq("id", id);

      if (error) {
        throw error;
      }

      // Remove o membro dos dados locais
      setMembersData((prev) => prev.filter((member) => member.id !== id));
    } catch (err: any) {
      console.error("Erro ao excluir membro:", err.message);
    }
  };

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
                    <TableCell colSpan={2} className="text-center">
                      Nenhum membro encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>

        {/* Modal de Edição */}
        {isModalOpen && editingMember && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Editar Membro</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  const updatedData = {
                    name: formData.get("name"),
                    data_nascimento: formData.get("data_nascimento"),
                    sexo: formData.get("sexo"),
                    cep: formData.get("cep"),
                  };
                  handleSave(updatedData);
                }}
                className="space-y-4"
              >
                {/* Nome */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    defaultValue={editingMember.name}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                {/* Data de Nascimento */}
                <div>
                  <label
                    htmlFor="data_nascimento"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Data de Nascimento
                  </label>
                  <input
                    type="date"
                    id="data_nascimento"
                    name="data_nascimento"
                    defaultValue={editingMember.data_nascimento}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                {/* Sexo */}
                <div>
                  <label
                    htmlFor="sexo"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Sexo
                  </label>
                  <select
                    id="sexo"
                    name="sexo"
                    defaultValue={editingMember.sexo}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                  </select>
                </div>

                {/* CEP */}
                <div>
                  <label
                    htmlFor="cep"
                    className="block text-sm font-medium text-gray-700"
                  >
                    CEP
                  </label>
                  <input
                    type="text"
                    id="cep"
                    name="cep"
                    defaultValue={editingMember.cep}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                {/* Botões do Modal */}
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Salvar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default MembrosPage;
