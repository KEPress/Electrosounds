import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Row, Col, Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Message } from '../../widgets/Message'
import { addToCart, removeFromCart } from '../../redux/actions/cart'
import axios from 'axios'


export const Cart = () => {

    const dispatch = useDispatch(), navigate = useNavigate()

    const cart = useSelector((state) => state.persistence.cart)

    console.log(cart)

    const updateCartHandle = async (item, quantity) => {
        const { data } = await axios.get(`/products/product/${item._id}`)
         if (data.stock < quantity) window.alert('Product Out of Stock')
         else dispatch(addToCart({...item, quantity}))
    }

    const removeCartHandle = (item) => {
        dispatch(removeFromCart(item))
    }

    const checkoutHandle = () => {
        navigate(`/login?redirect=/checkout`)
    }


    return (<Fragment>
            <Helmet>
                <title>Cart | Electro Sounds</title>
            </Helmet>
            <div className='cart'>
                <h1>Shopping Cart</h1>
                <Row>
                    <Col md={8}>
                        { cart.items.length === 0 ? 
                            (<Message>Cart is empty. <Link to={`/`}>Return to  Homepage <i className='fa fa-home' /></Link> </Message>):
                            (<ListGroup>
                                { cart.items.map((item) => (
                                    <ListGroupItem key={item._id}>
                                        <Row className='align-items-center'>
                                            <Col md={4}>
                                                <img src={item.image} alt={item.title} className='img-thumbnail' />
                                                {'  '}<Link to={`/product/${item.slug}`}>{ item.title }</Link>
                                            </Col>
                                            <Col md={3}>
                                                <Button variant={'light'} onClick={() => updateCartHandle(item, item.quantity - 1)} disabled={item.quantity === 1}>
                                                    <i className='fas fa-minus-circle' />
                                                </Button>{'  '}
                                                <span>{ item.quantity }</span>{'  '}
                                                <Button variant={'light'} onClick={() => updateCartHandle(item, item.quantity + 1)} disabled={item.quantity === item.stock}>
                                                    <i className='fas fa-plus circle' />
                                                </Button>
                                            </Col>
                                            <Col md={3}>${item.price}</Col>
                                            <Col md={2}>
                                                <Button variant={'light'} onClick={() => removeCartHandle(item)}>
                                                    <i className='fas fa-trash' />
                                                </Button>                                                        
                                            </Col>        
                                        </Row>
                                     </ListGroupItem>
                                ))}
                            </ListGroup>)}
                    </Col>
                    <Col md={4}>
                        <Card>
                            <Card.Body>
                                <ListGroup variant={'flush'}>
                                    <ListGroupItem>
                                       <h3>Subtotal Amount ${ cart.price}</h3> 
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <div className='d-grid'>
                                            <Button type={'button'} variant={'primary'} onClick={checkoutHandle} disabled={cart.items.length === 0}>
                                                Proceed to Checkout
                                            </Button>
                                        </div>
                                    </ListGroupItem>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
         </Fragment>)

}
