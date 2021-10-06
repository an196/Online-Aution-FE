import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productApi from "../../api/productApi";

const initialState = {
    userInfo: {},
    OTP: 0,
    registerInfo:{},
}



export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser:(state, action)=>{
            state.userInfo = action.payload;
        },
        setOTP:(state, action)=>{
            state.OTP = action.payload;
        },
        setRegisterInfo:(state, action)=>{
            state.registerInfo = action.payload;
        }
    },
    extraReducers: (builder) => {
        
    },
})

// Action creators are generated for each case reducer function
export const {setUser,setOTP,setRegisterInfo } = userSlice.actions;
export const selectUser = state => state.user.userInfo;
export const selectOTP = state => state.user.OTP;
export const selectRegisterInfo = state => state.user.registerInfo;
export default userSlice.reducer;