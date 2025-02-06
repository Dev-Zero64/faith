import React from "react";
import EventForm from "./EventForm";

interface EventModalProps {
  isModalOpen: boolean;
  editingEvent: any;
  handleCloseModal: () => void;
  handleSave: (updatedData: any) => void;
}

const EventModal: React.FC<EventModalProps> = ({
  isModalOpen,
  editingEvent,
  handleCloseModal,
  handleSave,
}) => {
  return (
    <>
      {isModalOpen && editingEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Editar Evento</h2>
            <EventForm
              editingEvent={editingEvent}
              handleCloseModal={handleCloseModal}
              handleSave={handleSave}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default EventModal;
