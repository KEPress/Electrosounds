import React, { Fragment, useState, useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { Row, Col, Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'
import { Context } from '../../context/provider'
import { Loading } from '../../widgets/Loading'
import { Message } from '../../widgets/Message'
import { Payments } from '../../widgets/payments/Payments'
import { fetchOrder, reset, stripePayment } from '../../redux/actions/orders'
import { getError } from '../../utilities/custom'
import axios from 'axios'


export const Orders = () => {

    const dispatch = useDispatch(), params = useParams(), navigate = useNavigate()

    const { orderId } = params

    //To access items Object stored inside an array type
    //console.log(order.orders.map((item) => console.log(item.items[0].title)))
    //console.log(order.orders.map((items) => items))

    const [stripe, setStripe] = useState(null)

    const { user, loading, error } = useContext(Context)

    const [ { isPending }, paypalDispatch ] = usePayPalScriptReducer()

    const onToken = (token) => setStripe(token)

    const onError = (error) => toast.error(getError(error)) 

     //get the order object containing order data and store in variable
     //NOTE: change made by adding order to the de-structure of the useSelector()
     //const order = useSelector((state) => state.orders.order)

     //destructure to get values stored in order slice initialValues 
     //note in drawing out values stored in order use '?' to query to prevent undefined TypeErrors
     const { order, success }  = useSelector((state) => state.persistence.orders)

    //Stripe Payment Setup
    useEffect(() => {
        const getOrder = async () => {
            await fetchOrder(dispatch, orderId, { headers: { token: `Bearer ${user.token}`}})
        }
        const payRequest = async () => {
            if (stripe) {
                try {
                        await stripePayment(dispatch, orderId, { 
                        tokenId: stripe.id, 
                        amount: order.totalCost * 100, 
                        shipping: order.shipping,
                        user: { id: user._id, email: user.email } }, 
                        { headers: { token: `Bearer ${user.token}`}
                    })
                    setStripe(null)
                    getOrder()
                } catch (error) {
                    toast.error(getError(error))
                }
            } else toast.error('Invalid Stripe Key')
        } 
        stripe && (payRequest())
    }, [stripe, dispatch,  orderId, order, user])

    const createOrderHandle = (data, actions) => {
        return actions.order.create({
            purchase_units: [{ amount: { value: order.totalCost }}]
        }).then((orderID) => {
            return orderID
        })
    }

    const approveOrderHandle = (data, actions) => {
        return actions.order.capture().then(async (details) => {
            try {
                dispatch({ type: 'PAY_REQUEST'})
                const { data } = await axios.put(`/orders/${orderId}/pay`, 
                                    details, { headers: { token: `Bearer ${user.token}`}})
                dispatch({ type: 'PAY_SUCCESS', payload: data })
                toast.success('Order is paid')
            } catch (error) {
                dispatch({ type: 'PAY_FAIL', payload: getError(error) })
                toast.error(getError(error))
            }
        })
    }

    //PayPal Payment Setup
    useEffect(() => {
        const getOrder = async () => {
           await fetchOrder(dispatch, orderId, { headers: { token: `Bearer ${user.token}`}})
        }
        if (!user) return navigate(`/login`)
        if (!order._id || success || (order._id && order._id !== orderId)) {
             getOrder()
             if (success) reset(dispatch)
        } else {
            const loadPaypal = async () => {
                const { data: clientId } = await axios.get(`/keys/paypal`, { headers: { token: `Bearer ${user.token}`}})
                paypalDispatch({ type: 'resetOptions', value: { 'clientId':clientId, currency: 'USD' }})
                paypalDispatch({ type: 'setLoadingStatus', value: 'pending'})
            }
            loadPaypal()
        }
    }, [dispatch, orderId, order, success, user, navigate, paypalDispatch])

    
    if (!order) return (<Loading />)

    return (<Fragment>  
                <Helmet>
                    <title>{ orderId } || Electro Sounds </title>
                </Helmet>
                { loading ? (<Loading />) :
                         error ? (<Message variant={'danger'}>{error}</Message>) : 
                         (<div>
                            <ToastContainer position={'bottom-center'} limit={1} />
                            <h1>Order #{ orderId }</h1>
                            <Row>
                                <Col md={8}>
                                    <Card className='mb-3'>
                                        <Card.Body>
                                            <Card.Title>Shipping</Card.Title>
                                            <Card.Text>
                                            { order.isDelivered ? (<Message variant={'success'}> Delivered: { order.deliverDate } </Message>):
                                                    (<Message variant={'danger'}>Not Delivered</Message>)}
                                             </Card.Text>
                                        </Card.Body>
                                    </Card>
                                    <Card className='mb-3'>
                                        <Card.Body>
                                            <Card.Title>Payment</Card.Title>
                                            <Card.Text>
                                                <strong>Full Name:</strong> { order.shipping?.address?.name } { order.shipping?.address?.surname } <br />
                                                <strong>Email:</strong> { order.user?.email } <br />
                                                <strong>Address:</strong> { order.shipping?.address?.address }<br />
                                                <strong>City:</strong> { order.shipping?.address?.city } <br />
                                                <strong>Country:</strong> { order.shipping?.address?.country } <br />
                                                <strong>Zip/Postal Code:</strong> { order.shipping?.address?.postal}
                                            </Card.Text>
                                            { order.isPaid ? (<Message variant={'success'}>Paid: { order.paidDate }</Message>):
                                                (<Message variant={'danger'}>Not Paid</Message>)}
                                        </Card.Body>
                                    </Card>
                                    <Card className='mb-3'>
                                        <Card.Body>
                                            <Card.Title>Items Ordered</Card.Title>
                                            <ListGroup variant={'flush'}>
                                                { order.orders?.map((orderItem) => (
                                                    <ListGroupItem key={orderItem._id}>
                                                        <Row className='align-items-center' style={{marginTop:'5px'}}>
                                                            { orderItem.items.map((item) => (
                                                                <Fragment key={item._id}>
                                                                    <Col md={6}>
                                                                        <img src={item.image} alt={item.title} style={{height: '80px', width: '80px'}} />
                                                                        {' '}
                                                                        <Link to={`/product/${item.slug}`}>{ item.title }</Link>
                                                                    </Col>
                                                                    <Col md={3}><span>Qty ordered: {item.quantity} </span></Col>
                                                                    <Col md={3}><span>Item Price: ${item.price.toFixed(2)} </span></Col>
                                                                </Fragment>
                                                            ))}
                                                        </Row>
                                                    </ListGroupItem>
                                                ))}
                                            </ListGroup>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={4}>
                                    <Card className='mb-3'>
                                        <Card.Body>
                                            <Card.Title>Order Summary</Card.Title>                                            
                                            { order.orders?.map((item) => (
                                                <ListGroup variant={'flush'}>
                                                    <ListGroupItem>
                                                        <Row>
                                                            <Col>Total Item Cost:</Col>
                                                            <Col>${ item.price.toFixed(2) }</Col>
                                                        </Row>
                                                    </ListGroupItem>
                                                    <ListGroupItem>
                                                        <Row>
                                                            <Col>Shipping</Col>
                                                            <Col>${item.shipping.toFixed(2)}</Col>
                                                        </Row>
                                                    </ListGroupItem>
                                                    <ListGroupItem>
                                                        <Row>
                                                            <Col>Tax</Col>
                                                            <Col>${item.tax.toFixed(2)}</Col>
                                                        </Row>
                                                    </ListGroupItem>
                                                    <ListGroupItem>
                                                        <Row>
                                                            <Col>Order Total</Col>
                                                            <Col>${order.totalCost.toFixed(2)}</Col>
                                                        </Row>
                                                    </ListGroupItem>
                                                    { !order.isPaid && (<ListGroupItem>
                                                        { isPending ? (<Loading />):
                                                            (<Payments paymethod={order.paymentMethod} 
                                                                    totalCost={order.totalCost} 
                                                                    token={onToken} stripe={stripe}
                                                                    createHandle={createOrderHandle}
                                                                    approveHandle={approveOrderHandle}
                                                                    onError={onError}/>)}
                                                    </ListGroupItem>)}
                                                </ListGroup>
                                            ))}
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </div>)}
            </Fragment>)


}



  /***CODE NOT WORKING - TRY TO IMPLEMENT BUT GETTING order.Id error
     *  const createOrderHandle = (data, actions) => {
       create(dispatch, {...data, totalCost: order.totalCost.toFixed(2)}, actions)
    }
 
    const approveOrderHandle = (data, actions) => {
        return actions.order.capture().then( async (details) => {
             try {
                await approval(dispatch, orderId, details, { headers: { token: `Bearer ${user.token}`}})
                toast.success('Order is paid')
             } catch (error) {
                toast.error(error)
             }
        })
    }

    //Stripe Try...catch

     try {
            const response = await axios.put(`/orders/stripe/${order._id}`, {
                tokenId: stripe.id, 
                amount: order.totalCost * 100, 
                shipping: order.shipping,
                user: { id: user._id, email: user.email }
            }, { headers: { token: `Bearer ${user.token}`}  })
            console.log(response.data)
                  
        } catch (error) {
            toast.error(getError(error))
        }
     ***/
