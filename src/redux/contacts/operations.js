import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://contacts-app-backend-m1cm.onrender.com";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (queryParams, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const accessToken = state.auth.token;

      const response = await axios.get("/contacts", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          page: queryParams.page || 1,
          perPage: queryParams.perPage || 10,
          sortBy: queryParams.sortBy || "_id",
          sortOrder: queryParams.sortOrder || "asc",
          filter: JSON.stringify(queryParams.filter || {}),
        },
      });

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (newContact, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const accessToken = state.auth.token;
      const response = await axios.post("/contacts", newContact, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const accessToken = state.auth.token;
      await axios.delete(`/contacts/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const response = await axios.get("/contacts", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editContact = createAsyncThunk(
  "contacts/editContact",
  async (contact, thunkAPI) => {
    try {
      //making a copy of FormData object without _id
      const validContact = new FormData();

      for (let [key, value] of contact.entries()) {
        if (key !== "_id") validContact.append(key, value);
      }

      const state = thunkAPI.getState();
      const accessToken = state.auth.token;
      const response = await axios.patch(
        `/contacts/${contact.get("_id")}`,
        validContact,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
