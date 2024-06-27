import React from 'react'
import Form from 'react-bootstrap/Form';
const FormControl = (props) => {
    console.log("props in form",props)
    return (
        <Form.Control {...props} />

    )
}

export default FormControl