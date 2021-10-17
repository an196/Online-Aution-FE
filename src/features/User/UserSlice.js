import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import accountApi from "../../api/accountApi";

const initialState = {
    userInfo: {},
    OTP: 0,
    registerInfo:{},
    profile:{},
    watchList: []
}

export const getProfile = createAsyncThunk("account/getProfile",
    async () => {
        const response = await accountApi.getProfile(); 
        if(response.status === 200)
            return response.data;
        return 0;
});

export const getWatchList = createAsyncThunk("account/getWatchList",
    async () => {
        const response = await accountApi.getWatchList(); 
        if(response.status === 200)
            return response.data;
        return 0;
});


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
        },
        getUserInfo:(state, action)=>{
            state.userInfo = jwt_decode(localStorage.x_accessToken);
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getProfile.fulfilled, (state, { payload }) => {
            state.profile = payload.info_account;
        })
        .addCase(getWatchList.fulfilled, (state, { payload }) => {
            state.watchList = payload.watch_list;
        })
    },
})

// Action creators are generated for each case reducer function
export const {setUser,setOTP,setRegisterInfo,getUserInfo } = userSlice.actions;
export const selectUser = state => state.user.userInfo;
export const selectOTP = state => state.user.OTP;
export const selectRegisterInfo = state => state.user.registerInfo;
export const selectProfile = state => state.user.profile;
export const selectWatchList = state => state.user.watchList;
export default userSlice.reducer;