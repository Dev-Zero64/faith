import { useState } from "react";
import { supabase } from "@/services/supabase";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Função para lidar com o login
  const handleLogin = async () => {
    setLoading(true);
    setMessage("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // Redireciona para a página inicial após o login bem-sucedido
      navigate("/");
    } catch (err: any) {
      setMessage(`Erro ao fazer login: ${err.message}`);
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
          Login
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

        {/* Botão de Login */}
        <motion.button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {loading ? "Entrando..." : "Entrar"}
        </motion.button>

        {/* Link para Recuperação de Senha */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <a
            href="/reset-password"
            className="text-sm text-blue-500 hover:underline"
            aria-label="Recuperar senha"
          >
            Esqueci minha senha
          </a>
        </motion.div>

        {/* Link para Recuperação de Senha */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <a
            href="/cadastro"
            className="text-sm hover:underline"
            aria-label="Recuperar senha"
          >
            Não tem uma conta? Cadastre-se
          </a>
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

export default LoginPage;
