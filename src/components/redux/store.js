import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/productsSlice'
import cartProduct from './slices/cartSlice'
import orderedProductSlice from './slices/orderedProductSlice'

export default configureStore({
    reducer: {
        products: productsReducer,
        cart: cartProduct,
        orderedProduct: orderedProductSlice
    }
})