import React from 'react'
import { Button } from 'react-bootstrap'



const ButtonControl = (props,children) => {
  return (
    <Button {...props} >{children}</Button>
  )
}

export default ButtonControl