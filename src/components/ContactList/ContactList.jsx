import { useDispatch, useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";
import { selectFilteredContacts } from "../../redux/filters/selectors";
import { useState } from "react";
import ModalConfirm from "../ModalConfirm/ModalConfirm";
import { deleteContact } from "../../redux/contacts/operations";
import toast from "react-hot-toast";

const ContactList = () => {
  const visibleContacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  //set contact to delete by id
  const [id, setId] = useState(null);

  const openModal = (contactId) => {
    setIsModalOpen(true);
    setId(contactId);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteContact(id))
      .unwrap()
      .then(() => toast.success("Contact deleted."))
      .catch(() => toast.error("Error occurred when deleting contact."));

    setIsModalOpen(false);
    setId(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setId(null);
  };

  return (
    <>
      <ul className={css.list}>
        {visibleContacts.map((contact) => {
          return (
            <Contact
              contact={contact}
              key={contact._id}
              openModal={openModal}
            />
          );
        })}
      </ul>
      <ModalConfirm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default ContactList;
