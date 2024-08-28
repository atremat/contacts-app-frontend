import { createSlice } from "@reduxjs/toolkit";
import { logOut } from "../auth/operations";

const filterInitialState = {
  name: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState: filterInitialState,
  reducers: {
    changeFilter(state, action) {
      state.name = action.payload;
    },

    extraReducers: (builder) => {
      builder.addCase(logOut.fulfilled, () => filterInitialState);
    },
  },
});

export const { changeFilter } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
