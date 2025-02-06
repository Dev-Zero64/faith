import React from "react";

interface EventFormProps {
  editingEvent: any;
  handleCloseModal: () => void;
  handleSave: (updatedData: any) => void;
}

const EventForm: React.FC<EventFormProps> = ({
  editingEvent,
  handleCloseModal,
  handleSave,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const updatedData = {
          data: formData.get("data"),
          nome: formData.get("nome"),
          detalhes: formData.get("detalhes"),
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
          defaultValue={editingEvent.data}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* Nome */}
      <div>
        <label
          htmlFor="nome"
          className="block text-sm font-medium text-gray-700"
        >
          Título
        </label>
        <input
          type="text"
          id="nome"
          name="nome"
          defaultValue={editingEvent.nome}
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
          Descrição
        </label>
        <textarea
          id="detalhes"
          name="detalhes"
          defaultValue={editingEvent.detalhes}
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
  );
};

export default EventForm;
