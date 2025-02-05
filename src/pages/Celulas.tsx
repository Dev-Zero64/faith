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
const CellRow = ({
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

        {/* Modal de Edição */}
        {isModalOpen && editingCell && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Editar Célula</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  const updatedData = {
                    nome: formData.get("nome"),
                    lider: formData.get("lider"),
                    membros: formData.get("membros"),
                    endereco: formData.get("endereco"),
                  };
                  handleSave(updatedData);
                }}
                className="space-y-4"
              >
                {/* Nome */}
                <div>
                  <label
                    htmlFor="nome"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nome
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    defaultValue={editingCell.nome}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                {/* Líder */}
                <div>
                  <label
                    htmlFor="lider"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Líder
                  </label>
                  <input
                    type="text"
                    id="lider"
                    name="lider"
                    defaultValue={editingCell.lider}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                {/* Membros */}
                <div>
                  <label
                    htmlFor="membros"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Membros
                  </label>
                  <input
                    type="number"
                    id="membros"
                    name="membros"
                    defaultValue={editingCell.membros}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                {/* Endereço */}
                <div>
                  <label
                    htmlFor="endereco"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Endereço
                  </label>
                  <input
                    type="text"
                    id="endereco"
                    name="endereco"
                    defaultValue={editingCell.endereco}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                {/* Botões do Modal */}
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
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

export default CelulasPage;