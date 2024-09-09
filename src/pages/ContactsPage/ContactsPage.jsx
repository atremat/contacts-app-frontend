import SearchBox from "../../components/SearchBox/SearchBox";
import ContactList from "../../components/ContactList/ContactList";
import { useDispatch, useSelector } from "react-redux";
import {
  selectError,
  selectLoading,
  selectContactForEdit,
  selectPage,
  selectPerPage,
  selectSortBy,
  selectSortOrder,
} from "../../redux/contacts/selectors";
import { fetchContacts } from "../../redux/contacts/operations";
import { useEffect } from "react";
import DocumentTitle from "../../components/DocumentTitle/DocumentTitle";
import ContactEditForm from "../../components/ContactEditForm/ContactEditForm";
import { Box } from "@mui/material";
import { Loader } from "../../components/Loader/Loader";
import { SideBar } from "../../components/SideBar/SideBar";
import toast from "react-hot-toast";
import { FilterMobile } from "../../components/FilterMobile/FilterMobile";

const ContactsPage = () => {
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const isContactToEdit = useSelector(selectContactForEdit);

  const page = useSelector(selectPage);
  const perPage = useSelector(selectPerPage);
  const sortBy = useSelector(selectSortBy);
  const sortOrder = useSelector(selectSortOrder);
  const filter = {};

  useEffect(() => {
    const params = { page, perPage, sortBy, sortOrder, filter };

    dispatch(fetchContacts(params));
  }, [dispatch, page, perPage]);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", gap: 4 }}>
      <DocumentTitle>Contacts</DocumentTitle>

      <SideBar />

      <Box component="main" sx={{ padding: 2 }}>
        <FilterMobile />
        {isContactToEdit && <ContactEditForm />}

        <SearchBox />

        {error && toast.error({ error })}
        {isLoading ? <Loader /> : <ContactList />}
      </Box>
    </Box>
  );
};

export default ContactsPage;
