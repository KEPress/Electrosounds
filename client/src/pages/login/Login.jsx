import React, { Fragment, useState, useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Container, Form, Button } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'
import { CircularProgress } from '@mui/material'
import { Context } from '../../context/provider'
import { login } from '../../context/deploy'
import { getError } from '../../utilities/custom'

export const Login = () => {

    const { search } = useLocation(), navigate = useNavigate()

    const { user, loading, dispatch } = useContext(Context)

    const redirectURL = new URLSearchParams(search).get('redirect')

    const redirect = redirectURL ? (redirectURL) : (`/`)

    const [ data, setData ] = useState({ 
        email: String(), 
        password: String() 
    })

    const handleChange = (event) => {
        setData((previous) => ({...previous, [event.target.name]: event.target.value }))
    }

    const submitHandle = async (event) => {
        event.preventDefault()
        try {
            await login(dispatch, data, () => navigate(redirect || `/`))
        } catch (error) {
           toast.error(getError(error))
        }
    }

    //Use Effect Hook to re-route user back to checkout screen after login
    useEffect(() => {
        if (user) navigate(redirect)
    }, [navigate, redirect, user])
   
    return (<Fragment>
                <Helmet><title>Login | Electro Sounds</title></Helmet>
                <ToastContainer position={'bottom-center'} limit={1} />
                <h1>Login</h1>
                <Container style={{ maxWidth:'600px', marginTop:'100px'}}>
                    <Form onSubmit={submitHandle}>
                        <Form.Group className='mb-3' controlId={'email'}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type={'email'} name={'email'} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId={'password'}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type={'password'} name={'password'} onChange={handleChange} required />
                        </Form.Group>
                        <div className='mb-3'>
                            <Button type={'submit'}>{ loading ? (<CircularProgress color={'inherit'} />): ('Login')}</Button>
                        </div>
                        <div className='mb-3'>
                            New Customer?{'  '}<Link to={`/register?redirect=${redirect}`}>Create new account</Link>
                        </div>
                    </Form>
                </Container>
            </Fragment>)
}
