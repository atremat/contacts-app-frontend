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
import { Box, Typography } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

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
        <Typography
          component="h2"
          sx={{ display: "flex", alignItems: "center", gap: 2 }}
        >
          <PersonAddIcon sx={{ width: 40, height: 40 }} />
          <Typography component="span" variant="h3">
            Phonebook
          </Typography>
        </Typography>

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
