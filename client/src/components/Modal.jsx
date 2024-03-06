import React from "react";

const Modal = ({ id, content, width }) => {
  return (
    <dialog id={id} className="modal">
      <div className={`modal-box p-0 rounded-lg w-[${width}vw]`}>{content}</div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default Modal;
