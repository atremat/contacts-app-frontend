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
import { Loader } from "../../components/Loader/Loader";
import { SideBar } from "../../components/SideBar/SideBar";
import toast from "react-hot-toast";

const ContactsPage = () => {
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const isContactToEdit = useSelector(selectContactForEdit);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", gap: 4 }}>
      <DocumentTitle>Contacts</DocumentTitle>

      <SideBar />

      <Box component="main" sx={{ padding: 2 }}>
        {isContactToEdit && <ContactEditForm />}

        <SearchBox />

        {error && toast.error({ error })}
        {isLoading ? <Loader /> : <ContactList />}
      </Box>
    </Box>
  );
};

export default ContactsPage;
