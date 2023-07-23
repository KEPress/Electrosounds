import { createSlice } from '@reduxjs/toolkit'

export const orders = createSlice({
    name: 'orders',
    initialState: {
        order: {},
        processing: false,
        error: false,
        success: false,
        current: null
    },
    reducers: {
        openOrders (state) {
            state.processing = true
        },
        orderSuccess (state, action) {
            state.processing = false
            state.order = action.payload
        },
        orderFail (state) {
            state.processing = false
            state.error = true
        },
        fetchOrderStart (state) {
            state.processing = true
        },
        //NOTE: in assigning state.orders = action.payload means the data is accessed via state
        //hence the use of useSelector() Hook to initialize the state to access data stored
        fetchOrderSuccess (state, action) {
            state.processing = false
            state.error = false
            state.order = action.payload
        },
        fetchOrderFail (state) {
            state.processing = false
            state.error = true
        },
        setCurrentOrder (state, action) {
            state.current = action.payload
        },
        payRequest (state) {
            state.success = false
            state.processing = true     
        }, 
        paySuccess (state, action) {
            state.success = true
            state.processing = false
            state.current = action.payload
        },
        payFail (state) {
            state.success = false
            state.processing = false
            state.error = true
        },
        reset (state) {
            state.current = null
            state.order = []
            state.processing = false
            state.success = false
            state.error = false
        }
    }
})

export const orderActions = orders.actions