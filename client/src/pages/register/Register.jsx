import React, { Fragment, useRef, useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Container, Form, Button } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'
import { CircularProgress } from '@mui/material'
import { Context } from '../../context/provider'
import { register } from '../../context/deploy'
import { getError } from '../../utilities/custom'
//import axios from 'axios'

export const Register = () => {
  
  const { search } = useLocation(), navigate = useNavigate()

  const { user, loading, dispatch } = useContext(Context)

  const redirectURL = new URLSearchParams(search).get('redirect')

  const redirect = redirectURL ? (redirectURL) : (`/`)

  const name = useRef(), surname = useRef(), email = useRef(), password = useRef(), confirm = useRef()

  const submitHandle = async (event) => {
      event.preventDefault()
      if (confirm.current.value !== password.current.value) {
          toast.error(`Passwords don't match`)
      } else {
          
         const data = {
            name: name.current.value,
            surname: surname.current.value,
            email: email.current.value,
            password: password.current.value
        }
        
         try {
            await register(dispatch, data, () => navigate(redirect || `/`))
        } catch (error) {
            toast.error(getError(error))
        }
    }
}

  //Use Effect Hook to re-route user back to checkout screen after login
  useEffect(() => {
      if (user) navigate(redirect)
  }, [navigate, redirect, user])



  return (<Fragment>
            <Helmet><title>Register | Electro Sounds</title></Helmet>
            <ToastContainer position={'bottom-center'} limit={1} />
            <h1>Sign Up</h1>
            <Container style={{ maxWidth:'600px', marginTop:'20px'}}>
                <Form onSubmit={submitHandle}>
                    <Form.Group className='mb-3' controlId={'name'}>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type={'text'} ref={name} placeholder={'Enter Name'} required />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId={'surname'}>
                        <Form.Label>Surname</Form.Label>
                        <Form.Control type={'text'} ref={surname} placeholder={'Enter Surname'} required />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId={'email'}>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type={'email'} ref={email}  placeholder={'Enter Email Address'} required />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId={'password'}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type={'password'} ref={password} placeholder={'Enter Password'} required />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId={'confirm'}>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type={'password'} ref={confirm}  placeholder={'Confirm Password'} required />
                    </Form.Group>
                    <div className='mb-3'>
                        <Button type={'submit'}>{ loading ? (<CircularProgress color={'inherit'} />): ('Register')}</Button>
                    </div>
                    <div className='mb-3'>
                        Already have an Account?{'  '}<Link to={`/login?redirect=${redirect}`}>Sign In here</Link>
                    </div>
                </Form>
            </Container>
          </Fragment>)

}
