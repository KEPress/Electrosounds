import React, { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Navigate } from '../../widgets/navigate/Navigate'

export const Root = () => {
  
    return (<Fragment>
               <Navigate />
                <Container className='mt-3'>
                  <Outlet />
                </Container>
           </Fragment>)
}
