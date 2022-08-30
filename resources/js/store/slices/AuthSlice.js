import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authTime: {
        tst: 0,
        overtime: 0,
    },
    authUser: {
        loading: false,
        loggedInUser: {},
        notifications: [],
        auth: false,
    },
    authClient: {
        loggedInClient: {},
        notifications: [],
        clientAuth: false,
        loading: false,
    },
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetAuthTime: (state) => {
            state.authTime.tst = 0;
            state.authTime.overtime = 0;
        },
        setAuthTime: (state, action) => {
            state.authTime.tst = action.payload.tst;
            state.authTime.overtime = action.payload.overtime;
        },
        resetAuthUser: (state) => {
            state.authUser = initialState.authUser;
        },
        setAuthUser: (state, action) => {
            state.authUser.loading = false;
            state.authUser.auth = true;
            state.authUser.loggedInUser = action.payload.admin;
            state.authUser.notifications = action.payload.notifications;
        },
        resetAuthClient: (state) => {
            state.authClient = initialState.authClient;
        },
        setAuthClient: (state, action) => {
            state.authClient.loading = false;
            state.authClient.clientAuth = true;
            state.authClient.loggedInClient = action.payload.client;
            state.authClient.notifications = action.payload.notifications;
        },
    },
});

export const {
    resetAuthClient,
    resetAuthTime,
    resetAuthUser,
    setAuthClient,
    setAuthTime,
    setAuthUser,
} = authSlice.actions;

export default authSlice.reducer;
