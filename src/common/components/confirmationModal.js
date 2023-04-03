import React from "react";
import Modal from "react-modal";
import { useLocation } from "react-router-dom";
import "../../assets/styles/confirmationModal.css";
const ConfirmationModal = ({
  modalIsOpen,
  setModalIsOpen,
  headingText,
  text,
  handleOk,
}) => {
  const customStyles = {
    content: {
      width: "100%",
      height: "100%",
      boxSizing: "border-box",
      backgroundColor: "#0e1d2c7d",
      position: "absolute",
      top: 0,
      left: 0,
      border: "none",
      paddingTop: "0px",
      borderRadius: 0,
    },
  };
  // console.log(useLocation().pathname);
  return (
    <Modal isOpen={modalIsOpen} style={customStyles} ariaHideApp={false}>
      <div className="confirmationModalContainer dialog-container-confirmation-modal">
        <div className="confirmationModalHeading modal-dialog-heading">{headingText}</div>
        <div className="confirmationModalText modal-dialog-text">{text}</div>
        <div className="confirmationModalButtonContainer  modal-dialog-button-container">
          <button
            onClick={() => setModalIsOpen(false)}
            className="confirmationModalButton modalSecondaryButton CancelButton-modal"
          >
            Close
          </button>
          <button
            className={`confirmationModalButton modalPrimaryButton OkButton-modal`}
            onClick={handleOk}
          >
            Ok
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
