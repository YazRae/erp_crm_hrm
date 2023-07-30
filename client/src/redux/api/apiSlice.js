import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../auth/authSlice.js";
import { API_BASE_URL } from "../../config/serverConfig.js";
import { appReducer } from "../rootReducer.js";
import pages from "../../components/pages";

// const baseQuery = fetchBaseQuery({
//   baseUrl: API_BASE_URL,
//   credentials: "include",
//   prepareHeaders: (headers, { getState }) => {
//     const token = getState().auth.token;
//     if (token) {
//       headers.set("authorization", `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

// const baseQueryWithReauth = async (arg, api, extraOptions) => {
//   let result = await baseQuery(arg, api, extraOptions);

//   if (result?.error?.status === 403) {
//     const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

//     if (refreshResult?.data) {
//       api.dispatch(setCredentials({ ...refreshResult.data }));

//       result = await baseQuery(arg, api, extraOptions);
//     } else {
//       if (refreshResult?.error?.status === 403) {
//         refreshResult.error.data.message = "Your Login has expired";
//       }
//       return refreshResult;
//     }
//   }
//   return result;
// };

const apiSlice = createApi({
  // baseQuery: baseQueryWithReauth,

  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),

  tagTypes: pages,
  endpoints: (builder) => ({}),
});

export default apiSlice;
