import ReactModal from "react-modal";
import Modal from "react-modal";
import css from "./ModalConfirm.module.css";
import { Box, Button, Typography } from "@mui/material";

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
      <Typography variant="h3" sx={{ textAlign: "center" }}>
        Confirmation
      </Typography>

      <Typography sx={{ textAlign: "center", mb: 2 }}>
        Are you sure you want to delete?
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
        <Button onClick={onConfirm} color="success">
          Confirm
        </Button>
        <Button onClick={onClose} color="warning">
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalConfirm;
