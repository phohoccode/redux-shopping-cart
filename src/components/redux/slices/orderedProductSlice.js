import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('ordered-product')) || []

export const orderedProductSlice = createSlice({
    name: 'orderedProduct',
    initialState,
    reducers: {
        productPayment: (state, action) => {
            state.push(...action.payload)
            localStorage.setItem('ordered-product', JSON.stringify(state))
        },
        deleteOrderProduct: (state, action) => {
            const index = state.findIndex(product => product.id === action.payload)
            index !== -1 && state.splice(index, 1)
            localStorage.setItem('ordered-product', JSON.stringify(state))
        }
    }
})

export const { productPayment, deleteOrderProduct } = orderedProductSlice.actions
export default orderedProductSlice.reducer