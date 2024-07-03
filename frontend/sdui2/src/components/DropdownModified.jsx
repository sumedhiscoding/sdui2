import React, { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import axios from "axios"
import FormControl from './FormControlModified';
const DropdownModified = (properties, children) => {
    const [datafromApi, setDataFromApis] = useState([]);
    const { props, events,...rest } = properties;
    const [conditionalrendered, setConditionalRendered] = useState(props?.conditional_rendered);
    console.log("conditionalrendered", conditionalrendered)
    console.log("properties in dropdown", properties)
    console.log("events in dropdown", events);

    const handleMouseEnter = () => {
    }

    const handleOnClick = (args) => {
        console.log("args", args)
        try {
            axios.get(args.endpoint).then(res => {
                console.log(res.data);
                setDataFromApis(res.data);
            }).catch(err => console.log(err))
        }
        catch (err) {
            console.log(err)
        }

    }
    const eventHandlers = {
        onClick: () => handleOnClick(events?.find((elem) => elem.event_name == "onClick")?.event_data) || null,
        onMouseEnter: () => handleMouseEnter() || null,
    }


    return (
        <div>
                <DropdownButton   {...props} title={rest.field.value ? rest.field.value  : props.title} {...eventHandlers}  disabled={conditionalrendered}  >
                    {
                        datafromApi?.map((elem) => {
                            return <Dropdown.Item onClick={() =>{
                                    console.log("options value",elem.id)
                                rest.form.setFieldValue(props.title, elem.id)}}  value={elem.id}>{elem.name}</Dropdown.Item>
                        })
                    }
                </DropdownButton >
        </div>
    )
}

export default DropdownModified