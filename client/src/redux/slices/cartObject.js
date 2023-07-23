import { createSlice } from '@reduxjs/toolkit'

export const cart = createSlice({
    name: 'cart',
    initialState: {
        items: {},
        quantity: 0,
        price: 0,
        shipping: 0,
        tax: 0
    },
    reducers: {
        addCartItem (state, action) {
            const newItem = action.payload;
            const itemId = newItem._id;
            const roundOff = (num) => Math.round(num * 100 + Number.EPSILON) / 100
            
            state.items = { ...state.items, [itemId]: newItem }
            state.quantity = Object.values(state.items).reduce((total, item) => total + item.quantity, 0)
            state.price = Object.values(state.items).reduce((total, item) => total + item.quantity * item.price, 0)
            state.shipping = state.price > 100 ? roundOff(0) : roundOff(10)
            state.tax = roundOff(0.15 * state.price)
        },
        removeCartItem (state, action) {
            const itemId = action.payload._id
            const { [itemId]:removed, ...remaining } = state.items
            const roundOff = (num) => Math.round(num * 100 + Number.EPSILON) / 100

            state.items = remaining
            state.quantity = Object.values(state.items).reduce((total, item) => total + item.quantity, 0)
            state.price = Object.values(state.items).reduce((total, item) => total + item.quantity * item.price, 0)
            state.shipping = state.price > 100 ? roundOff(0) : roundOff(10)
            state.tax = roundOff(0.15 * state.price)
        },
        clearCartItem (state) {
            state.items = {}
            state.price = 0
            state.quantity = 0
            state.shipping = 0
            state.tax = 0
        }
    }
})

export const cartActions = cart.actions