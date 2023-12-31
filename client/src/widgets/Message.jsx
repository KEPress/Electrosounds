import React from 'react'
import { Alert } from 'react-bootstrap'

export const Message = (props) => {

  return (<>
            <Alert variant={props.variant || 'info'}>{props.children}</Alert>    
        </>)

}
