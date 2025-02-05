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
import { supabase } from "@/services/supabase"; // Importe o cliente Supabase

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
const TableRowComponent = ({ event }: { event: any }) => {
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
            ariaLabel={`Editar evento ${event.nome}`}
          />
          <ActionButton
            label="Excluir"
            color="red"
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
                  <TableRowComponent key={event.id} event={event} />
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
      </motion.div>
    </>
  );
};

export default EventosPage;
