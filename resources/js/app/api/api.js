import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { API_ENDPOINT, UNAUTH_STATUS } from "../constants/api";
import { resetAuthUser } from "../store/slices/AuthSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: API_ENDPOINT,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        return headers;
    },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    console.log(" ARGS ", args);

    if (result?.error?.status === UNAUTH_STATUS) {
        console.log(" REFRESHING ");

        const refreshResult = await baseQuery(
            "/auth/admin/refresh-token",
            api,
            extraOptions
        );

        console.log(" REFRESH RES ", refreshResult);
        if (refreshResult?.data) {
            //retry original
            result = await baseQuery(args, api, extraOptions);
        } else {
            console.log(" FAILED REFRESH ", refreshResult);

            api.dispatch(resetAuthUser());
        }
    }

    return result;
};

const api = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({}),
});

export default api;
