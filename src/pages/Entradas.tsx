import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Layout/Navbar";
import { Link } from "react-router-dom";
import { supabase } from "@/services/supabase";
import EntryTable from "@/components/Finanças/EntryTable";
import EntryModal from "@/components/Finanças/EditEntryModal";
import { TableRow, TableCell } from "@/components/ui/table";
// Componente para renderizar cada linha da tabela
export const EntryRow = ({
  entry,
  handleEdit,
  handleDelete,
}: {
  entry: any;
  handleEdit: (entry: any) => void;
  handleDelete: (id: number) => void;
}) => {
  return (
    <TableRow>
      <TableCell>{entry.data}</TableCell>
      <TableCell>{entry.detalhes}</TableCell>
      <TableCell>{entry.categoria}</TableCell>
      <TableCell className="text-green-600 font-bold">
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(entry.valor)}
      </TableCell>
      <TableCell>
        <div className="flex gap-2">
          <button
            className="text-blue-500 hover:text-blue-600 transition-colors"
            onClick={() => handleEdit(entry)}
            aria-label={`Editar entrada ${entry.detalhes}`}
          >
            Editar
          </button>
          <button
            className="text-red-500 hover:text-red-600 transition-colors"
            onClick={() => handleDelete(entry.id)}
            aria-label={`Excluir entrada ${entry.detalhes}`}
          >
            Excluir
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
};

const EntradasPage = () => {
  const [entriesData, setEntriesData] = useState([]); // Estado para armazenar os dados das entradas
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a visibilidade do modal
  const [editingEntry, setEditingEntry] = useState(null); // Estado para armazenar a entrada sendo editada

  // Função para buscar os dados das entradas do Supabase
  const fetchEntries = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("entradas").select("*");
      if (error) {
        console.error("Erro ao buscar entradas:", error);
      } else {
        setEntriesData(data || []);
      }
    } catch (err) {
      console.error("Erro inesperado:", err);
    } finally {
      setLoading(false);
    }
  };

  // Chama a função fetchEntries quando o componente é montado
  useEffect(() => {
    fetchEntries();
  }, []);

  // Função para abrir o modal de edição
  const handleEdit = (entry: any) => {
    setEditingEntry(entry);
    setIsModalOpen(true);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEntry(null);
  };

  // Função para salvar as alterações no Supabase
  const handleSave = async (updatedData: any) => {
    try {
      const { error } = await supabase
        .from("entradas")
        .update(updatedData)
        .eq("id", editingEntry.id);

      if (error) {
        throw error;
      }

      // Atualiza os dados localmente
      setEntriesData((prev) =>
        prev.map((entry) =>
          entry.id === editingEntry.id ? { ...entry, ...updatedData } : entry
        )
      );

      handleCloseModal();
    } catch (err: any) {
      console.error("Erro ao atualizar entrada:", err.message);
    }
  };

  // Função para excluir uma entrada
  const handleDelete = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir esta entrada?")) {
      return;
    }

    try {
      const { error } = await supabase.from("entradas").delete().eq("id", id);

      if (error) {
        throw error;
      }

      // Remove a entrada dos dados locais
      setEntriesData((prev) => prev.filter((entry) => entry.id !== id));
    } catch (err: any) {
      console.error("Erro ao excluir entrada:", err.message);
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
          <h1 className="text-3xl font-bold text-gray-800">Entradas</h1>
          <Link to="/financas/entradas/nova">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              aria-label="Adicionar nova entrada"
            >
              Nova Entrada
            </button>
          </Link>
        </div>
        <EntryTable
          entriesData={entriesData}
          loading={loading}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
        <EntryModal
          isModalOpen={isModalOpen}
          editingEntry={editingEntry}
          handleCloseModal={handleCloseModal}
          handleSave={handleSave}
        />
      </motion.div>
    </>
  );
};

export default EntradasPage;
