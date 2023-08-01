import { createEntityAdapter } from "@reduxjs/toolkit";
import apiSlice from "./apiSlice";

export const entityAdapter = createEntityAdapter({});

export const entityApiSlice = apiSlice.injectEndpoints({
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
      invalidatesTags: (result, error, arg) => {
        [{ type: `${arg.entity}s`, id: "LIST" }];
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
          entityApiSlice.util.updateQueryData("list", id, (draft) => {
            Object.assign(draft, data);
          })
        );
        console.log(data);
        try {
          dispatch(entityApiSlice.util.resetApiState());
        } catch {
          patchResult.undo();
        }
      },
    }),

    remove: builder.mutation({
      query: ({ entity, id }) => ({
        url: `/${entity.toLowerCase()}/remove/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, { entity, id }) => {
        [{ type: `${entity}s`, id }];
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
} = entityApiSlice;

export const resetState = entityApiSlice.util.resetApiState();
