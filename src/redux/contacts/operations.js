import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://contacts-app-mm7s.onrender.com";
// axios.defaults.baseURL = "http://localhost:3000";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const accessToken = state.auth.token;

      const response = await axios.get("/contacts", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data.data.data;
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

      return response.data.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editContact = createAsyncThunk(
  "contacts/editContact",
  async ({ _id, name, phoneNumber }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const accessToken = state.auth.token;
      const response = await axios.patch(
        `/contacts/${_id}`,
        { name, phoneNumber },
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
