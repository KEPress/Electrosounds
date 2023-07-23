import React, { Fragment, useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Row, Col, Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'
import { CircularProgress } from '@mui/material'
import { Context } from '../../context/provider'
import { placeOrder } from '../../redux/actions/orders'


//Might be wise to setup the payment here instead

export const PlaceOrder = () => {

    const dispatch = useDispatch(), navigate = useNavigate()

    const { user, loading, payment } = useContext(Context) 
   
    //Access to values stored on 'persist:root' - state.persistence.stateSlice.sliceValues
    //NOTE: variables names must match with name of the redux initialState
    //In the case of shipping to access object type variables: shipping.objectName.value
    const { shipping, cart } = useSelector((state) => state.persistence)

    const total = (cart.price + cart.shipping + cart.tax)
  
    //console.log(user.token)
    const orderHandle = async (event) => {    
       event.preventDefault()

        try {
         const order =  await placeOrder(dispatch, 
            { shipping, cart, user, payment, total }, 
            { headers: { token: `Bearer ${user.token}`} })
            navigate(`/order/${order._id}`) 
        } catch (error) {
            toast.error(error)
        }
    }

    useEffect(() => {
      if (!payment) navigate(`/payment`)
    }, [payment, navigate])
   
    return (<Fragment>
              <Helmet><title>Place Order | Electro Sounds</title></Helmet>
              <h1 className='my-3'>Preview Order</h1>
              <ToastContainer position={'bottom-center'} limit={1} />
              <Row>
                  <Col md={8}>
                      <Card className='mb-3'>
                        <Card.Body>
                          <Card.Title>Shipping Details</Card.Title>
                            <Card.Text>
                              <strong>Full Name:</strong> { shipping.address.name } {shipping.address.surname } <br />
                              <strong>Address:</strong> { shipping.address.address } <br />
                              <strong>City:</strong> { shipping.address.city } <br />
                              <strong>Country:</strong> { shipping.address.country } <br />
                              <strong>Zip/Postal Code:</strong> { shipping.address.postal }
                            </Card.Text>
                            <Link to={`/checkout`}>Edit Shipping</Link>
                        </Card.Body>
                      </Card>
                      <Card className='mb-3'>
                        <Card.Body>
                          <Card.Title>Payment</Card.Title>
                          <Card.Text>
                            <strong>Method:</strong> { payment }
                          </Card.Text>
                          <Link to={`/payment`}>Select Payment</Link>
                        </Card.Body>
                      </Card>
                      <Card className='mb-3'>
                        <Card.Body>
                          <Card.Title>Items</Card.Title>
                          <ListGroup variant={'flush'}>
                            { cart.items.map((item) => (
                              <ListGroupItem key={item._id}>
                                <Row className='align-items-center'>
                                  <Col md={6}>
                                    <img src={item.image} alt={item.title} style={{height:'80px', width:'80px'}} />
                                    {' '}
                                    <Link to={`/product/${item.slug}`}>{item.title}</Link>
                                  </Col>
                                  <Col md={3}>quantity:<span> {item.quantity}</span></Col>
                                  <Col md={3}>item cost: ${item.price}</Col>
                                </Row>
                              </ListGroupItem> ))}
                          </ListGroup>
                          <Link to={`/cart`}>Edit</Link>
                        </Card.Body>
                      </Card>
                  </Col>
                  <Col md={4}>
                    <Card>
                      <Card.Body>
                        <Card.Title>Order Summary</Card.Title>
                        <ListGroup variant={'flush'}>
                          <ListGroupItem>
                            <Row>
                              <Col>Total Cost</Col>
                              <Col>${cart.price}</Col>
                            </Row>
                          </ListGroupItem>
                          <ListGroupItem>
                            <Row>
                              <Col>Shipping Cost</Col>
                              <Col>{ cart.shipping}</Col>
                            </Row>
                          </ListGroupItem>
                          <ListGroupItem>
                            <Row>
                              <Col>Tax</Col>
                              <Col>{ cart.tax }</Col>
                            </Row>
                          </ListGroupItem>
                         <ListGroupItem>
                            <Row>
                              <Col><strong>Order Total</strong></Col>
                              <Col>{ total }</Col>
                            </Row>
                         </ListGroupItem>
                         <ListGroupItem>
                           <div className='d-grid'>
                            <Button type={'button'} onClick={orderHandle} disabled={cart.items.length === 0}>
                                { loading ? (<CircularProgress color={'inherit'} />):('Place Order')}
                              </Button>
                           </div>
                         </ListGroupItem>
                        </ListGroup>
                      </Card.Body>
                    </Card>           
                  </Col>
              </Row>
           </Fragment>)

}
