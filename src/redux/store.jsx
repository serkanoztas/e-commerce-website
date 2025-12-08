import { configureStore } from '@reduxjs/toolkit'
import ProductReducer from './slices/ProductSlice';
import BasketReducer from './slices/BasketSlice';

export const store = configureStore({
    reducer: {
        product: ProductReducer,
        basket: BasketReducer,
    },
})