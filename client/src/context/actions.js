
//LOGIN PROCESS
export const loginStart = () => ({
    type: 'LOGIN_START'
})

export const loginSuccess = (data) => ({
    type: 'LOGIN_SUCCESS',
    payload: data
})

export const loginFail = () => ({  
    type: 'LOGIN_FAIL',
})

export const logout = () => ({
    type: 'LOGOUT'
})


//REGISTER PROCESS
export const registerOpen = () => ({
    type: 'OPEN_REGISTER'
})

export const register = (data) => ({
    type: 'REGISTER',
    payload: data
})

export const registerFail = () => ({
    type: 'REGISTER_FAIL',
})

//UPDATE PROCESS
export const updateRequest = () => ({
    type: 'UPDATE_REQUEST'
})

export const update = (data) => ({
    type: 'UPDATE',
    payload: data
})

export const updateFail = () => ({
    type: 'UPDATE_FAIL'
})

//ADDRESS SHIPMENT
export const handleAddress = (data) => ({
    type: 'ADDRESS_HANDLE',
    payload: data
})

//PAYMENT
export const handlePayment = (data) => ({
    type: 'PAYMENT_METHOD',
    payload: data
})
