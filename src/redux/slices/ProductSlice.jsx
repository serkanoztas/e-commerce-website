import { accordionActionsClasses } from '@mui/material/AccordionActions';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    products: [],
    selectedProduct: {},
    loading: false,
}

const Base_Url = "https://fakestoreapi.com";

export const getAllProducts = createAsyncThunk("getAllProducts", async () => {
    const response = await axios.get(`${Base_Url}/products`);
    return response.data;  //action
})

export const getProductsByCategory = createAsyncThunk("getProductsByCategory", async (category) => {
    const response = await axios.get(`${Base_Url}/products/category/${category}`);
    return response.data;  //action
})



export const ProductSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.fulfilled, (state, action) => {  //istek başarılı
            state.products = action.payload;
            state.loading = false;
        })
        builder.addCase(getAllProducts.pending, (state, action) => {  //istek beklemede
            state.loading = true;
        })
        builder.addCase(getProductsByCategory.fulfilled, (state, action) => {  //istek başarılı
            state.products = action.payload;
            state.loading = false;
        })
        builder.addCase(getProductsByCategory.pending, (state, action) => { //istek beklemede
            state.loading = true;
        })
    }

})

export const { } = ProductSlice.actions

export default ProductSlice.reducer