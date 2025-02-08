import React from "react";

interface MemberFormProps {
  editingMember: any;
  setEditingMember: (member: any) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleCloseModal: () => void;
}

export const MemberForm: React.FC<MemberFormProps> = ({
  editingMember,
  setEditingMember,
  handleSubmit,
  handleCloseModal,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      {/* Nome */}
      <div className="mb-4">
        <label htmlFor="nome" className="block text-gray-700 font-bold mb-2">
          Nome
        </label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={editingMember.nome}
          onChange={(e) =>
            setEditingMember({
              ...editingMember,
              nome: e.target.value,
            })
          }
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      {/* Data de Nascimento */}
      <div className="mb-4">
        <label
          htmlFor="data_nascimento"
          className="block text-gray-700 font-bold mb-2"
        >
          Data de Nascimento
        </label>
        <input
          type="date"
          id="data_nascimento"
          name="data_nascimento"
          value={editingMember.data_nascimento}
          onChange={(e) =>
            setEditingMember({
              ...editingMember,
              data_nascimento: e.target.value,
            })
          }
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      {/* Sexo */}
      <div className="mb-4">
        <label htmlFor="sexo" className="block text-gray-700 font-bold mb-2">
          Sexo
        </label>
        <select
          id="sexo"
          name="sexo"
          value={editingMember.sexo}
          onChange={(e) =>
            setEditingMember({
              ...editingMember,
              sexo: e.target.value,
            })
          }
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
        </select>
      </div>
      {/* CEP */}
      <div className="mb-4">
        <label htmlFor="cep" className="block text-gray-700 font-bold mb-2">
          CEP
        </label>
        <input
          type="text"
          id="cep"
          name="cep"
          value={editingMember.cep}
          onChange={(e) =>
            setEditingMember({
              ...editingMember,
              cep: e.target.value,
            })
          }
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      {/* Email */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={editingMember.email}
          onChange={(e) =>
            setEditingMember({
              ...editingMember,
              email: e.target.value,
            })
          }
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      {/* Batizado */}
      <div className="mb-4">
        <label
          htmlFor="batizado"
          className="block text-gray-700 font-bold mb-2"
        >
          Batizado
        </label>
        <select
          id="batizado"
          name="batizado"
          value={editingMember.batizado ? "true" : "false"}
          onChange={(e) =>
            setEditingMember({
              ...editingMember,
              batizado: e.target.value === "true",
            })
          }
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="true">Sim</option>
          <option value="false">Não</option>
        </select>
      </div>
      {/* Estado Civil */}
      <div className="mb-4">
        <label
          htmlFor="estado_civil"
          className="block text-gray-700 font-bold mb-2"
        >
          Estado Civil
        </label>
        <input
          type="text"
          id="estado_civil"
          name="estado_civil"
          value={editingMember.estado_civil}
          onChange={(e) =>
            setEditingMember({
              ...editingMember,
              estado_civil: e.target.value,
            })
          }
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      {/* Escolaridade */}
      <div className="mb-4">
        <label
          htmlFor="escolaridade"
          className="block text-gray-700 font-bold mb-2"
        >
          Escolaridade
        </label>
        <input
          type="text"
          id="escolaridade"
          name="escolaridade"
          value={editingMember.escolaridade}
          onChange={(e) =>
            setEditingMember({
              ...editingMember,
              escolaridade: e.target.value,
            })
          }
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      {/* Botões do Modal */}
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={handleCloseModal}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Salvar
        </button>
      </div>
    </form>
  );
};
