import axios from 'axios'

export const login = async (dispatch, credentials, callback) => {

    try {
        dispatch({ type: 'LOGIN_START'})
        const response = await axios.post(`/auth/login`, credentials)
        dispatch({ type: 'LOGIN_SUCCESS', payload: response.data})
        callback()
    } catch (error) {
        dispatch({ type: 'LOGIN_FAIL' })
        throw error.response.data
    }
}

export const logout = (dispatch, credentials) => {
    dispatch({ type: 'LOGOUT', payload: localStorage.removeItem(credentials) })
}


export const register = async (dispatch, credentials, callback) => {
    
    try {
        dispatch({ type: 'OPEN_REGISTER'})
        const response = await axios.post(`/auth/register`, credentials)
        dispatch({ type: 'REGISTER', payload: response.data})
        callback()
    } catch (error) {
        dispatch({ type: 'REGISTER_FAIL' })
        throw error.response.data
    }
}

export const update = async (dispatch, credentials, token) => {

    try {
        dispatch({ type: 'UPDATE_REQUEST'})
        const response = await axios.put(`/auth/update/`, credentials, token)
        dispatch({ type: 'UPDATE', payload: response.data })
        localStorage.setItem('user', JSON.stringify(response.data))
    } catch (error) {
        dispatch({ type: 'UPDATE_FAIL' })
        throw error.response.data
    }
}

//Setup shipping address data on hardcoded useContext
export const shipment = (dispatch, credentials) => {
    dispatch({ type: 'ADDRESS_HANDLE', payload: credentials })
}

export const paySystem = (dispatch, credentials, callback) => {
    dispatch({ type: 'PAYMENT_METHOD', payload: credentials})
    callback()
}
