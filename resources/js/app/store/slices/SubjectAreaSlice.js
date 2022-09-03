import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    allSubjectAreas: [],
    links: {},
    meta: {},
};

export const subjectAreasSlice = createSlice({
    name: "subject-area",
    initialState,
    reducers: {
        resetSubjectAreas: (state) => initialState,
        setSubjectAreas: (state, action) => {
            state.loading = false;
            state.links = action.payload.links;
            state.allSubjectAreas = action.payload.data;
            state.meta = action.payload.meta;
        },
    },
});

export const { resetSubjectAreas, setSubjectAreas } = subjectAreasSlice.actions;

export default subjectAreasSlice.reducer;
