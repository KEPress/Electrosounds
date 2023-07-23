import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import  { Card, Button } from 'react-bootstrap'
import { Rate } from '../../widgets/rate/Rate'
import { addToCart } from '../../redux/actions/cart'
import axios from 'axios'
import './Products.scss'

export const Products = (props) => {
    
    //de-construct props passed from Display Page as normal prop
    //It's already defined as an object from the display page
    const { product } = props

    const dispatch = useDispatch()

    const cart = useSelector((state) => state.persistence.cart)

    const cartHandle = async (product) => {

        const existing = cart.items.find((item) => item._id === product._id)
        const quantity = existing ? (existing.quantity + 1) : (1)
        const  data = await axios.get(`/products/product/${product._id}`)
        if (data.stock < quantity) window.alert('Product Out of Stock')
        else dispatch(addToCart({...product, quantity}))
    }

    /**
     * 
     * @param {*} product 
     * const cartHandleObject = async (product) => {
        const existing = cart.items[product._id]
        const quantity = existing ? (existing.quantity + 1) : (1)
        const data = await axios.get(`/products/product/${product._id}`)
        if (data.stock < quantity) window.alert('Product Out of Stock')
        else dispatch(addToCart({...product, quantity}))
    }****/

    return (<Fragment>
            <Card>
              <Link to={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name} className='card-img-top' />
              </Link>
            <Card.Body>
              <Link to={`/product/${product.slug}`}>
                <Card.Title>{product.title}</Card.Title>
              </Link>
              <Rate rating={product.rating} reviews={product.reviews} />
              <Card.Text>${product.price}</Card.Text>
              { product.stock === 0 ? (<Button variant={'light'}>Out of Stock</Button>) : 
                  (<Button onClick={()=>cartHandle(product)} className='btn-primary'>Add to Cart</Button>)}
            </Card.Body>
          </Card>
        </Fragment>)

}
