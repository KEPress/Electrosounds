import { createSlice } from '@reduxjs/toolkit'

export const shipping = createSlice({
    name: 'shipping',
    initialState: {
        address: {},
    },
    reducers: {
        setAddress(state, action) {
            state.address = action.payload
        },
        clear(state) {
            state.address = {}
        }
    }
})

export const shippingActions = shipping.actions

