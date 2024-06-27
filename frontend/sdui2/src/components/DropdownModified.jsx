import React ,{useState}from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import axios from "axios"
const DropdownModified = (properties, children) => {
    const [datafromApi,setDataFromApis]=useState([]);
    
    
    console.log("properties in dropdown", properties)
    const { props, events } = properties;


    const handleMouseEnter=()=>{
        console.log("HI");
    }
    
    const handleOnClick=(args)=>{
        try{
            axios.get("http://localhost:3000/companies").then(res=>{
                console.log(res.data.companies);
                setDataFromApis(res.data.companies);                
            }).catch(err=>console.log(err))
        }
        catch(err){
            console.log(err)
        }

    }
    const eventHandlers = {
        onClick: () => handleOnClick() || null,
        onMouseEnter: () => handleMouseEnter() || null,
    }


    return (
        <div>
            <DropdownButton {...eventHandlers} {...props}>
               {
                datafromApi &&
                 datafromApi.map((elem,id)=>{
                    return (<Dropdown.Item>{elem}</Dropdown.Item>)
                 })
               }
            </DropdownButton >
        </div>
    )
}

export default DropdownModified