import { baseApi } from "../services/api";

export const clientPoApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllConveyance: builder.query({
            query: () => ({
                url: "/conveyancelist",
                method: "GET",
            }),
            providesTags: ["conveyance"],
        }),

        createConveyance: builder.mutation({
            query: (userData) => ({
                url: "/create-conveyance",
                method: "POST",
                body: userData,
            }),
            invalidatesTags: ["conveyance"],
        }),

        updateConveyance: builder.mutation({
            query: ({ id, ...userData }) => ({
                url: `/update-conveyance/${id}`,
                method: "PUT",
                body: userData,
            }),
            invalidatesTags: ["conveyance"],
        }),

        getConveyanceById: builder.query({
            query: (id) => ({
                url: `/conveyance/${id}`,
                method: "GET",
            }),
        }),
    }),
});

export const {
    useGetAllConveyanceQuery,
    useCreateConveyanceMutation,
    useUpdateConveyanceMutation,
    useGetConveyanceByIdQuery
} = clientPoApi;
