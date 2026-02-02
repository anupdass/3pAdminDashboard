import { baseApi } from "../services/api";

export const localPurchaseApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllLocalPurchase: builder.query({
            query: () => ({
                url: "/localpurchaselist",
                method: "GET",
            }),
            providesTags: ["localpurchase"],
        }),

        createLocalPurchase: builder.mutation({
            query: (userData) => ({
                url: "/create-local-purchase",
                method: "POST",
                body: userData,
            }),
            invalidatesTags: ["localpurchase"],
        }),

        updateLocalPurchase: builder.mutation({
            query: ({ id, ...userData }) => ({
                url: `/update-local-purchase/${id}`,
                method: "PUT",
                body: userData,
            }),
            invalidatesTags: ["localpurchase"],
        }),

        getLocalPurchaseById: builder.query({
            query: (id) => ({
                url: `/localpurchase/${id}`,
                method: "GET",
            }),
        }),
    }),
});

export const {
    useGetAllLocalPurchaseQuery,
    useCreateLocalPurchaseMutation,
    useUpdateLocalPurchaseMutation,
    useGetLocalPurchaseByIdQuery
} = localPurchaseApi;
