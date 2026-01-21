import { baseApi } from "../services/api";

export const clientPoApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllClientPo: builder.query({
            query: () => ({
                url: "/getallclientpo",
                method: "GET",
            }),
            providesTags: ["ClientPo"], // ✅ correct
        }),

        createClientPo: builder.mutation({
            query: (userData) => ({
                url: "/createClientPo",
                method: "POST",
                body: userData,
            }),
            invalidatesTags: ["ClientPo"], // ✅ FIX
        }),

        updateClientPo: builder.mutation({
            query: ({ id, ...userData }) => ({
                url: `/updateClientPo/${id}`,
                method: "PUT",
                body: userData,
            }),
            invalidatesTags: ["ClientPo"], // ✅ FIX
        }),

        getClientPoById: builder.query({
            query: (id) => ({
                url: `/getClientPoById/${id}`,
                method: "GET",
            }),
        }),
    }),
});

export const {
    useGetAllClientPoQuery,
    useCreateClientPoMutation,
    useUpdateClientPoMutation,
    useGetClientPoByIdQuery,
} = clientPoApi;
