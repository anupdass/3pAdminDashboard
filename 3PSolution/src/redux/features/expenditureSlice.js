import { baseApi } from "../services/api";

export const clientPoApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllExpenditure: builder.query({
            query: () => ({
                url: "/expenditurelist",
                method: "GET",
            }),
            providesTags: ["expenditure"], // ✅ correct
        }),


        createExpenditure: builder.mutation({
            query: (userData) => ({
                url: "/create-expenditure",
                method: "POST",
                body: userData,
            }),
            invalidatesTags: ["expenditure"], // ✅ FIX
        }),

        updateExpenditure: builder.mutation({
            query: ({ id, ...userData }) => ({
                url: `/update-expenditure/${id}`,
                method: "PUT",
                body: userData,
            }),
            invalidatesTags: ["expenditure"], // ✅ FIX
        }),

        getExpenditureById: builder.query({
            query: (id) => ({
                url: `/expenditure/${id}`,
                method: "GET",
            }),
        }),
    }),
});

export const {
    useGetAllExpenditureQuery,
    useCreateExpenditureMutation,
    useUpdateExpenditureMutation,
    useGetExpenditureByIdQuery
} = clientPoApi;
