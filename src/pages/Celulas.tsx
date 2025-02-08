import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { supabase } from "@/services/supabase";
import CellTable from "@/components/Celulas/CellTable";
import EditCellModal from "@/components/Celulas/EditCellModal";
import { Navbar } from "@/components/Layout/Navbar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Componente para renderizar cada linha da tabela
export const CellRow = ({
  cell,
  handleEdit,
  handleDelete,
}: {
  cell: any;
  handleEdit: (cell: any) => void;
  handleDelete: (id: number) => void;
}) => {
  const isActive = cell.status === "active";
  return (
    <TableRow className={isActive ? "" : "opacity-70"}>
      <TableCell>{cell.nome}</TableCell>
      <TableCell>{cell.lider}</TableCell>
      <TableCell>{cell.membros}</TableCell>
      <TableCell>{cell.endereco}</TableCell>
      <TableCell>
        <div className="flex gap-2">
          <button
            className="text-blue-500 hover:text-blue-600 transition-colors"
            onClick={() => handleEdit(cell)}
            aria-label={`Editar célula ${cell.nome}`}
          >
            Editar
          </button>
          <button
            className="text-red-500 hover:text-red-600 transition-colors"
            onClick={() => handleDelete(cell.id)}
            aria-label={`Excluir célula ${cell.nome}`}
          >
            Excluir
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
};

const CelulasPage = () => {
  const [cellsData, setCellsData] = useState([]); // Estado para armazenar os dados das células
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a visibilidade do modal
  const [editingCell, setEditingCell] = useState(null); // Estado para armazenar a célula sendo editada

  // Função para buscar os dados das células do Supabase
  const fetchCells = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("celulas").select("*");
      if (error) {
        console.error("Erro ao buscar células:", error);
      } else {
        setCellsData(data || []);
      }
    } catch (err) {
      console.error("Erro inesperado:", err);
    } finally {
      setLoading(false);
    }
  };

  // Chama a função fetchCells quando o componente é montado
  useEffect(() => {
    fetchCells();
  }, []);

  // Função para abrir o modal de edição
  const handleEdit = (cell: any) => {
    setEditingCell(cell);
    setIsModalOpen(true);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCell(null);
  };

  // Função para salvar as alterações no Supabase
  const handleSave = async (updatedData: any) => {
    try {
      const { error } = await supabase
        .from("celulas")
        .update(updatedData)
        .eq("id", editingCell.id);

      if (error) {
        throw error;
      }

      // Atualiza os dados localmente
      setCellsData((prev) =>
        prev.map((cell) =>
          cell.id === editingCell.id ? { ...cell, ...updatedData } : cell
        )
      );

      handleCloseModal();
    } catch (err: any) {
      console.error("Erro ao atualizar célula:", err.message);
    }
  };

  // Função para excluir uma célula
  const handleDelete = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir esta célula?")) {
      return;
    }

    try {
      const { error } = await supabase.from("celulas").delete().eq("id", id);

      if (error) {
        throw error;
      }

      // Remove a célula dos dados locais
      setCellsData((prev) => prev.filter((cell) => cell.id !== id));
    } catch (err: any) {
      console.error("Erro ao excluir célula:", err.message);
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
          <h1 className="text-3xl font-bold text-gray-800">Células</h1>
          <Link to="/celulas/nova">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              aria-label="Adicionar nova célula"
            >
              Nova Célula
            </button>
          </Link>
        </div>

        {/* Tabela de Células */}
        <CellTable
          cellsData={cellsData}
          loading={loading}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />

        {/* Modal de Edição */}
        <EditCellModal
          isModalOpen={isModalOpen}
          editingCell={editingCell}
          handleCloseModal={handleCloseModal}
          handleSave={handleSave}
        />
      </motion.div>
    </>
  );
};

export default CelulasPage;
