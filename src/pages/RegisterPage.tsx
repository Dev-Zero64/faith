import { useState } from "react";
import { supabase } from "@/services/supabase";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Função para lidar com o registro
  const handleRegister = async () => {
    setLoading(true);
    setMessage("");

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // Exibe mensagem de sucesso e redireciona para a página de login
      setMessage("Usuário registrado com sucesso! Verifique seu email.");
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Redireciona após 2 segundos
    } catch (err: any) {
      setMessage(`Erro ao registrar: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white p-8 rounded-lg shadow space-y-4 max-w-md w-full">
        {/* Título */}
        <motion.h1
          className="text-2xl font-bold text-gray-800 text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Registrar
        </motion.h1>

        {/* Campo de Email */}
        <motion.input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        />

        {/* Campo de Senha */}
        <motion.input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        />

        {/* Botão de Registro */}
        <motion.button
          onClick={handleRegister}
          disabled={loading}
          className={`w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {loading ? "Registrando..." : "Registrar"}
        </motion.button>

        {/* Link para Login */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <p className="text-sm text-gray-600">
            Já tem cadastro?{" "}
            <a
              href="/login"
              className="text-blue-500 hover:underline"
              aria-label="Fazer login"
            >
              Fazer login
            </a>
          </p>
        </motion.div>

        {/* Mensagem de Feedback */}
        {message && (
          <motion.p
            className={`text-sm text-center ${
              message.includes("sucesso") ? "text-green-600" : "text-red-500"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            {message}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default RegisterPage;
