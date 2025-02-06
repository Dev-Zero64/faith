import React, { useState } from "react";
import { supabase } from "@/services/supabase";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, AlertCircle } from "lucide-react";

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Função para alternar a visibilidade da senha
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Função para atualizar a senha
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError("Por favor, insira uma nova senha.");
      return;
    }
    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });
      if (updateError) {
        setError(updateError.message);
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.error("Erro ao atualizar senha:", err);
      setError("Ocorreu um erro ao atualizar a senha.");
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
          Digite sua Nova Senha
        </motion.h1>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo de Senha */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua nova senha"
                required
                className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                aria-label="Nova Senha"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                onClick={togglePasswordVisibility}
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </motion.div>

          {/* Botão de Atualização */}
          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-[1.02]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileTap={{ scale: 0.98 }}
          >
            Atualizar Senha
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
      </div>
    </motion.div>
  );
};

export default UpdatePassword;
