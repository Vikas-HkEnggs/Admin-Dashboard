
import React from "react";
import Modal from "react-modal";

const ModalComponent = ({ isOpen, onRequestClose, title, children }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    ariaHideApp={false}
    style={{
      overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1000,
      },
      content: {
        zIndex: 1001,
      },
    }}
    className="modal mx-auto max-w-md rounded-lg bg-white p-6 shadow-lg"
  >
    <h2 className="mb-4 text-2xl font-semibold text-gray-800">{title}</h2>
    {children}
  </Modal>
);

export default ModalComponent;
