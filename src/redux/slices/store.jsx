import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './productsSlice'
import basketReducer from './basketSlice'
import appReducer from './appSlice'

export const store = configureStore({
    reducer: {
        products: productsReducer,
        basket: basketReducer,
        app:appReducer
    }
})