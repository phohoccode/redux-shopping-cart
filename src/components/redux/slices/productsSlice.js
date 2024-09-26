import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('products')) || []

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.push(action.payload)
            localStorage.setItem('products', JSON.stringify(state))
        },
        deleteProduct: (state, action) => {
            const index = state.findIndex(product => product.id === action.payload)
            state.splice(index, 1)
            localStorage.setItem('products', JSON.stringify(state))
        },
        updateProduct: (state, action) => {
            const product = state.find(product => product.id === action.payload.id)
            const { name, description, price, quantity } = action.payload

            if (product) {
                product.name = name
                product.description = description
                product.price = price
                product.quantity = quantity
            }
            localStorage.setItem('products', JSON.stringify(state))
        },
        updateQuantityProduct: (state, action) => {
            action.payload.forEach(productPayment => {
                const product = state.find(product => product.id === productPayment.id)
                product.quantity = Number(product.quantity) - Number(productPayment.quantity)
            })
            localStorage.setItem('products', JSON.stringify(state))
        }
    }
})

export const { addProduct, deleteProduct, updateQuantityProduct, updateProduct } = productsSlice.actions
export default productsSlice.reducer