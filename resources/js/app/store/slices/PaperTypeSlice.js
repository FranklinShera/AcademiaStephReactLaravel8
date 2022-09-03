import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    allPaperTypes: [],
    links: {},
    meta: {},
};

export const paperTypesSlice = createSlice({
    name: "paper-type",
    initialState,
    reducers: {
        resetPaperTypes: (state) => initialState,
        setPaperTypes: (state, action) => {
            state.loading = false;
            state.links = action.payload.links;
            state.allPaperTypes = action.payload.data;
            state.meta = action.payload.meta;
        },
    },
});

export const { resetPaperTypes, setPaperTypes } = paperTypesSlice.actions;

export default paperTypesSlice.reducer;
