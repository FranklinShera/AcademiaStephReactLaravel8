import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    allPaperFormats: [],
    links: {},
    meta: {},
};

export const paperFormatSlice = createSlice({
    name: "paper-format",
    initialState,
    reducers: {
        resetPaperFormat: (state) => initialState,
        setPaperFormat: (state, action) => {
            state.loading = false;
            state.links = action.payload.links;
            state.allPaperFormats = action.payload.data;
            state.meta = action.payload.meta;
        },
    },
});

export const { resetPaperFormat, setPaperFormat } = paperFormatSlice.actions;

export default paperFormatSlice.reducer;
