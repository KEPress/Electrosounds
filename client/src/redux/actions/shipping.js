import { shippingActions } from '../slices/shipping'

export const handleAddress = (newAddress) => {
    return (dispatch) => { 
        //de-structure to remove non-serializable components since Formik has dataSet Object
        const { dataSet, ...addressData } = newAddress
        dispatch(shippingActions.setAddress(addressData))
    }
}

export const clearAddress = () => {
    return (dispatch) => { dispatch(shippingActions.clear())}
}

