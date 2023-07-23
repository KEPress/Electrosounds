import { productActions } from '../slices/product'
import { getError } from '../../utilities/custom'
import axios from 'axios'

export const fetchProduct = async (dispatch, slug) => {
    try {
        dispatch(productActions.getProductStart())
        const response = await axios.get(`/products/${slug}`)
        dispatch(productActions.getProductSuccess(response.data))
    } catch (error) {
        dispatch(productActions.getProductFailure())
        throw getError(error)
        
    }
}