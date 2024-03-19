import React from "react";
import Modal from "react-modal";
const ReactModal = ({
  isOpen = false,
  onAfterOpen = () => {},
  onRequestClose = () => {},
  styles = {},
  content = <></>,
}) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: 0,
      ...styles,
    },
  };
  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={onAfterOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      ariaHideApp={false}
    >
      {content}
    </Modal>
  );
};

export default ReactModal;
