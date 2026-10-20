import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios"

const initialState = {
    products: [],
    selectedProduct: {},
    isLoading: false,
    filterText: ""
}

const Base_URL = "https://fakestoreapi.com";

export const getAllProducts = createAsyncThunk("getAllProducts", async () => {
    const response = await axios.get(`${Base_URL}/products`);
    return response.data;

})

export const productsSlice = createSlice({
    name: "productsSlice",
    initialState,
    reducers: {
        selectProduct: (state, action) => {
            state.selectedProduct = action.payload
        },
        setFilter: (state, action) => {
            if (action.payload.trim() && action.payload.trim().length > 0) {
                state.filterText = action.payload.trim();
            }
            else
            {
                state.filterText = "";
            }

        }
    },
    extraReducers: (builder) => {
        //istek beklenirken
        builder.addCase(getAllProducts.pending, (state) => {
            state.isLoading = true;
        })

        //istek başarlı bir biçimde tamamlanınca
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload;
        })
    }
})

export const { selectProduct,setFilter } = productsSlice.actions
export default productsSlice.reducer