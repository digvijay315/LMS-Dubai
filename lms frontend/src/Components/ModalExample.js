import React, { useState } from "react";
import CreateOJT from "./CreateOJT";
import CreateOJA from "./CreateOJA";

function ModalExample() {
  const [isModalOpen, setModalOpen] = useState(false);

  const closeModal = () => setModalOpen(false);

  return (
    <div>
      <button onClick={() => setModalOpen(true)}>Open Modal</button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <CreateOJT closeModal={closeModal} />
            <CreateOJA closeModal={closeModal} />
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModalExample;
