import { combineReducers } from "redux";

// import { reducer as authReducer } from "./auth/index.js";
import { reducer as crudReducer } from "./crud/index.js";
import { reducer as erpReducer } from "./erp/index.js";
// import { reducer as settingsReducer } from "./settings/index.js";
// import { reducer as notifyReducer } from "./notify/index.js";

// import * as actionTypes from "./auth/types.js";

// Combine all reducers.

export const appReducer = combineReducers({
  // auth: authReducer,
  // notify: notifyReducer,
  crud: crudReducer,
  erp: erpReducer,
  // settings: settingsReducer,
});

// const rootReducer = (state, action) => {
//   if (action.type === actionTypes.LOGOUT_SUCCESS) {
//     state = undefined;
//   }
//   return appReducer(state, action);
// };

// export default rootReducer;
