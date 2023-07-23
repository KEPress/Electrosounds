export const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_START': return { user: null, loading: true, error: false }
        case 'LOGIN_SUCCESS': return { user: action.payload, loading: false, error:false }
        case 'LOGIN_FAIL': return { user: null, loading: false, error: true }
        case 'LOGOUT': return {...state, user: null }
        case 'OPEN_REGISTER': return { user: null, loading: true, error: false }
        case 'REGISTER': return { user: action.payload, loading: false, error: false }
        case 'REGISTER_FAIL': return { user: null, loading: false, error: true }
        case 'UPDATE_REQUEST': return { user: null, loading: true, error: false }
        case 'UPDATE': return { user: action.payload, loading: false, error: false }
        case 'UPDATE_FAIL': return { user: null, loading: false, error: true }
        case 'ADDRESS_HANDLE': return {...state, address: action.payload }
        case 'PAYMENT_METHOD': return {...state, payment: action.payload }
        default: return state          
    }
}