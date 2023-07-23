import React, { Fragment } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Products } from '../../pages/products/Products'
import './Display.scss'

export const Display = ({ products }) => {
   
    return (
      <Fragment>
        <div className="products">
          <Row>
            { products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className='mb-3'>
                 <Products product={product} /> 
              </Col>
            ))}
          </Row>
        </div>
      </Fragment>
    );

}
