import { baseApi } from "../services/api";


export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => ({
                url: "/getAllUsers",
                method: "GET",
            }),
            providesTags: ["Users"],
        }),

        createUser: builder.mutation({
            query: (userData) => ({
                url: "/register",
                method: "POST",
                body: userData,
            }),
            invalidatesTags: ["Users"],
        }),



        updateUserRole: builder.mutation({
            query: ({ adminId, role }) => ({
                url: "/updateRole",
                method: "PUT",
                body: { adminId, role },
            }),
            invalidatesTags: ["Users"],
        }),

        updateAdminUser: builder.mutation({
            query: (userData) => ({
                url: "/updateAdminUser",
                method: "PUT",
                body: userData,
            }),
            invalidatesTags: ["Users"],
        }),

        resetUserPass: builder.mutation({
            query: (userData) => (
                {
                    url: "/resetPassword",
                    method: "PUT",
                    body: userData,
                }),
            invalidatesTags: ["Users"],
        }),
    }),
});

export const {
    useGetAllUsersQuery,
    useCreateUserMutation,
    useUpdateUserRoleMutation,
    useUpdateAdminUserMutation,
    useResetUserPassMutation,
} = userApi;
