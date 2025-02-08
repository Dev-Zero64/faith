import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Layout/Navbar";
import { Link } from "react-router-dom";
import { supabase } from "@/services/supabase";
import { MemberTable } from "@/components/Membros/MemberTable";
import { MemberForm } from "@/components/Membros/EditMemberModal";

const MembrosPage = () => {
  const [membersData, setMembersData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<any | null>(null);

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

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleEdit = (member: any) => {
    setEditingMember(member);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingMember(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSave(editingMember);
  };

  const handleSave = async (updatedData: any) => {
    try {
      const { error } = await supabase
        .from("membros")
        .update(updatedData)
        .eq("id", editingMember.id);

      if (error) {
        throw error;
      }

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

  const handleDelete = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir este membro?")) {
      return;
    }

    try {
      const { error } = await supabase.from("membros").delete().eq("id", id);

      if (error) {
        throw error;
      }

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
        <MemberTable
          membersData={membersData}
          loading={loading}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />

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
              <MemberForm
                editingMember={editingMember}
                setEditingMember={setEditingMember}
                handleSubmit={handleSubmit}
                handleCloseModal={handleCloseModal}
              />
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default MembrosPage;
