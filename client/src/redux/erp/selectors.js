import { createSelector } from "reselect";

// const selectErp = (state) => state.erp;

const selectErp = (state) => {
  // console.log(state);
  return state.reducer.erp;
};

export const selectCurrentItem = createSelector(
  [selectErp],
  (erp) => erp.current
);

export const selectListItems = createSelector([selectErp], (erp) => erp.list);

export const selectItemById = (itemId) =>
  createSelector(selectListItems, (list) =>
    list.result.items.find((item) => item._id === itemId)
  );

export const selectCreatedItem = createSelector(
  [selectErp],
  (erp) => erp.create
);

export const selectUpdatedItem = createSelector(
  [selectErp],
  (erp) => erp.update
);

export const selectRecordPaymentItem = createSelector(
  [selectErp],
  (erp) => erp.recordPayment
);

export const selectReadItem = createSelector([selectErp], (erp) => erp.read);

export const selectDeletedItem = createSelector(
  [selectErp],
  (erp) => erp.remove
);

export const selectSearchedItems = createSelector(
  [selectErp],
  (erp) => erp.search
);
