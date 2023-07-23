import React, { Fragment, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card, ListGroup, ListGroupItem, Button, Badge } from 'react-bootstrap'
import { Rate } from '../../widgets/rate/Rate.jsx'
import { Loading } from '../../widgets/Loading'
import { Message } from '../../widgets/Message'
import { fetchProduct } from '../../redux/actions/product'  
import { addToCart } from '../../redux/actions/cart'
import axios from 'axios'

export const Product = () => {

    const params = useParams(), dispatch = useDispatch()

    const product = useSelector((state) => state.product)

    const cart = useSelector((state) => state.persistence.cart)

    const { slug } = params

    //const [selected, setSelected] = useState(String)
    
    //Fetch Product data  
    useEffect(() => {
       fetchProduct(dispatch, slug)
    }, [dispatch, slug])  
  
    const cartHandle = async (product) => { 
      
      const existing = cart.items.find((item) => item._id === product._id)
      const quantity = existing ? (existing.quantity + 1) : (1)
      const  { data }  = await axios.get(`/products/product/${product._id}`)
      if (data.stock < quantity) window.alert('Product Out of Stock')
      else dispatch(addToCart({...product, quantity}))
    }
    
    return (<Fragment>
             { product.processing ? (<Loading />) 
               : product.error ? (<Message variant={'danger'}>{ product.error }</Message>)
               : (<Fragment>
                    <Row>
                      <Col md={6}>
                        <img src={product.products.image } alt={product.products.title} style={{maxWidth:'100%'}} />
                      </Col>
                      <Col md={3}>
                        <ListGroup variant={'flush'}>
                          <ListGroupItem>
                             <Helmet>
                                <title>{ product.products.title }</title>
                             </Helmet> 
                             <h1>{ product.products.title }</h1>  
                          </ListGroupItem>
                          <ListGroupItem>
                              <Rate rating={product.products.rating} reviews={product.products.reviews} />
                          </ListGroupItem> 
                          <ListGroupItem>Price: ${product.products.price}</ListGroupItem>
                          <ListGroupItem>Details: <p>{product.products.details}</p></ListGroupItem>      
                        </ListGroup>
                      </Col>
                      <Col md={3}>
                        <Card>
                          <Card.Body>
                            <ListGroup variant={'flush'}>
                              <ListGroupItem>
                                <Row>
                                  <Col>Price:</Col>
                                  <Col>${product.products.price}</Col>
                                </Row>
                              </ListGroupItem>
                                 <ListGroupItem>
                                <Row>
                                  <Col>Status:</Col>
                                  <Col>{product.products.stock > 0 ? (<Badge bg={'success'}>In Stock</Badge>) : 
                                        (<Badge bg={'danger'}>Unavailable</Badge>)}</Col>
                                </Row>
                              </ListGroupItem>
                              { product.products.stock > 0 && 
                                  (<ListGroupItem>
                                    <div className='d-grid'>  
                                      <Button variant={'primary'} onClick={() => cartHandle(product.products)}>Add to Cart</Button>
                                     </div>
                                    </ListGroupItem>)}
                            </ListGroup> 
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Fragment>)}
           </Fragment>)

}
