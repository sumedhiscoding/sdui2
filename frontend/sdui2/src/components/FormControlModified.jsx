import React from 'react'
import Form from 'react-bootstrap/Form';
const FormControl = (properties) => {
    const{props,events}=properties
    console.log("props in form",props)
    return (
        <Form.Control {...props} />

    )
}

export default FormControl