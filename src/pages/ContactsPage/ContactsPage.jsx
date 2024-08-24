import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import ContactList from "../../components/ContactList/ContactList";
import { useDispatch, useSelector } from "react-redux";
import {
  selectError,
  selectLoading,
  selectContactForEdit,
} from "../../redux/contacts/selectors";
import { fetchContacts } from "../../redux/contacts/operations";
import { useEffect } from "react";
import DocumentTitle from "../../components/DocumentTitle/DocumentTitle";
import ContactEditForm from "../../components/ContactEditForm/ContactEditForm";
import { Box } from "@mui/material";

const ContactsPage = () => {
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const isContactToEdit = useSelector(selectContactForEdit);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <DocumentTitle>Contacts</DocumentTitle>

      <Box>
        {isContactToEdit ? <ContactEditForm /> : <ContactForm />}

        <SearchBox />
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <ContactList />
      </Box>
    </>
  );
};

export default ContactsPage;
