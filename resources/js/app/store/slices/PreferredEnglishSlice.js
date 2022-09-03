import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    allPreffEnglish: [],
    links: {},
    meta: {},
};

export const prefferedEnglishSlice = createSlice({
    name: "preferred-english",
    initialState,
    reducers: {
        resetPreffEnglish: (state) => initialState,
        setPreffEnglish: (state, action) => {
            state.loading = false;
            state.links = action.payload.links;
            state.allPreffEnglish = action.payload.data;
            state.meta = action.payload.meta;
        },
    },
});

export const { resetPreffEnglish, setPreffEnglish } =
    prefferedEnglishSlice.actions;

export default prefferedEnglishSlice.reducer;
