import { createSlice } from '@reduxjs/toolkit'

export const cart = createSlice({
    name: 'cart',
    initialState: { 
        items: [],
        quantity: 0,
        price: 0,
        shipping: 0,
        tax: 0
     },
    reducers: {
         addCartItem (state, action) {
           const newItem = action.payload
           //NOTE: be mindful of id as MongoDB is the database default is _id
           const existing = state.items.find((item) => item._id === newItem._id)
           const roundOff = (num) => Math.round(num * 100 + Number.EPSILON) / 100

           if (existing) state.items = state.items.map((item) => item._id === existing._id ? (newItem):(item))
           else state.items = [...state.items, newItem]
           
           state.quantity = state.items.reduce((total, item) => total + item.quantity, 0)
           state.price = state.items.reduce((total, item) => total + item.quantity * item.price, 0)
           state.shipping = state.price > 100 ? (roundOff(0)):(roundOff(10))
           state.tax = roundOff(0.15 * state.price)
        },
        removeCartItem (state, action) {
           const cartItems = state.items.filter((item) => item._id !== action.payload._id)
           const roundOff = (num) => Math.round(num * 100 + Number.EPSILON) / 100
           state.items = cartItems
           
           //Update 
           state.quantity = state.items.reduce((total, item) => total + item.quantity, 0)
           state.price = state.items.reduce((total, item) => total + item.quantity * item.price, 0)
           state.shipping = state.price > 100 ? (roundOff(0)):(roundOff(10))
           state.tax = roundOff(0.15 * state.price)
        },
        clearCartItem (state) {
            state.items = []
            state.price = 0 
            state.quantity = 0
            state.shipping = 0
            state.tax = 0
        }
    }
})

export const cartActions = cart.actions
