
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
    const temp2=ui?.sublayout.components.map((elem,id)=>{
      return elem.field;
    });
    console.log("temp2",temp2);
    setComponentObjs(ui?.sublayout.components.map((elem,id)=>{
      return elem.field;
    }))
   


  },[ui])

  useEffect(()=>{
    console.log("componentsObjs",componentsObjs)
    let temp=componentsObjs?.map((elem,id)=>{
      console.log("mapper",elem);
      return mapper(elem)
    })
    // console.log("mapper",mapper("input"));
    
    console.log("array of component objects",temp);

  },[componentsObjs])


  return (
    <div>
      {mapperComponents[0].tag}
      {mapperComponents[2].tag}

    </div>
  )
}

export default App