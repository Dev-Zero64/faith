import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Layout/Navbar";
import { supabase } from "@/services/supabase";
import EventTable from "@/components/Eventos/EventTable";
import EventModal from "@/components/Eventos/EditEventModal";

const EventosPage = () => {
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

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

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEdit = (event: any) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  const handleSave = async (updatedData: any) => {
    try {
      const { error } = await supabase
        .from("eventos")
        .update(updatedData)
        .eq("id", editingEvent.id);

      if (error) {
        throw error;
      }

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

  const handleDelete = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir este evento?")) {
      return;
    }

    try {
      const { error } = await supabase.from("eventos").delete().eq("id", id);

      if (error) {
        throw error;
      }

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

        <EventTable
          eventsData={eventsData}
          loading={loading}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />

        <EventModal
          isModalOpen={isModalOpen}
          editingEvent={editingEvent}
          handleCloseModal={handleCloseModal}
          handleSave={handleSave}
        />
      </motion.div>
    </>
  );
};

export default EventosPage;
