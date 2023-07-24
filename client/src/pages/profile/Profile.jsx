import React, { Fragment, useContext } from 'react'
import { Helmet } from 'react-helmet'
//import { useNavigate } from 'react-router-dom'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useFormik, Formik } from 'formik'
import { toast, ToastContainer } from 'react-toastify'
import { Context } from '../../context/provider'
import { update } from '../../context/deploy'
import { getError } from '../../utilities/custom'
import * as Yup from 'yup'

export const Profile = () => {

    //const navigate = useNavigate()

    const { user, dispatch } = useContext(Context)

    const dataSet = useFormik({
        initialValues: {
            name: String(),
            surname: String(),
            email: String(),
            password: String(),
            confirm: String(),
        }
    })

    const validate = Yup.object().shape({
        email: Yup.string().email('Email is Invalid'),
        password: Yup.string().min(5, 'Passcode at least 5 characters')
        .max(10, 'Passcode must not exceed 20 characters'),
        confirm: Yup.string().oneOf([Yup.ref('password'), null], 'Confirm Passcode does not match')
    })
    
    /***
     * 
    useEffect(() => {
        if (!user) navigate(`/login?redirect=/profile`)
    }, [user, navigate])
     * 
     ***/
   
    return (<Fragment>
                <Helmet>
                    <title>User Profile || Electro Sounds </title>
                </Helmet>
                <ToastContainer position={'bottom-center'} limit={1} />
                <h1 className='my-3'>User Profile</h1>
                <Formik initialValues={{...dataSet.values, ...user}} validationSchema={validate} validateOnChange={true}
                    onSubmit={ async (values, action) => {  
                        try {
                            await update(dispatch, values, { headers: { token: `Bearer ${user.token}`}})
                            action.setSubmitting(false)
                            toast.success('User Profile updated')
                        } catch (error) {
                            toast.error(getError(error))
                        }
                }}>

                    {({ handleSubmit, handleChange, values, touched, errors}) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Row className='mb-3'>
                                <Form.Group as={Col} md={5} controlId={'name'} className='position-relative'>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type={'text'} name={'name'} value={values.name || ('')} isValid={touched.name} isInvalid={!!errors.name} onChange={handleChange} placeholder={'Enter Name'} />
                                    <Form.Control.Feedback type={'invalid'} tooltip>{errors.name}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md={5} controlId={'surname'} className='position-relative'>
                                    <Form.Label>Surname</Form.Label>
                                    <Form.Control type={'text'} name={'surname'} value={values.surname || ('')} isValid={touched.surname} isInvalid={!!errors.surname} onChange={handleChange} placeholder={'Enter Surname'} />
                                    <Form.Control.Feedback type={'invalid'} tooltip>{errors.surname}</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className='mb-3'>
                                <Form.Group as={Col} md={5} controlId={'email'} className='position-relative'>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type={'email'} name={'email'} value={values.email || ('')} isValid={touched.email} isInvalid={!!errors.email} onChange={handleChange} placeholder={'Enter Email'} />
                                    <Form.Control.Feedback type={'invalid'} tooltip>{errors.email}</Form.Control.Feedback>                               
                                </Form.Group>
                            </Row>
                            <Row className='mb-3'>
                                <Form.Group as={Col} md={5} controlId={'password'} className='position-relative'>
                                    <Form.Label>Update Password</Form.Label>
                                    <Form.Control type={'password'} name={'password'} value={values.password || ('')} isValid={touched.password} isInvalid={!!errors.password} onChange={handleChange} placeholder={'Enter Password'} />
                                    <Form.Control.Feedback type={'invalid'} tooltip>{errors.password}</Form.Control.Feedback>                               
                                </Form.Group>
                            </Row>
                            <Row className='mb-3'>
                                <Form.Group as={Col} md={5} controlId={'confirm'} className='position-relative'>
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type={'password'} name={'confirm'} value={values.confirm || ('')} isValid={touched.confirm} isInvalid={!!errors.confirm} onChange={handleChange} placeholder={'Enter Confirm'} />
                                    <Form.Control.Feedback type={'invalid'} tooltip>{errors.confirm}</Form.Control.Feedback>                               
                                </Form.Group>
                            </Row>
                            <Form.Group as={Col} controlId={'submit'}>
                                <Button type={'submit'} variant={'primary'}>Update</Button>
                            </Form.Group>
                        </Form>
                    )}
                </Formik>
           </Fragment>)
}

