import React, { Fragment, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import { Table, Button } from 'react-bootstrap'
import { Context } from '../../context/provider'
import { userOrders } from '../../redux/actions/orders'
import { Helmet } from 'react-helmet'
import { Loading } from '../../widgets/Loading'
import { Message } from '../../widgets/Message'
import { getError } from '../../utilities/custom'


export const History = () => {

    const dispatch = useDispatch(),  navigate = useNavigate()

    const { order, error, processing } = useSelector((state) => state.persistence.orders)

    const { user } = useContext(Context)

    console.log(user)

    useEffect(() => {
        const fetchOrders = async () => {

            try {
                await userOrders(dispatch, { headers: { token: `Bearer ${user.token}`}})
            } catch (error) {
                toast.error(getError(error))
            }
        }
        fetchOrders()
    }, [user, dispatch])


    return (<Fragment>
                <Helmet><title>Orders | Electro Sounds</title></Helmet>
                <ToastContainer position={'bottom-center'} limit={1} />
                <h1>Order History</h1>
                { processing ? (<Loading />) : 
                  error ? (<Message variant={'danger'}>{error}</Message>) : 
                  order && (order.length > 0) ? ( <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Payment</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                        { order.map((item) => (
                                <tr key={item._id}>
                                    <td>{item._id}</td>
                                    <td>{item.createdAt.substring(0, 10)}</td>
                                    <td>{item.totalCost.toFixed(2)}</td>
                                    <td>{item.paymentMethod}</td>
                                    <td>{item.isPaid ? (item.paidDate.substring(0,10)):('No')}</td>
                                    <td>{item.isDelivered ? (item.deliverDate.substring(0, 10)):('No')}</td>
                                    <td><Button type={'button'} variant={'light'} onClick={() => navigate(`/order/${item._id}`)}>Order Details</Button></td>
                                </tr>
                            ))}
                        </tbody>
                  </Table>) : (<p>No Orders Found</p>)}
           </Fragment>)

}