import { createSelector } from "@reduxjs/toolkit";
import { selectContacts } from "../contacts/selectors";

export const selectFilter = (state) => state.filters.name;

export const selectViewMode = (state) => state.filters.viewMode;

export const selectContactType = (state) => state.filters.contactType;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter, selectViewMode, selectContactType],
  (contacts, valueFilter, valueViewMode, valueContactType) => {
    const visibleContacts = contacts.filter(
      ({ name, phoneNumber, isFavourite, contactType }) => {
        return (
          (name.toLowerCase().includes(valueFilter.trim().toLowerCase()) ||
            phoneNumber.includes(valueFilter.trim())) &&
          (valueViewMode !== "favorites" || isFavourite) &&
          (valueContactType === contactType || valueContactType === "all")
        );
      }
    );
    return visibleContacts;
  }
);
