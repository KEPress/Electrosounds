import React, { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch  } from 'react-redux'
import { Nav, Badge, Container, Navbar, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Context } from '../../context/provider'
import { logout } from '../../context/deploy'
import { clearAddress } from '../../redux/actions/shipping'
import { clearCart } from '../../redux/actions/cart'
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse'
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle'


export const Navigate = () => {

  const dispatch2 = useDispatch()

  const cart = useSelector((state) => state.persistence.cart)
   
  const { user, dispatch, payment } = useContext(Context)

  const logoutHandle = () => {
      logout(dispatch, user)
      logout(dispatch, payment)
      dispatch2(clearCart())
      dispatch2(clearAddress())
      window.location.href = `/login`
  }

  return (<Fragment>
          <Navbar bg={"dark"} variant={"dark"} expand={'lg'}>
            <Container>
              <LinkContainer to={`/`}>
                <Navbar.Brand>Electro Sounds</Navbar.Brand>
              </LinkContainer>
                <NavbarToggle aria-controls='basic-navbar-nav' />
                <NavbarCollapse id={'basic-navbar-nav'}>
                <Nav className='me-auto w-100 justify-content-end'>
                  <Link to={`/cart`} className='nav-link'>
                  Cart { cart.items.length > 0 && (<Badge pill bg={'danger'}>{ cart.items.reduce((auto, current) => auto + current.quantity, 0)}</Badge>)}
                  </Link>
                  { user ? (<NavDropdown title={user.name} id='basic-nav-dropdown'>
                              <LinkContainer to={`/profile/${user._id}`}>
                                <NavDropdown.Item>User Profile</NavDropdown.Item>
                              </LinkContainer>
                              <LinkContainer to={`/order/history/${user._id}`}>
                                <NavDropdown.Item>Orders</NavDropdown.Item>
                              </LinkContainer>
                              <NavDropdown.Divider />
                              <Link to={`#logout`} className='dropdown-item' onClick={logoutHandle}>Logout</Link>
                            </NavDropdown>) 
                    : (<Link to={`/login`} className='nav-link'>Login</Link>)}
                </Nav>
                </NavbarCollapse>
            </Container>
          </Navbar>
      </Fragment>)

}
