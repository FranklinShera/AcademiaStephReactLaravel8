import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    allAcademicLevels: [],
    links: {},
    meta: {},
};

export const academicLevelSlice = createSlice({
    name: "academic-level",
    initialState,
    reducers: {
        resetAcademicLevels: (state) => initialState,
        setAcademicLevels: (state, action) => {
            state.loading = false;
            state.links = action.payload.links;
            state.allAcademicLevels = action.payload.data;
            state.meta = action.payload.meta;
        },
    },
});

export const { resetAcademicLevels, setAcademicLevels } =
    academicLevelSlice.actions;

export default academicLevelSlice.reducer;
