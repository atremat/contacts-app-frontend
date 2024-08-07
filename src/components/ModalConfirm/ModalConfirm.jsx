import ReactModal from "react-modal";
import Modal from "react-modal";
import css from "./ModalConfirm.module.css";

ReactModal.setAppElement("#root");

const ModalConfirm = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      className={css.modal}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        },
      }}
    >
      <h2 className={css.title}>Confirmation</h2>
      <p className={css.question}>Are you sure you want to delete?</p>
      <div className={css.btnWrapper}>
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </Modal>
  );
};

export default ModalConfirm;
