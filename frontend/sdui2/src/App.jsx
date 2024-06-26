
import React,{useState,useEffect} from 'react'
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { mapper } from './utils/mapper';
import * as Components from "react-bootstrap";
import { mapperComponents } from './utils/mapper';


const App = () => { 

  const [ui,setUi]=useState(null);
  const [componentsObjs,setComponentObjs]=useState(null);
  const [componentsTags,setComponentTags]=useState([]);
  const [component,setComponent]=useState(null);
  const [arrayofComps,setArrayofComps]=useState([]);
  
  // useEffect to call our meta json 
  useEffect(() => {
    const url = "http://localhost:3000"
    try {
      axios.get(url).then((res) => {
        console.log(res.data);
        setUi(res.data);
      }).catch((err) => {
        console.log(err)
      })
    }
    catch (err) {
      console.log(err);
    }
  }, [])


  useEffect(()=>{
    const temp2=ui?.sublayout.components;
    console.log("temp2",temp2);
    setComponentObjs(ui?.sublayout.components)
   


  },[ui])

  useEffect(()=>{
    console.log("componentsObjs",componentsObjs)
    let temp=componentsObjs?.map((elem,id)=>{
      console.log("mapper",elem);
      return mapper(elem.field)(elem.props,elem.children)
    })
    // console.log("mapper",mapper("input"));
    setArrayofComps(temp);
    console.log("array of component objects",temp);

  },[componentsObjs])

  useEffect(()=>{
    console.log("Array of components",arrayofComps);
  },[arrayofComps])

  return (
    <div>
      {/* {mapperComponents[0].tag}
      {mapperComponents[2].tag} */}
      
     {arrayofComps && arrayofComps.map((elem,id)=>{
      return (<React.Fragment key={id}>{elem}</React.Fragment>)
     })}


    </div>
  )
}

export default App