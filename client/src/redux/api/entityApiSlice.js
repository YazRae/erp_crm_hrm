import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import apiSlice from "./apiSlice";

export const entityAdapter = createEntityAdapter({});

const initialState = entityAdapter.getInitialState();

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
  useCreateMutation: Create,
  useUpdateMutation: Update,
  useRemoveMutation: Remove,
} = entityApiSlice;

export const selectEntityResult = ({ entity }) =>
  entityApiSlice.endpoints.getEntity.select({ entity });

export const selectEntityData = (entity) =>
  createSelector(
    selectEntityResult(entity),
    (entityResult) => entityResult.data
  );

// export const selectEntityDataById = (entity, itemId) =>
//   createSelector(selectEntityData(entity), (data) =>
//     data?.result.find((item) => item._id === itemId)
//   );

// console.log(
//   entityAdapter.getSelectors((state) => selectEntityData(state) ?? initialState)
// );

// export const { selectAll, selectById, selectIds, selectEntities, selectTotal } =
//   entityAdapter.getSelectors(
//     (state) => selectEntityData(state) ?? initialState
//   );

export const { selectAll, selectById, selectIds, selectEntities, selectTotal } =
  entityAdapter.getSelectors((state) => {
    return !Object.values(state.api.queries)[0]
      ? initialState
      : Object.values(state.api.queries)[0].status !== "fulfilled"
      ? initialState
      : Object.values(state.api.queries)[0].data;
  });

export const resetState = entityApiSlice.internalActions.resetApiState;

console.log(entityApiSlice);
