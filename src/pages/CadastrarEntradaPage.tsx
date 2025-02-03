import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";

const CadastrarEntradaPage = () => {
  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    description: "",
    category: "Contribuição", // Valor padrão
    value: "",
    date: "",
  });

  // Estado para mensagens de sucesso/erro
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Função para lidar com mudanças no formulário
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Função para enviar os dados via axios
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Envie os dados para o servidor
      const response = await axios.post(
        "https://api.example.com/incomes",
        formData
      );

      // Exiba mensagem de sucesso
      setMessage(response.data.message || "Entrada cadastrada com sucesso!");
      setFormData({
        description: "",
        category: "Contribuição",
        value: "",
        date: "",
      });
    } catch (error: any) {
      // Exiba mensagem de erro
      setMessage(
        error.response?.data?.message || "Erro ao cadastrar a entrada."
      );
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
          Cadastrar Nova Entrada
        </h1>

        {/* Formulário */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow p-6 space-y-4"
        >
          {/* Descrição */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Descrição
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Categoria */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Categoria
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="Contribuição">Contribuição</option>
              <option value="Doação">Doação</option>
              <option value="Vendas">Vendas</option>
              <option value="Outros">Outros</option>
            </select>
          </div>

          {/* Valor */}
          <div>
            <label
              htmlFor="value"
              className="block text-sm font-medium text-gray-700"
            >
              Valor
            </label>
            <input
              type="number"
              step="0.01"
              id="value"
              name="value"
              value={formData.value}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Data */}
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Data
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
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
              loading ? "bg-gray-500" : "bg-green-500 hover:bg-green-600"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
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

export default CadastrarEntradaPage;
