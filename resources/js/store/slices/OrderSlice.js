import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    orders: [],
    links: {},
    meta: {},
};

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        resetOrders: (state) => initialState,
        setOrders: (state, action) => {
            state.loading = false;
            state.links = action.payload.links;
            state.orders = action.payload.data;
            state.meta = action.payload.meta;
        },
    },
});

export const { resetOrders, setOrders } = orderSlice.actions;

export default orderSlice.reducer;
