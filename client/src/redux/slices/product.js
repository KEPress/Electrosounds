import { createSlice } from '@reduxjs/toolkit'

export const product = createSlice({
    name: 'product',
    initialState: {
        products: [],
        processing: false,
        error: false
    },
    reducers: {
        getProductStart (state) {
            state.processing = true
        },
        getProductSuccess (state, action) {
            state.processing = false
            state.error = false
            state.products = action.payload
        },
        getProductFailure (state) {
            state.processing = false
            state.error = true
        }
    }
})

export const productActions = product.actions