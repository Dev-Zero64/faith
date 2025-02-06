import { useState } from "react";
import { supabase } from "@/services/supabase";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

  // Função para alternar a visibilidade da senha
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white/90 backdrop-blur-lg p-12 rounded-2xl shadow-xl space-y-6 max-w-md w-full mx-4 border border-gray-100">
        <motion.h1
          className="text-3xl font-bold text-gray-900 text-center mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Bem-vindo de volta
        </motion.h1>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {/* Email Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                aria-label="Email"
              />
            </div>
          </motion.div>

          {/* Password Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                aria-label="Senha"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </motion.div>

          {/* Login Button */}
          <motion.button
            type="submit"
            onClick={handleLogin}
            disabled={loading}
            className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-lg font-semibold hover:shadow-lg transition-all ${
              loading ? "opacity-90 cursor-wait" : "hover:scale-[1.02]"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            whileTap={!loading ? { scale: 0.98 } : undefined}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                <span>Entrando...</span>
              </div>
            ) : (
              "Entrar"
            )}
          </motion.button>
        </form>

        {/* Links Section */}
        <motion.div
          className="flex flex-col items-center space-y-4 pt-4 border-t border-gray-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <a
            href="/reset-password"
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium flex items-center"
          >
            <span>Recuperar senha</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
          </a>

          <div className="text-sm text-gray-500">
            Não tem uma conta?{" "}
            <a
              href="/cadastro"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Cadastre-se
            </a>
          </div>
        </motion.div>

        {/* Feedback Message */}
        {message && (
          <motion.div
            className={`p-3 rounded-lg flex items-center space-x-2 text-sm ${
              message.includes("sucesso")
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {message.includes("sucesso") ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <AlertCircle className="h-5 w-5" />
            )}
            <span>{message}</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default LoginPage;
