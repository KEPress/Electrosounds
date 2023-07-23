import React, { Fragment } from 'react'
import { Row, Col } from 'react-bootstrap'
import './Breadcrumbs.scss'

export const Breadcrumbs = (props) => {

  return (<Fragment>
            <Row className='checkout-steps'>
                <Col className={props.phase1 ? ('active'):('')}>Login</Col>
                <Col className={props.phase2 ? ('active'):('')}>Shipping</Col>
                <Col className={props.phase3 ? ('active'):('')}>Payment</Col>
                <Col className={props.phase4 ? ('active'):('')}>Order</Col>
            </Row>
        </Fragment>)

}
