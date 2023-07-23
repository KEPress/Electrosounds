import React, { Fragment, useState, useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Container } from 'react-bootstrap'
import { Context } from '../../context/provider'
import { paySystem } from '../../context/deploy'
import { Breadcrumbs } from '../../widgets/breadcrumbs/Breadcrumbs'

export const Payment = () => {

    const navigate = useNavigate()

    const { payment, dispatch } = useContext(Context)

    //Access to values stored on 'persist:root' - state.persistence.stateSlice.sliceValues
    const address = useSelector((state) => state.persistence.shipping.address)

    const [paywall, setPaywall] = useState(payment || 'Stripe')

    useEffect(() => {
        if (!address) navigate(`/checkout`)
    }, [address, navigate])

    const submitHandle = (event) => {
        event.preventDefault()
        paySystem(dispatch, paywall, () => navigate(`/request`))
    }

    return (<Fragment>
                <Helmet><title>Payment | Electro Sounds</title></Helmet>
                <h1>Payment</h1>
                <Breadcrumbs phase1 phase2 phase3 />
                <Container style={{ maxWidth:'600px', marginTop:'100px'}}>
                    <Form onSubmit={submitHandle}>
                        <div className='mb-3'>
                            <Form.Check type={'radio'} id={'Stripe'} value={'Stripe'} label={'Stripe'} checked={paywall === 'Stripe'} onChange={(event) => setPaywall(event.target.value)} />
                        </div>
                        <div className='mb-3'>
                            <Form.Check type={'radio'} id={'Paypal'} value={'Paypal'} label={'Paypal'} checked={paywall === 'Paypal'} onChange={(event) => setPaywall(event.target.value)} />
                        </div>
                        <div className='mb-3'>
                            <Button type={'submit'}>Continue</Button>
                        </div>
                    </Form>
                </Container>
            </Fragment>)

}
