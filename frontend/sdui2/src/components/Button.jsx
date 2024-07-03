import React from 'react'
import { Button } from 'react-bootstrap'



const ButtonControl = (props, children) => {
  console.log("button Control", props)
  const events = props.events;
  const properties = props.props

  const handleClick = (args) => {
    console.log("handle Clicked", args);

  };

  const handleMouseEnter = () => {
    // console.log('Mouse entered button!');
    // Additional logic for mouse enter event
  };

  const eventHandlers = {
    onClick: ()=> handleClick(events?.find((elem)=>elem.event_name=="onClick")?.event_data) || null,
    onMouseEnter: ()=>handleMouseEnter(events?.find((elem)=>elem?.event_name=="onMouseEnter")?.event_data) || null,
  };
  return (
    <>
      {/* {console.log("onclick ",{)} */}
      <Button {...eventHandlers}  {...properties} >{children} </Button>
    </>
  )
}

export default ButtonControl