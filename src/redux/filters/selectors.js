import { createSelector } from "@reduxjs/toolkit";
import { selectContacts } from "../contacts/selectors";

export const selectFilter = (state) => state.filters.name;

export const selectViewMode = (state) => state.filters.viewMode;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter, selectViewMode],
  (contacts, valueFilter, valueViewMode) => {
    const visibleContacts = contacts.filter(
      ({ name, phoneNumber, isFavourite }) => {
        return (
          (name.toLowerCase().includes(valueFilter.trim().toLowerCase()) ||
            phoneNumber.includes(valueFilter.trim())) &&
          isFavourite === (valueViewMode === "favorites")
        );
      }
    );
    return visibleContacts;
  }
);
