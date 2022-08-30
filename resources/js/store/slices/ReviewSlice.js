import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    reviews: [],
};

export const reviewSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {
        reviewsLoading: (state) => {
            state.isLoading = true;
        },
        setReviews: (state, action) => {
            state.isLoading = false;
            state.reviews = action.payload;
        },
        reviewsNotLoading: (state) => {
            state.isLoading = false;
        },
    },
});

export const { reviewsLoading, reviewsNotLoading, setReviews } =
    reviewSlice.actions;

export default reviewSlice.reducer;
