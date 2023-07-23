import { cartActions } from '../slices/cart'

export const addToCart =  (item) => {
    return (dispatch) => { dispatch(cartActions.addCartItem(item)) }
}

export const removeFromCart = (item) => {
    return (dispatch) => { dispatch(cartActions.removeCartItem(item)) }
}

export const clearCart = () => {
    return (dispatch) => { dispatch(cartActions.clearCartItem())}
}