import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from '../features/product/categorySlice';
import productReducer from '../features/product/productSlice';

export const store = configureStore({
  reducer: {
      product: productReducer,
      category: categoryReducer,
  },
})

