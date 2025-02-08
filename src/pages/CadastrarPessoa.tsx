import React, { useState } from "react";
import { supabase } from "@/services/supabase";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Layout/Navbar";
import FormularioCadastro from "@/components/Membros/FormularioCadastro";

const CadastroPage = () => {
  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    nome: "",
    data_nascimento: "",
    sexo: "masculino", // 'masculino' ou 'feminino'
    cep: "",
    email: "",
    batizado: false,
    estado_civil: "",
    escolaridade: "",
  });

  // Estado para mensagens de sucesso/erro
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Função para lidar com mudanças no formulário
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Função para enviar os dados ao Supabase
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Insere os dados na tabela "membros" no Supabase
      const { data, error } = await supabase.from("membros").insert([formData]);

      if (error) {
        throw error;
      }

      // Exibe mensagem de sucesso
      setMessage("Cadastro realizado com sucesso!");
      setFormData({
        nome: "",
        data_nascimento: "",
        sexo: "masculino",
        cep: "",
        email: "",
        batizado: false,
        estado_civil: "",
        escolaridade: "",
      });
    } catch (err: any) {
      // Exibe mensagem de erro
      setMessage(err.message || "Erro ao realizar o cadastro.");
    } finally {
      setLoading(false);
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
        <h1 className="text-3xl font-bold text-gray-800">
          Cadastrar Novo Membro
        </h1>

        {/* Formulário */}
        <FormularioCadastro
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
          message={message}
        />
      </motion.div>
    </>
  );
};

export default CadastroPage;
