import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productApi from "../../api/productApi";

const initialState = {
    userInfo: {},
    
}



export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser:(state, action)=>{
            state.userInfo = action.payload;
        }
    },
    extraReducers: (builder) => {
        
    },
})

// Action creators are generated for each case reducer function
export const {setUser } = userSlice.actions;
export const selectUser = state => state.user.userInfo;
export default userSlice.reducer;