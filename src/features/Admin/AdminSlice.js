import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adminApi from "../../api/adminApi";
import {NotifyHelper} from '../../helper/NotifyHelper';

const initialState = {
    products: [],
    removeResult: 0,
}

export const getProduct = createAsyncThunk("admin/getProduct",
    async () => {
        const response = await adminApi.getProduct(); 
        if(response.status === 200)
            return response.data;
        return 0;
});

export const removeProduct = createAsyncThunk("admin/removeProduct",
    async (id) => {
        const response = await adminApi.removeProduct(id); 
        if(response.status === 200)
        {
            NotifyHelper.success(response.data.message, "Thông báo");
            return 1;
        }
        NotifyHelper.error(response.data.message, "Thông báo");
        return 0;
});


export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        remove:(state, action)=>{
            state.products = state.products.filter(p => p.product_id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProduct.fulfilled, (state, { payload }) => {
                state.products = payload;
            })
    },
})

// Action creators are generated for each case reducer function
export const { remove} = adminSlice.actions;
export const selectProducts = state => state.admin.products;
export const selectRemoveResult = state => state.admin.removeResult;
export default adminSlice.reducer;