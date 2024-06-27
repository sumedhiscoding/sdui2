
import React, { useState, useEffect } from 'react'
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { mapper } from './utils/mapper';
import * as Components from "react-bootstrap";
import { mapperComponents } from './utils/mapper';
import { Field, Form, Formik } from 'formik';
import FormControl from './components/FormControlModified';


 
const MyInput = ({ field, form, ...props }) => {
  return <input {...field} {...props} />;
};

const App = () => {

  const [ui, setUi] = useState(null);
  const [componentsObjs, setComponentObjs] = useState(null);
  const [componentsTags, setComponentTags] = useState([]);
  const [component, setComponent] = useState(null);
  const [arrayofComps, setArrayofComps] = useState([]);
  const [arrayofButtons,setArrayofButtons]=useState([]);
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


  useEffect(() => {
    const temp2 = ui?.sublayout.components;
    console.log("temp2", temp2);
    setComponentObjs(ui?.sublayout.components)



  }, [ui])



  useEffect(() => {
    console.log("componentsObjs", componentsObjs)
    let temp = componentsObjs?.map((elem, id) => {
      console.log("mapper", elem);
      if(elem.field!="button")
      return mapper(elem.field)(elem.props, elem.children)
    }).filter((elem,id)=>{
      if(elem!=undefined){
        return elem
      }
    })

    let temp2= componentsObjs?.map((elem,idx)=>{
      if(elem.field=="button")
      return mapper(elem.field)(elem.props, elem.children)
    }).filter((elem)=>{
      return elem!=undefined
    })
    // console.log("mapper",mapper("input"));
    setArrayofComps(temp);
    setArrayofButtons(temp2);
    console.log("array of component objects", temp);
    console.log("array of temp2 ", temp2)
  }, [componentsObjs])

  useEffect(() => {
    console.log("Array of components", arrayofComps);
    console.log("Array of Buttons",arrayofButtons);
  }, [arrayofComps,arrayofButtons])

  return (
    <div>

      <Formik
        initialValues={{ email: '',email2:'' }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {(props) => (
          <Form>
            {/* {arrayofComps && arrayofComps.map((elem, id) => {
              // if(elem.)
              return (<Field key={id} component={elem}/>)
            })} */}
            {/* <Field name="email" placeholder="Doe" component={FormControl}  /> */}

            {
            //  arrayofComps && arrayofComps.map((elem)={
            //   return (<Field name /> );
            //  })
            }
          {arrayofComps &&
            // <Field name="email" placeholder="DOe" component={arrayofComps[0]}/>
            <Field name="email2" placeholder="DOe1"  component={MyInput} />
          }  
                {
                  arrayofComps &&
                  // console.log("myINput",MyInput, typeof(MyInput))
                  console.log("arrayofComp",arrayofComps[0],typeof(arrayofComps[0]))
                }
          </Form>)}

      </Formik>

    </div>
  )
}

export default App