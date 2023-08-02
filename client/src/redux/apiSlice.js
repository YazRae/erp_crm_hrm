import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "./auth/authSlice.js";
import { API_BASE_URL } from "../config/serverConfig.js";
import { appReducer } from "./rootReducer.js";
import pages from "../components/pages/index.js";
import { createEntityAdapter } from "@reduxjs/toolkit";

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

export const entityAdapter = createEntityAdapter({});

export const apiSlice = createApi({
  // baseQuery: baseQueryWithReauth,

  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),

  tagTypes: pages,

  endpoints: (builder) => ({
    list: builder.query({
      query: ({ entity }) => `/${entity.toLowerCase()}/list`,

      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },

      keepUnusedDataFor: 5,

      providesTags: (response, error, { entity }) => {
        if (error) {
          return console.log(error);
        }

        return response.result
          ? [
              { type: `${entity}s`, id: "LIST" },
              response.result.map((item) => ({
                type: `${entity}s`,
                id: item._id,
              })),
            ]
          : [{ type: `${entity}s`, id: "LIST" }];
      },
    }),

    search: builder.query({
      query: ({ entity, searchFields, searchInput }) => {
        return {
          url: `/${entity.toLowerCase()}/search`,
          method: "GET",
          params: { searchInput, searchFields },
        };
      },

      providesTags: (response, error, { entity }) => {
        if (error) {
          return console.log(error);
        }

        return response.result
          ? [
              { type: `${entity}s`, id: "LIST" },
              response.result.map((item) => ({
                type: `${entity}s`,
                id: item._id,
              })),
            ]
          : [{ type: `${entity}s`, id: "LIST" }];
      },
    }),

    read: builder.query({
      query: ({ entity, id }) => {
        return {
          url: `/${entity.toLowerCase()}/read/${id}`,
          method: "GET",
        };
      },

      providesTags: (response, error, { entity }) => {
        if (error) {
          return console.log(error);
        }

        return response.result
          ? [
              { type: `${entity}s`, id: "LIST" },
              response.result.map((item) => ({
                type: `${entity}s`,
                id: item._id,
              })),
            ]
          : [{ type: `${entity}s`, id: "LIST" }];
      },
    }),

    create: builder.mutation({
      query: ({ entity, body }) => ({
        url: `/${entity.toLowerCase()}/create/`,
        method: "POST",
        body,
      }),

      invalidatesTags: (result, error, { entity, id }) => [
        { type: `${entity}s`, id },
      ],

      async onQueryStarted(
        { entity, body },
        {
          dispatch,
          getState,
          extra,
          requestId,
          queryFulfilled,
          getCacheEntry,
          updateCachedData,
        }
      ) {
        const { data } = await queryFulfilled;
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("list", body, (draft) => {
            Object.assign(draft, data);
          })
        );
        console.log(data);
        try {
          dispatch(apiSlice.util.resetApiState());
        } catch {
          patchResult.undo();
        }
      },
    }),

    update: builder.mutation({
      query: ({ entity, id, body }) => ({
        url: `/${entity.toLowerCase()}/update/${id}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (result, error, { entity, id }) => [
        { type: `${entity}s`, id },
      ],

      async onQueryStarted(
        { entity, id, body },
        {
          dispatch,
          getState,
          extra,
          requestId,
          queryFulfilled,
          getCacheEntry,
          updateCachedData,
        }
      ) {
        const { data } = await queryFulfilled;
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("list", id, (draft) => {
            Object.assign(draft, data);
          })
        );
        console.log(data);
        try {
          dispatch(apiSlice.util.resetApiState());
        } catch {
          patchResult.undo();
        }
      },
    }),

    remove: builder.mutation({
      query: ({ entity, id }) => ({
        url: `/${entity.toLowerCase()}/remove/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: (result, error, { entity, id }) => [
        { type: `${entity}s`, id },
      ],

      async onQueryStarted(
        { entity, id, body },
        {
          dispatch,
          getState,
          extra,
          requestId,
          queryFulfilled,
          getCacheEntry,
          updateCachedData,
        }
      ) {
        const { data } = await queryFulfilled;
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("list", id, (draft) => {
            Object.assign(draft, data);
          })
        );
        console.log(data);
        try {
          dispatch(apiSlice.util.resetApiState());
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useListQuery: List,
  useLazySearchQuery: Search,
  useLazyReadQuery: Read,
  useCreateMutation: Create,
  useUpdateMutation: Update,
  useRemoveMutation: Remove,
} = apiSlice;

export const resetState = apiSlice.util.resetApiState();
