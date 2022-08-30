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
        resetPaperTypesSlice: (state) => initialState,
        setPaperTypesSlice: (state, action) => {
            state.loading = false;
            state.links = action.payload.links;
            state.allPaperTypes = action.payload.data;
            state.meta = action.payload.meta;
        },
    },
});

export const { resetPaperTypesSlice, setPaperTypesSlice } =
    paperTypesSlice.actions;

export default paperTypesSlice.reducer;
