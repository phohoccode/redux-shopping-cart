import { createSlice } from "@reduxjs/toolkit";
import { productPayment } from "./orderedProductSlice";

const initialState = JSON.parse(localStorage.getItem('cart')) || []

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProductToCart: (state, action) => {
            const product = state.find(product => product.id === action.payload.id)
            if (product) {
                product.quantity =
                    Number(product.quantity) + Number(action.payload.quantity)
            } else {
                state.push(action.payload)
            }

            localStorage.setItem('cart', JSON.stringify(state))
        },
        deleteProductToCart: (state, action) => {
            const index = state.findIndex(product => product.id === action.payload)
            state.splice(index, 1)
            localStorage.setItem('cart', JSON.stringify(state))
        },
        changeQuantity: (state, action) => {
            const product = state.find(product => product.id === action.payload.id)
            
            if (action.payload.type === 'INCREASE') {
                product.quantity++
            } else {
                product.quantity > 0
                    && product.quantity--
            }

            localStorage.setItem('cart', JSON.stringify(state))
        },
        updateProducToCart: (state, action) => {
            action.payload.forEach(productPayment => {
                const index = state.findIndex(product => product.id === productPayment.id)

                if (index !== -1) {
                    state.splice(index, 1)
                }
            })
            localStorage.setItem('cart', JSON.stringify(state))

        }
    }
})

export const { addProductToCart, deleteProductToCart, changeQuantity, updateProducToCart } = cartSlice.actions
export default cartSlice.reducer