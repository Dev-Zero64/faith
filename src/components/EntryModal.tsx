import React from "react";

interface EntryModalProps {
  isModalOpen: boolean;
  editingEntry: any;
  handleCloseModal: () => void;
  handleSave: (updatedData: any) => void;
}

const EntryModal: React.FC<EntryModalProps> = ({
  isModalOpen,
  editingEntry,
  handleCloseModal,
  handleSave,
}) => {
  if (!isModalOpen || !editingEntry) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Editar Entrada</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const updatedData = {
              data: formData.get("data"),
              detalhes: formData.get("detalhes"),
              categoria: formData.get("categoria"),
              valor: parseFloat(formData.get("valor") as string),
            };
            handleSave(updatedData);
          }}
          className="space-y-4"
        >
          {/* Data */}
          <div>
            <label
              htmlFor="data"
              className="block text-sm font-medium text-gray-700"
            >
              Data
            </label>
            <input
              type="date"
              id="data"
              name="data"
              defaultValue={editingEntry.data}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Detalhes */}
          <div>
            <label
              htmlFor="detalhes"
              className="block text-sm font-medium text-gray-700"
            >
              Detalhes
            </label>
            <input
              type="text"
              id="detalhes"
              name="detalhes"
              defaultValue={editingEntry.detalhes}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Categoria */}
          <div>
            <label
              htmlFor="categoria"
              className="block text-sm font-medium text-gray-700"
            >
              Categoria
            </label>
            <input
              type="text"
              id="categoria"
              name="categoria"
              defaultValue={editingEntry.categoria}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Valor */}
          <div>
            <label
              htmlFor="valor"
              className="block text-sm font-medium text-gray-700"
            >
              Valor
            </label>
            <input
              type="number"
              step="0.01"
              id="valor"
              name="valor"
              defaultValue={editingEntry.valor}
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

export default EntryModal;