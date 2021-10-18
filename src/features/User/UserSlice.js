import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import accountApi from "../../api/accountApi";
import {NotifyHelper} from '../../helper/NotifyHelper';

const initialState = {
    userInfo: {},
    OTP: 0,
    registerInfo: {},
    profile: {},
    watchList: []
}

export const getProfile = createAsyncThunk("user/getProfile",
    async () => {
        const response = await accountApi.getProfile();
        if (response.status === 200)
            return response.data;
        return 0;
    });

export const getWatchList = createAsyncThunk("user/getWatchList",
    async () => {
        const response = await accountApi.getWatchList();
        if (response.status === 200)
            return response.data;
        return 0;
    });

export const addWatchList = createAsyncThunk("user/addWatchList",
    async (id) => {
        const response = await accountApi.addWatchList(id);
        console.log('dat');
        if (response.status === 200) {
            return 1;
        }

        return 0;
    });


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.userInfo = action.payload;
        },
        setOTP: (state, action) => {
            state.OTP = action.payload;
        },
        setRegisterInfo: (state, action) => {
            state.registerInfo = action.payload;
        },
        getUserInfo: (state, action) => {
            state.userInfo = jwt_decode(localStorage.x_accessToken);
        },
        removeProductfromWatchList: (state, action) => {
            state.watchList = state.watchList.filter(item=> item.product_id !== action.payload);
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
            .addCase(addWatchList.fulfilled, (state, { payload }) => {
                state.watchList = payload.watch_list;
                if (payload === 1) {
                    NotifyHelper.success('Thêm sản phẩm yêu thích thành công', 'Thông báo');
                }
                else
                    NotifyHelper.error('Thêm sản phẩm yêu thích không thành công', 'Thông báo');
            })
    },
})

// Action creators are generated for each case reducer function
export const { setUser, setOTP, setRegisterInfo, getUserInfo, removeProductfromWatchList } = userSlice.actions;
export const selectUser = state => state.user.userInfo;
export const selectOTP = state => state.user.OTP;
export const selectRegisterInfo = state => state.user.registerInfo;
export const selectProfile = state => state.user.profile;
export const selectWatchList = state => state.user.watchList;
export default userSlice.reducer;