import { useState } from "react";
import { supabase } from "@/services/supabase";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";

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
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow p-6 space-y-4"
        >
          {/* Nome */}
          <div>
            <label
              htmlFor="nome"
              className="block text-sm font-medium text-gray-700"
            >
              Nome
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Data de Nascimento */}
          <div>
            <label
              htmlFor="data_nascimento"
              className="block text-sm font-medium text-gray-700"
            >
              Data de Nascimento
            </label>
            <input
              type="date"
              id="data_nascimento"
              name="data_nascimento"
              value={formData.data_nascimento}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Sexo */}
          <div>
            <label
              htmlFor="sexo"
              className="block text-sm font-medium text-gray-700"
            >
              Sexo
            </label>
            <select
              id="sexo"
              name="sexo"
              value={formData.sexo}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
            </select>
          </div>

          {/* CEP */}
          <div>
            <label
              htmlFor="cep"
              className="block text-sm font-medium text-gray-700"
            >
              CEP
            </label>
            <input
              type="text"
              id="cep"
              name="cep"
              value={formData.cep}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Batizado */}
          <div>
            <label
              htmlFor="batizado"
              className="block text-sm font-medium text-gray-700"
            >
              Batizado
            </label>
            <input
              type="checkbox"
              id="batizado"
              name="batizado"
              checked={formData.batizado}
              onChange={handleChange}
              className="mt-1"
            />
          </div>

          {/* Estado Civil */}
          <div>
            <label
              htmlFor="estado_civil"
              className="block text-sm font-medium text-gray-700"
            >
              Estado Civil
            </label>
            <input
              type="text"
              id="estado_civil"
              name="estado_civil"
              value={formData.estado_civil}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Escolaridade */}
          <div>
            <label
              htmlFor="escolaridade"
              className="block text-sm font-medium text-gray-700"
            >
              Escolaridade
            </label>
            <input
              type="text"
              id="escolaridade"
              name="escolaridade"
              value={formData.escolaridade}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Botão de Envio */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            {loading ? "Enviando..." : "Cadastrar"}
          </button>

          {/* Mensagem de Sucesso/Erro */}
          {message && (
            <p
              className={`text-sm text-center ${
                message.includes("sucesso") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </motion.div>
    </>
  );
};

export default CadastroPage;
