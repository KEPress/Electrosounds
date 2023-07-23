import React, { Fragment, Suspense } from 'react'
import { Helmet } from 'react-helmet'
import { ToastContainer } from 'react-toastify'
import { json, defer, useLoaderData, Await  } from 'react-router-dom'
import { Display } from '../../widgets/display/Display'
import { Loading } from '../../widgets/Loading'
import { Footer } from '../../widgets/footer/Footer'
import axios from 'axios'
import './Home.scss'

export const loadProducts = async () => {
    try {
        const response = await axios.get(`/products`)
        return response.data
    } catch (error) {
       throw json({ message: error}, { status: 500})
    }
}

export const loader = () => {
    return defer({ products: loadProducts() })
}

export const Home = () => {

  const { products } = useLoaderData()

  return (
    <Fragment>
      <Helmet>
        <title>Home | Electro Sounds </title>
      </Helmet>
      <ToastContainer position={'bottom-center'} limit={1} />
      <main>
        <div className="main-content">

          <h1>List of Products</h1>
          <Suspense fallback={<Loading /> }>
            <Await resolve={products}>
              {(loadProducts) => <Display products={loadProducts} />}
            </Await>
          </Suspense>
          <Footer />
        </div>
      </main>
    </Fragment>
  );

}
