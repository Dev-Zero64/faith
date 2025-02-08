import React from "react";

interface EditCellModalProps {
  isModalOpen: boolean;
  editingCell: any;
  handleCloseModal: () => void;
  handleSave: (updatedData: any) => void;
}

const EditCellModal: React.FC<EditCellModalProps> = ({
  isModalOpen,
  editingCell,
  handleCloseModal,
  handleSave,
}) => {
  if (!isModalOpen || !editingCell) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Editar Célula</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const updatedData = {
              nome: formData.get("nome"),
              lider: formData.get("lider"),
              membros: formData.get("membros"),
              endereco: formData.get("endereco"),
            };
            handleSave(updatedData);
          }}
          className="space-y-4"
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
              defaultValue={editingCell.nome}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Líder */}
          <div>
            <label
              htmlFor="lider"
              className="block text-sm font-medium text-gray-700"
            >
              Líder
            </label>
            <input
              type="text"
              id="lider"
              name="lider"
              defaultValue={editingCell.lider}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Membros */}
          <div>
            <label
              htmlFor="membros"
              className="block text-sm font-medium text-gray-700"
            >
              Membros
            </label>
            <input
              type="number"
              id="membros"
              name="membros"
              defaultValue={editingCell.membros}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Endereço */}
          <div>
            <label
              htmlFor="endereco"
              className="block text-sm font-medium text-gray-700"
            >
              Endereço
            </label>
            <input
              type="text"
              id="endereco"
              name="endereco"
              defaultValue={editingCell.endereco}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Botões do Modal */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCellModal;