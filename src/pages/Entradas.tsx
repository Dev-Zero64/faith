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
const EntryRow = ({
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

        {/* Tabela de Entradas */}
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
                    Carregando entradas...
                  </TableCell>
                </TableRow>
              ) : entriesData.length > 0 ? (
                entriesData.map((entry) => (
                  <EntryRow
                    key={entry.id}
                    entry={entry}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    Nenhuma entrada encontrada.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Modal de Edição */}
        {isModalOpen && editingEntry && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Editar Entrada</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  const updatedData = {
                    data: formData.get("data"),
                    detalhes: formData.get("detalhes"),
                    categoria: formData.get("categoria"),
                    valor: parseFloat(formData.get("valor") as string),
                  };
                  handleSave(updatedData);
                }}
                className="space-y-4"
              >
                {/* Data */}
                <div>
                  <label
                    htmlFor="data"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Data
                  </label>
                  <input
                    type="date"
                    id="data"
                    name="data"
                    defaultValue={editingEntry.data}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                {/* Detalhes */}
                <div>
                  <label
                    htmlFor="detalhes"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Detalhes
                  </label>
                  <input
                    type="text"
                    id="detalhes"
                    name="detalhes"
                    defaultValue={editingEntry.detalhes}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                {/* Categoria */}
                <div>
                  <label
                    htmlFor="categoria"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Categoria
                  </label>
                  <input
                    type="text"
                    id="categoria"
                    name="categoria"
                    defaultValue={editingEntry.categoria}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                {/* Valor */}
                <div>
                  <label
                    htmlFor="valor"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Valor
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    id="valor"
                    name="valor"
                    defaultValue={editingEntry.valor}
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

export default EntradasPage;
