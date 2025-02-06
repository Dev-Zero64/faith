import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Link } from "react-router-dom";
import { supabase } from "@/services/supabase";
import ExpensesTable from "@/components/ExpensesTable";
import EditExpenseModal from "@/components/EditExpenseModal";

const SaidasPage = () => {
  const [expensesData, setExpensesData] = useState([]); // Estado para armazenar os dados das saídas
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a visibilidade do modal
  const [editingExpense, setEditingExpense] = useState(null); // Estado para armazenar a saída sendo editada

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta saída?")) {
      try {
        const { error } = await supabase.from("saidas").delete().eq("id", id);
        if (error) {
          throw error;
        }
        // Atualiza os dados localmente
        setExpensesData((prev) => prev.filter((expense) => expense.id !== id));
      } catch (err: any) {
        console.error("Erro ao deletar saída:", err.message);
      }
    }
  };

  // Função para buscar os dados das saídas do Supabase
  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("saidas").select("*");
      if (error) {
        console.error("Erro ao buscar saídas:", error);
      } else {
        setExpensesData(data || []);
      }
    } catch (err) {
      console.error("Erro inesperado:", err);
    } finally {
      setLoading(false);
    }
  };

  // Chama a função fetchExpenses quando o componente é montado
  useEffect(() => {
    fetchExpenses();
  }, []);

  // Função para abrir o modal de edição
  const handleEdit = (expense: any) => {
    setEditingExpense(expense);
    setIsModalOpen(true);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingExpense(null);
  };

  // Função para salvar as alterações no Supabase
  const handleSave = async (updatedData: any) => {
    try {
      const { error } = await supabase
        .from("saidas")
        .update(updatedData)
        .eq("id", editingExpense.id);

      if (error) {
        throw error;
      }

      // Atualiza os dados localmente
      setExpensesData((prev) =>
        prev.map((expense) =>
          expense.id === editingExpense.id
            ? { ...expense, ...updatedData }
            : expense
        )
      );

      handleCloseModal();
    } catch (err: any) {
      console.error("Erro ao atualizar saída:", err.message);
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
          <h1 className="text-3xl font-bold text-gray-800">Saídas</h1>
          <Link to="/financas/saidas/nova">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              aria-label="Adicionar nova saída"
            >
              Nova Saída
            </button>
          </Link>
        </div>

        {/* Tabela de Saídas */}
        <ExpensesTable
          expensesData={expensesData}
          loading={loading}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />

        {/* Modal de Edição */}
        <EditExpenseModal
          isModalOpen={isModalOpen}
          editingExpense={editingExpense}
          handleCloseModal={handleCloseModal}
          handleSave={handleSave}
        />
      </motion.div>
    </>
  );
};

export default SaidasPage;
