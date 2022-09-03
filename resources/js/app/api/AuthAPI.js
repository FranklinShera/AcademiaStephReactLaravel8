import api from "./api";

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        autoLoginClient: builder.mutation({
            query: () => ({
                url: "/autoclient",
                method: "POST",
            }),
        }),
        loginUser: builder.mutation({
            query: (user) => ({
                url: "/login",
                method: "POST",
                body: user,
            }),
        }),
        getUser: builder.mutation({
            query: () => ({
                url: "/auth/admin/user",
                method: "POST",
            }),
        }),
    }),
});

export const {
    useAutoLoginClientMutation,
    useLoginUserMutation,
    useGetUserMutation,
} = authApi;
