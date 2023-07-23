import React, { Fragment, useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, Form, Button } from 'react-bootstrap'
import { Formik, useFormik } from 'formik'
import { toast, ToastContainer } from 'react-toastify'
import { Context } from '../../context/provider'
import { Breadcrumbs } from '../../widgets/breadcrumbs/Breadcrumbs'
import { handleAddress } from '../../redux/actions/shipping'
import { getError } from '../../utilities/custom'
import * as Yup from 'yup'
//import axios from 'axios'


export const Checkout = () => {

    const { user } = useContext(Context)

    const dispatch = useDispatch(), navigate = useNavigate()

    //Access to values stored on 'persist:root' - state.persistence.stateSlice.sliceValues
    const address = useSelector((state) => state.persistence.shipping.address)
   
    const dataSet = useFormik({
        initialValues: {
            name: String(),
            surname: String(),
            address: String(),
            second: String(),
            country: String(),
            city: String(),
            state: String(),
            postal: Number()
        }
    })

    const validate = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        surname: Yup.string().required('Surname is required'),
        address: Yup.string().required('Main Address is required'),
        country: Yup.string().required('Country is required'),
        city: Yup.string().required('City is required'),
        postal: Yup.number().required('Postal Code is required').test('is-valid-postal', 'Invalid Postal Code', (value) => {
            if (typeof(value) === 'number' && (/^\d+$/.test(value.toString()))) return true
            return false
        })
    })

    //Redirect logged In user
    useEffect(() => {
        if (!user) navigate(`/login?redirect=/checkout`)
    }, [user, navigate])

    return (<Fragment>
                <Helmet><title>Shipping | Electro Sounds</title></Helmet>
                <Breadcrumbs phase1 phase2 />
                <h1 className='my-3'>Shipping</h1>
                <ToastContainer position={'bottom-center'} limit={1} />
                {/* Can pass dataSet values & address state values inside Formik initialValues element */ }
                {/* This is integral for record retrieval especially in terms of updating via Formik & Yup forms */}
                <Formik initialValues={{...dataSet.values, ...address}} validationSchema={validate} validateOnChange={true} 
                    onSubmit={ async (values, action) => {
                                try {
                                    //Can either use Context or Redux
                                    //shipment(dispatch, values) - from useContext Hardcoded
                                    dispatch(handleAddress(values))
                                    action.setSubmitting(false)
                                    action.resetForm({
                                        values: {
                                            name: '',
                                            surname: '',
                                            address: '',
                                            second: '',
                                            country: '',
                                            city: '',
                                            state: '',
                                            postal: ''
                                        }
                                    })
                                    navigate(`/payment`)
                                } catch (error) {
                                   toast.error(getError(error))
                                }
                    }}>

                    {({ handleSubmit, handleChange, values, touched, errors}) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Row className='mb-3'>
                                <Form.Group as={Col} controlId={'name'} className='position-relative'>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control 
                                        type={'text'}
                                        name={'name'} 
                                        value={values.name || ('')}
                                        isValid={touched.name}
                                        isInvalid={!!errors.name}
                                        onChange={handleChange} 
                                        placeholder={'Enter Name'} />
                                    <Form.Control.Feedback type={'invalid'} tooltip>{errors.name}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} controlId={'surname'} className='position-relative'>
                                    <Form.Label>Surname</Form.Label>
                                    <Form.Control 
                                        type={'text'} 
                                        name={'surname'}
                                        value={values.surname || ('')}
                                        isValid={touched.surname}
                                        isInvalid={!!errors.surname} 
                                        onChange={handleChange} 
                                        placeholder={'Enter Surname'} />
                                    <Form.Control.Feedback type={'invalid'} tooltip>{errors.surname}</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className='mb-3'>
                                <Form.Group className='position-relative' controlId={'address'}>
                                    <Form.Label>Address Line 1</Form.Label>
                                    <Form.Control 
                                        type={'text'} 
                                        name={'address'} 
                                        value={values.address || ('')}
                                        isValid={touched.address}
                                        isInvalid={!!errors.address}
                                        onChange={handleChange}
                                        placeholder={'Enter primary Address'} />
                                    <Form.Control.Feedback type={'invalid'} tooltip>{errors.address}</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className='mb-3'>
                                <Form.Group className='position-relative' controlId={'second'}>
                                    <Form.Label>Address Line 2</Form.Label>
                                    <Form.Control type={'text'} name={'second'} onChange={handleChange} placeholder={'Enter another address (optional)'} />
                                </Form.Group>
                            </Row>
                            <Row className='mb-3'>
                                <Form.Group as={Col} md={6} controlId={'country'} className='position-relative'>
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control 
                                        type={'text'} 
                                        name={'country'} 
                                        value={values.country || ('')}
                                        isValid={touched.country}
                                        isInvalid={!!errors.country}
                                        onChange={handleChange}
                                        placeholder={'Enter Country'} />
                                    <Form.Control.Feedback type={'invalid'} tooltip>{errors.country}</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className='mb-3'>
                                <Col xs={6}>
                                    <Form.Group as={Col} controlId={'city'} className='position-relative'>
                                        <Form.Label>City</Form.Label>
                                        <Form.Control 
                                            type={'text'} 
                                            name={'city'} 
                                            value={values.city || ('')}
                                            isValid={touched.city}
                                            isInvalid={!!errors.city}
                                            onChange={handleChange} 
                                            placeholder={'Enter City'} />
                                        <Form.Control.Feedback type={'invalid'} tooltip>{errors.city}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Form.Group as={Col} controlId={'state'} className='position-relative'>
                                    <Form.Label>State</Form.Label>
                                    <Form.Select name={'state'} value={values.state || ('')} isValid={touched.state} 
                                        isInvalid={!!errors.state} onChange={handleChange} placeholder={'Select State'}>
                                        <option>Choose...</option>
                                        <option value={'State1'}>State #1</option>
                                        <option value={'State2'}>State #2</option>
                                        <option value={'State3'}>State #3</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type={'invalid'} tooltip>{errors.state}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} controlId={'postal'} className='position-relative'>
                                    <Form.Label>Postal Code</Form.Label>
                                    <Form.Control 
                                        type={'text'} 
                                        name={'postal'} 
                                        value={values.postal || ('')}
                                        isValid={touched.postal}
                                        isInvalid={!!errors.postal}
                                        onChange={handleChange} 
                                        placeholder={'Enter Postal Code'}/>
                                    <Form.Control.Feedback type={'invalid'} tooltip>{errors.postal}</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Form.Group as={Col} controlId={'submit'}>
                                <Button type={'submit'} variant={'primary'}>Submit</Button>
                            </Form.Group>
                        </Form>
                    )}
                </Formik>

            </Fragment>)

}
