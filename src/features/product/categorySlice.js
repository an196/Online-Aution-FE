import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import categoryApi from "../../api/categoryApi";

const initialState = {
   typeList: [],
  
}

export const getTypeList = createAsyncThunk("product/getTypeList",
    async () => {
        const response = await categoryApi.getTypeList(); 
        if(response.status === 200)
            return response.data;
        return 0;
});




export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getTypeList.fulfilled, (state, { payload }) => {
                state.typeList = payload;
            })
            
    },
})

// Action creators are generated for each case reducer function
export const { } = categorySlice.actions;
export const selectTypeList = state => state.category.typeList;
export default categorySlice.reducer;