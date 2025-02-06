import React, { useState } from "react";
import { supabase } from "@/services/supabase";
import { motion } from "framer-motion";
import { Mail, AlertCircle, CheckCircle } from "lucide-react";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Função para lidar com a mudança do email
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // Função para enviar o link de redefinição de senha
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Por favor, insira um email.");
      return;
    }
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: `${window.location.origin}/update-password`,
        }
      );
      if (resetError) {
        setError(resetError.message);
      } else {
        setMessage(
          "Um link de redefinição de senha foi enviado para seu email."
        );
      }
    } catch (err) {
      console.error("Erro ao enviar o link de redefinição de senha:", err);
      setError("Ocorreu um erro ao enviar o link de redefinição de senha.");
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white/90 backdrop-blur-lg p-12 rounded-2xl shadow-xl space-y-6 max-w-md w-full mx-4 border border-gray-100">
        {/* Título */}
        <motion.h1
          className="text-3xl font-bold text-gray-900 text-center mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Redefinir Senha
        </motion.h1>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo de Email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Seu email"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                aria-label="Email"
              />
            </div>
          </motion.div>

          {/* Botão de Envio */}
          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-[1.02]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileTap={{ scale: 0.98 }}
          >
            Enviar Link de Redefinição
          </motion.button>
        </form>

        {/* Feedback Visual */}
        {error && (
          <motion.div
            className="p-3 rounded-lg flex items-center space-x-2 text-sm bg-red-100 text-red-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <AlertCircle className="h-5 w-5" />
            <span>{error}</span>
          </motion.div>
        )}
        {message && (
          <motion.div
            className="p-3 rounded-lg flex items-center space-x-2 text-sm bg-green-100 text-green-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <CheckCircle className="h-5 w-5" />
            <span>{message}</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ResetPasswordPage;
