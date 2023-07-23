import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Root } from './pages/layout/Root'
import { Home, loader as loadProducts } from './pages/home/Home'
import { Login } from './pages/login/Login'
import { Register } from './pages/register/Register'
import { Product } from './pages/product/Product'
import { Cart } from './pages/cart/Cart'
import { Checkout } from './pages/paywall/Checkout'
import { Payment } from './pages/paywall/Payment'
import { PlaceOrder } from './pages/paywall/PlaceOrder'
import { Orders } from './pages/orders/Orders'
import { Profile } from './pages/profile/Profile'
import { History } from './pages/orders/History'
import { Private } from './utilities/private'
import Container from 'react-bootstrap/Container'
import 'react-toastify/dist/ReactToastify.css'




export const App = () => {

    const router = createBrowserRouter([
        { path: `/`, element:<Root />, id: 'root', children: [
            { index: true, element: <Container><Home /></Container>, loader: loadProducts  },
            { path: `/product`, children: [
                { path: `:slug`, id: 'product-info', element: <Container><Product /></Container> }
            ]},
            { path: `/login`, element: <Login />},
            { path: `/register`, element: <Register />},
            { path: `/cart`, element: <Container><Cart /></Container>},
            { path: `/checkout`, element: <Container><Checkout /></Container>},
            { path: `/payment`, element: <Private><Container><Payment /></Container></Private>},
            { path: `/request`, element: <PlaceOrder />},
            { path: `/order`, children: [
                { path: `:orderId`, id: 'order-info', element: <Private><Orders /></Private>},
                { path: `history`,  children: [
                   { path: `:userId`, element: <Private><History /></Private> }
                ]}
            ]},
            { path: `/profile`, children: [
                { path: `:userId`, id: 'user-info', element: <Profile /> }
            ]}
        ]}
       
    ])

    return (<React.Fragment>
              <RouterProvider router={router}  />
          </React.Fragment>)

}


