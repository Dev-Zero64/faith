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

// Componente para botões de ação
const ActionButton = ({
  label,
  color = "blue",
  onClick,
  ariaLabel,
}: {
  label: string;
  color?: "blue" | "red";
  onClick?: () => void;
  ariaLabel: string;
}) => {
  const buttonColors = {
    blue: "text-blue-500 hover:text-blue-600",
    red: "text-red-500 hover:text-red-600",
  };
  return (
    <button
      className={`${buttonColors[color]} transition-colors`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {label}
    </button>
  );
};

// Componente para renderizar cada linha da tabela
const TableRowComponent = ({
  event,
  handleEdit,
  handleDelete,
}: {
  event: any;
  handleEdit: (event: any) => void;
  handleDelete: (id: number) => void;
}) => {
  const isPast = event.status === "past";
  return (
    <TableRow className={isPast ? "opacity-70" : ""}>
      <TableCell>{event.data}</TableCell>
      <TableCell>{event.nome}</TableCell>
      <TableCell>{event.detalhes}</TableCell>
      <TableCell>
        <div className="flex gap-2">
          <ActionButton
            label="Editar"
            color="blue"
            onClick={() => handleEdit(event)}
            ariaLabel={`Editar evento ${event.nome}`}
          />
          <ActionButton
            label="Excluir"
            color="red"
            onClick={() => handleDelete(event.id)}
            ariaLabel={`Excluir evento ${event.nome}`}
          />
        </div>
      </TableCell>
    </TableRow>
  );
};

const EventosPage = () => {
  const [eventsData, setEventsData] = useState([]); // Estado para armazenar os dados dos eventos
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a visibilidade do modal
  const [editingEvent, setEditingEvent] = useState(null); // Estado para armazenar o evento sendo editado

  // Função para buscar os dados do Supabase
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("eventos").select("*");
      if (error) {
        console.error("Erro ao buscar eventos:", error);
      } else {
        setEventsData(data || []);
      }
    } catch (err) {
      console.error("Erro inesperado:", err);
    } finally {
      setLoading(false);
    }
  };

  // Chama a função fetchEvents quando o componente é montado
  useEffect(() => {
    fetchEvents();
  }, []);

  // Função para abrir o modal de edição
  const handleEdit = (event: any) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  // Função para salvar as alterações no Supabase
  const handleSave = async (updatedData: any) => {
    try {
      const { error } = await supabase
        .from("eventos")
        .update(updatedData)
        .eq("id", editingEvent.id);

      if (error) {
        throw error;
      }

      // Atualiza os dados localmente
      setEventsData((prev) =>
        prev.map((event) =>
          event.id === editingEvent.id ? { ...event, ...updatedData } : event
        )
      );

      handleCloseModal();
    } catch (err: any) {
      console.error("Erro ao atualizar evento:", err.message);
    }
  };

  // Função para excluir um evento
  const handleDelete = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir este evento?")) {
      return;
    }

    try {
      const { error } = await supabase.from("eventos").delete().eq("id", id);

      if (error) {
        throw error;
      }

      // Remove o evento dos dados locais
      setEventsData((prev) => prev.filter((event) => event.id !== id));
    } catch (err: any) {
      console.error("Erro ao excluir evento:", err.message);
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
          <h1 className="text-3xl font-bold text-gray-800">Eventos</h1>
          <Link to="/eventos/novo">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              aria-label="Adicionar novo evento"
            >
              Novo Evento
            </button>
          </Link>
        </div>

        {/* Tabela de Eventos */}
        <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    Carregando eventos...
                  </TableCell>
                </TableRow>
              ) : eventsData.length > 0 ? (
                eventsData.map((event) => (
                  <TableRowComponent
                    key={event.id}
                    event={event}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    Nenhum evento encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Modal de Edição */}
        {isModalOpen && editingEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Editar Evento</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  const updatedData = {
                    data: formData.get("data"),
                    nome: formData.get("nome"),
                    detalhes: formData.get("detalhes"),
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
                    defaultValue={editingEvent.data}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                {/* Nome */}
                <div>
                  <label
                    htmlFor="nome"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Título
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    defaultValue={editingEvent.nome}
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
                    Descrição
                  </label>
                  <textarea
                    id="detalhes"
                    name="detalhes"
                    defaultValue={editingEvent.detalhes}
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

export default EventosPage;
