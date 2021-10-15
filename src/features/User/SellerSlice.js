import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import productApi from "../../api/productApi";

const initialState = {


}

export const postProduct = createAsyncThunk("seller/postProduct",
    async (data) => {
        const response = await adminApi.postProduct(data);
        if (response.status === 200) {
            NotifyHelper.success(response.data.message, "Thông báo");
            return 1;
        }
        NotifyHelper.error(response.data.message, "Thông báo");
        return 0;
    });

export const userSlice = createSlice({
    name: 'seller',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(postProduct.fulfilled, (state, { payload }) => {

            })
    },
})

// Action creators are generated for each case reducer function
export const { setUser, setOTP, setRegisterInfo, getUserInfo } = userSlice.actions;
export const selectUser = state => state.user.userInfo;
export const selectOTP = state => state.user.OTP;
export const selectRegisterInfo = state => state.user.registerInfo;
export default userSlice.reducer;