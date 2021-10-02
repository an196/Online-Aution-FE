import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productApi from "../../api/productApi";
const initialState = {
    runOutItems: [],
    topHighestCost: [],
    topHighestAutions: [],
}

export const getTopItemRunOut = createAsyncThunk("product/getTopItemRunOut",
    async () => {
        const response = await productApi.getTopItemRunOut(); 
        if(response.status == 200)
            return response.data;
        return 0;
});

export const getTopHighestCost = createAsyncThunk("product/getTopHighestCost",
    async () => {
        const response = await productApi.getTopHighestCost();
        if(response.status == 200)
            return response.data;
        return 0;
});

export const getTopHighestAutions = createAsyncThunk("product/getTopHighestAutions",
    async () => {
        const response = await productApi.getTopHighestAutions();
        if(response.status == 200)
            return response.data;
        return 0;
});

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getTopItemRunOut.fulfilled, (state, { payload }) => {
                state.runOutItems = payload;
            })
            .addCase(getTopHighestCost.fulfilled, (state, { payload }) => {
                state.topHighestCost = payload;
            })
            .addCase(getTopHighestAutions.fulfilled, (state, { payload }) => {
                state.topHighestAutions = payload;
            })

    },
})

// Action creators are generated for each case reducer function
export const { } = productSlice.actions
export const selectRunOutItems = state => state.product.runOutItems;
export const selectTopHighestCost = state => state.product.topHighestCost;
export const selectTopHighestAutions = state => state.product.topHighestAutions;
export default productSlice.reducer;