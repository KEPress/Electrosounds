import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, REGISTER, PAUSE, PERSIST, PURGE } from 'redux-persist'
import { product } from './slices/product'
import { cart } from './slices/cart'
import { shipping } from './slices/shipping'
import { orders } from './slices/orders'
import storage from 'redux-persist/lib/storage'

const configure = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer = combineReducers({ cart: cart.reducer, shipping: shipping.reducer, orders: orders.reducer })

const persistence = persistReducer(configure, rootReducer)

export const store = configureStore({
    reducer:  { product: product.reducer, persistence },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: { ignoredActions: [ FLUSH, REGISTER, REHYDRATE, PAUSE, PERSIST, PURGE ] }
    })
})

export let persistor = persistStore(store)