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

  // Função para lidar com o envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSave(editingMember);
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
    <div>
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

        {/* Modal de Edição */}
        {isModalOpen && editingMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg p-6 w-full max-w-md"
            >
              <h2 className="text-2xl font-bold mb-4">Editar Membro</h2>
              <form onSubmit={handleSubmit}>
                {/* Nome */}
                <div className="mb-4">
                  <label
                    htmlFor="nome"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Nome
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={editingMember.nome}
                    onChange={(e) =>
                      setEditingMember({
                        ...editingMember,
                        nome: e.target.value,
                      })
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                {/* Data de Nascimento */}
                <div className="mb-4">
                  <label
                    htmlFor="data_nascimento"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Data de Nascimento
                  </label>
                  <input
                    type="date"
                    id="data_nascimento"
                    name="data_nascimento"
                    value={editingMember.data_nascimento}
                    onChange={(e) =>
                      setEditingMember({
                        ...editingMember,
                        data_nascimento: e.target.value,
                      })
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                {/* Sexo */}
                <div className="mb-4">
                  <label
                    htmlFor="sexo"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Sexo
                  </label>
                  <select
                    id="sexo"
                    name="sexo"
                    value={editingMember.sexo}
                    onChange={(e) =>
                      setEditingMember({
                        ...editingMember,
                        sexo: e.target.value,
                      })
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                  </select>
                </div>
                {/* CEP */}
                <div className="mb-4">
                  <label
                    htmlFor="cep"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    CEP
                  </label>
                  <input
                    type="text"
                    id="cep"
                    name="cep"
                    value={editingMember.cep}
                    onChange={(e) =>
                      setEditingMember({
                        ...editingMember,
                        cep: e.target.value,
                      })
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                {/* Email */}
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={editingMember.email}
                    onChange={(e) =>
                      setEditingMember({
                        ...editingMember,
                        email: e.target.value,
                      })
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                {/* Batizado */}
                <div className="mb-4">
                  <label
                    htmlFor="batizado"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Batizado
                  </label>
                  <select
                    id="batizado"
                    name="batizado"
                    value={editingMember.batizado ? "true" : "false"}
                    onChange={(e) =>
                      setEditingMember({
                        ...editingMember,
                        batizado: e.target.value === "true",
                      })
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="true">Sim</option>
                    <option value="false">Não</option>
                  </select>
                </div>
                {/* Estado Civil */}
                <div className="mb-4">
                  <label
                    htmlFor="estado_civil"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Estado Civil
                  </label>
                  <input
                    type="text"
                    id="estado_civil"
                    name="estado_civil"
                    value={editingMember.estado_civil}
                    onChange={(e) =>
                      setEditingMember({
                        ...editingMember,
                        estado_civil: e.target.value,
                      })
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                {/* Escolaridade */}
                <div className="mb-4">
                  <label
                    htmlFor="escolaridade"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Escolaridade
                  </label>
                  <input
                    type="text"
                    id="escolaridade"
                    name="escolaridade"
                    value={editingMember.escolaridade}
                    onChange={(e) =>
                      setEditingMember({
                        ...editingMember,
                        escolaridade: e.target.value,
                      })
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                {/* Botões do Modal */}
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Salvar
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default MembrosPage;
