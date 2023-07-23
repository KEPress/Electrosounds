import { createContext, useReducer, useEffect } from 'react'
import { reducer } from './reducer'

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem('user')) ? (JSON.parse(localStorage.getItem('user'))) : (null),
    //address: { },
    payment: null,
    loading: false,
    error: false
}

export const Context = createContext(INITIAL_STATE)

export const ContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(state.user))
        //localStorage.setItem('shipment', JSON.stringify(state.address)) //store shipment address on localstorage
        localStorage.setItem('payment', JSON.stringify(state.payment)) //store payment on localstorage
    }, [state.user, state.address, state.payment])

    //To add address as part of Context include inside <Context.Provide value={{ address: state.address }}> </Context.Provider>
    return (<Context.Provider value={{ user: state.user, loading: state.loading, error: state.error, payment: state.payment, dispatch }}>
               { children }
            </Context.Provider>)
}