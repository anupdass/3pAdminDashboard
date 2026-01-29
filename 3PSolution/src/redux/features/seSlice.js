import { baseApi } from "../services/api";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        /* ---------------- GET LIST ---------------- */
        getAllSeList: builder.query({
            query: () => "/selist",
            providesTags: ["SeList"], // ✅ FIX
        }),

        /* ---------------- CREATE ---------------- */
        createSe: builder.mutation({
            query: (userData) => ({
                url: "/create-se",
                method: "POST",
                body: userData,
            }),
            invalidatesTags: ["SeList"], // ✅ correct
        }),

        /* ---------------- DETAILS ---------------- */
        seDetailsById: builder.query({
            query: (id) => `/se/${id}`,
        }),

        /* ---------------- UPDATE ---------------- */
        updateSe: builder.mutation({
            query: ({ id, body }) => ({
                url: `/update-se/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["SeList"], // ✅ correct
        }),

    }),
});

export const {
    useGetAllSeListQuery,
    useCreateSeMutation,
    useSeDetailsByIdQuery,
    useUpdateSeMutation,
} = userApi;
