import { orderActions } from '../slices/orders'
import { cartActions } from '../slices/cart'
import { getError } from '../../utilities/custom'
import { createOrder } from '../../utilities/custom'
import axios from 'axios'

//NOTE: To access response.data remember in the reducer slice the action.payload is data assigned to the state 
//hence it is necessary to use react-redux hooks useDispatch & useSelector to access said action.payload data

export const placeOrder = async (dispatch, orders, token) => {
     try {
        dispatch(orderActions.openOrders())
        const response = await axios.post(`/orders/`, orders, token)
        dispatch(orderActions.orderSuccess(response.data))
        dispatch(cartActions.clearCartItem())
        //have to return data to immediately route to order screen
        return response.data 
     } catch (error) {
        dispatch(orderActions.orderFail())
        throw getError(error)
     }
}

export const fetchOrder = async (dispatch, id, token) => {

   try {
      dispatch(orderActions.fetchOrderStart())
      const response = await axios.get(`/orders/${id}`, token)
      dispatch(orderActions.fetchOrderSuccess(response.data))
      return response.data
   } catch (error) {
      dispatch(orderActions.fetchOrderFail())
      throw getError(error)
   }
}

export const userOrders = async (dispatch, token) => {

      try {
         dispatch(orderActions.fetchOrderStart())
         const response = await axios.get(`/users/orders/mine`, token)
         dispatch(orderActions.fetchOrderSuccess(response.data))
         return response.data
      } catch (error) {
         dispatch(orderActions.fetchOrderFail())
         throw getError(error)
      }
}


 export const create = async (dispatch, data, actions)  => {
      
      try {
         dispatch(orderActions.setCurrentOrder(data))
         const orderID = await createOrder(data.totalCost.toString(), actions)
         return orderID
      } catch (error) {
         dispatch(orderActions.orderFail())
         throw getError(error)
      }
}


export const approval = async (dispatch, id, details, token) => {
      
      try {
         dispatch(orderActions.payRequest())
         const response = await axios.put(`/orders/${id}/pay`, details, token)
         dispatch(orderActions.paySuccess(response.data))
         return response.data
      } catch (error) {
         dispatch(orderActions.payFail())
         throw getError(error)
      }
}

export const stripePayment = async (dispatch, id, details, token) => {

   try {
      dispatch(orderActions.payRequest())
      const response = await axios.put(`/orders/stripe/${id}`, details, token)
      dispatch(orderActions.paySuccess(response.data))
      //return response.data
   } catch (error) {
      dispatch(orderActions.payFail())
      throw getError(error)
   }
}

export const reset = () => {
   return (dispatch) => { dispatch(orderActions.reset())}
}



