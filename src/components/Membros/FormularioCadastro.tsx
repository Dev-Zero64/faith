import React from "react";

interface FormularioCadastroProps {
  formData: any;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  message: string;
}

const FormularioCadastro: React.FC<FormularioCadastroProps> = ({
  formData,
  handleChange,
  handleSubmit,
  loading,
  message,
}) => {
  return (
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
  );
};

export default FormularioCadastro;
