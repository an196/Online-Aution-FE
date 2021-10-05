import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from '../features/product/categorySlice';
import productReducer from '../features/product/productSlice';
import typeReducer from '../features/product/typeSlice';
import UserReducer from '../features/User/UserSlice';

export const store = configureStore({
  reducer: {
      product: productReducer,
      category: categoryReducer,
      type: typeReducer,
      user: UserReducer,
  },
})

