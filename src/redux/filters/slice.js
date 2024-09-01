import { createSlice } from "@reduxjs/toolkit";
import { logOut } from "../auth/operations";

const filterInitialState = {
  name: "",
  viewMode: "all",
  contactType: "all",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState: filterInitialState,
  reducers: {
    changeFilter(state, action) {
      state.name = action.payload;
    },
    changeViewMode(state, action) {
      state.viewMode = action.payload;
    },
    changeContactType(state, action) {
      state.contactType = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(logOut.fulfilled, () => filterInitialState);
  },
});

export const { changeFilter, changeViewMode, changeContactType } =
  filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
