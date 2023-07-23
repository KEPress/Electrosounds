import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { Context } from '../context/provider'

export const Private = ({ children }) => {

    const { user } = useContext(Context)
  
    if (user === null) return (<Navigate to={`/login`} />)

    return children
}
