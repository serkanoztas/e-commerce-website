import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const getBasketFromStorage = () => {
    if (localStorage.getItem("basket")) {
        return JSON.parse(localStorage.getItem("basket"));
    }
    return [];
}

const initialState = {
    BasketProducts: getBasketFromStorage(),
    drawer: false,
}

const WriteFromBasketToStorage = (basket) => {
    localStorage.setItem("basket", JSON.stringify(basket))
}

export const BasketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setDrawer: (state) => {
            state.drawer = !state.drawer;
        },
        setBasketProducts: (state, action) => {
            const findProduct = state.BasketProducts && state.BasketProducts.find((product) => product.id == action.payload.id);
            if (findProduct) {
                const extractedProducts = state.BasketProducts.filter((product) => product.id != action.payload.id);
                findProduct.count += action.payload.count;
                state.BasketProducts = [...extractedProducts, findProduct];
                WriteFromBasketToStorage(state.BasketProducts);
            }
            else {
                state.BasketProducts = [...state.BasketProducts, action.payload];
                WriteFromBasketToStorage(state.BasketProducts);
            }
        },
        removeFromBasket: (state, action) => {
            const updatedBasket = state.BasketProducts.filter((p) => p.id !== action.payload);
            state.BasketProducts = updatedBasket;
            WriteFromBasketToStorage(state.BasketProducts);
        }


    },

})

export const { setDrawer, setBasketProducts, removeFromBasket } = BasketSlice.actions

export default BasketSlice.reducer