import { createSlice } from "@reduxjs/toolkit";
import {
  fetchContacts,
  addContact,
  deleteContact,
  editContact,
} from "./operations";
import { logOut } from "../auth/operations";

const contactsInitialState = {
  items: [],
  loading: false,
  error: null,
  contactForEdit: null,
  page: 1,
  perPage: 10,
  sortOrder: "asc",
  sortBy: "_id",
  filter: {},
};

const isPending = (state) => {
  state.loading = true;
  state.error = null;
};

const isRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState: contactsInitialState,
  reducers: {
    //save {id,name,number}, which we have to edit
    setContactForEdit: (state, action) => {
      state.contactForEdit = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setPerPage: (state, action) => {
      state.perPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //fetch contacts
      .addCase(fetchContacts.pending, isPending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, isRejected)
      //add contact
      .addCase(addContact.pending, isPending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items = [...state.items, action.payload];
      })
      .addCase(addContact.rejected, isRejected)
      //delete contact
      .addCase(deleteContact.pending, isPending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(deleteContact.rejected, isRejected)
      //edit contact
      .addCase(editContact.pending, isPending)
      .addCase(editContact.fulfilled, (state, action) => {
        state.loading = false;

        state.items = state.items.map((item) => {
          return item._id === action.payload._id ? { ...action.payload } : item;
        });
      })
      .addCase(editContact.rejected, isRejected)
      //logout
      .addCase(logOut.fulfilled, () => contactsInitialState);
  },
});

export const contactsReducer = contactsSlice.reducer;

export const { setContactForEdit, setPage, setPerPage } = contactsSlice.actions;
