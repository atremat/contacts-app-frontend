export const selectContacts = (state) => state.contacts.items;
export const selectLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;
export const selectContactForEdit = (state) => state.contacts.contactForEdit;
export const selectPage = (state) => state.contacts.page;
export const selectPerPage = (state) => state.contacts.perPage;
export const selectSortOrder = (state) => state.contacts.sortOrder;
export const selectSortBy = (state) => state.contacts.sortBy;
// export const selectFilter = state => state.contacts.filter;
