import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adminApi from "../../api/adminApi";

const initialState = {
    products: [],
   
}

export const getProduct = createAsyncThunk("admin/getProduct",
    async () => {
        const response = await adminApi.getProduct(); 
        if(response.status === 200)
            return response.data;
        return 0;
});

export const removeProduct = createAsyncThunk("admin/removeProduct",
    async () => {
        const response = await adminApi.removeProductp(); 
        if(response.status === 200)
            return response.data;
        return 0;
});


export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getProduct.fulfilled, (state, { payload }) => {
                state.products = payload;
            })
    },
})

// Action creators are generated for each case reducer function
export const { } = adminSlice.actions;
export const selectProducts = state => state.admin.products;
export default adminSlice.reducer;