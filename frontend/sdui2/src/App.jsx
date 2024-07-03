
import React, { useState, useEffect } from 'react'
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { mapper } from './utils/mapper';
import * as Components from "react-bootstrap";
import { mapperComponents } from './utils/mapper';
import { Field, Form, Formik } from 'formik';
import FormControl from './components/FormControlModified';
import ButtonControl from './components/Button';
import DropdownModified from './components/DropdownModified';


const MyInput = ({ field, form, ...props }) => {
  return <input {...field} {...props} />;
};

const App = () => {

  const [ui, setUi] = useState(null);
  const [componentsObjs, setComponentObjs] = useState(null);
  const [componentsTags, setComponentTags] = useState([]);
  const [component, setComponent] = useState(null);
  const [arrayofInputs, setarrayofInputs] = useState([]);
  const [arrayofDropDowns, setArrayofDropdowns] = useState([]);
  const [arrayofButtons, setArrayofButtons] = useState([]);
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

  const options = [
    { label: "afdsfasdf", value: "123131" },
    { label: "afdsfa", value: "13231231" },
    { label: "aadkfjbadjfb", value: "1210293" },
    { label: "afdsfasdf", value: "123131" }
  ]


  useEffect(() => {
    console.log("componentsObjs", componentsObjs)
    let temp = componentsObjs?.map((elem, id) => {
      console.log("mapper", elem);
      if (elem.field == "input") {
        console.log("sumedh", mapper(elem.field))
        return { function: mapper(elem.field), props: elem.props, children: elem.children, events: elem.events }
        // (elem.props, elem.children)
      }
    }).filter((elem, id) => {
      if (elem != undefined) {
        return elem
      }
    })

    let temp2 = componentsObjs?.map((elem, idx) => {
      if (elem.field == "button")
        return { function: mapper(elem.field), props: elem.props, children: elem.children, events: elem.events }
    }).filter((elem) => {
      return elem != undefined
    })

    let temp3 = componentsObjs?.map((elem, id) => {
      if (elem.field == "dropdown")
        return { function: mapper(elem.field), props: elem.props, children: elem.children, events: elem.events }
    }).filter(elem => {
      return elem != undefined
    })

    setarrayofInputs(temp);
    setArrayofButtons(temp2);
    setArrayofDropdowns(temp3);
    console.log("array of component objects", temp);
    console.log("array of temp2 ", temp2)
  }, [componentsObjs])

  useEffect(() => {
    console.log("Array of components", arrayofInputs);
    console.log("Array of Buttons", arrayofButtons);
    console.log("Array of Dropdowns", arrayofDropDowns);
  }, [arrayofInputs, arrayofButtons, arrayofDropDowns])

  return (
    <div>

      <Formik
        initialValues={{ email: '', lastname: '', Company: "", Plans: "" }}
        onSubmit={(values, actions) => {
          console.log("values in values", values)
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {(props) => (
          <Form>
            {
              arrayofInputs && arrayofButtons.length &&
              (
                <>
                  {console.log("values in values cc", props.values)}
                  {/* {arrayofInputs &&
                    arrayofInputs.map((elem) => {
                      { console.log("elem events", elem.events) }
                      return (<Field {...{ events: elem.events, props: { ...elem?.props } }} onChange={(e) =>{ console.log("xxxx",e); props.setFieldValue(elem?.props.name, e.target.value)}} component={elem.function} />)
                    })
                  } */}
                  <Field name="email" placeholder="Enter Company Name" onChange={(e)=>{
                    console.log("aldsfnadf lkadnflasdf lakdf")
                  }} component={FormControl} />
                  {
                    arrayofDropDowns &&
                    arrayofDropDowns.map((elem) => {
                      return (<Field {...{ events: elem.events, props: { ...elem?.props } }} name="Company" component={DropdownModified} ></Field>)
                    })
                  }
                  {
                    arrayofButtons.map((elem, id) => {
                      return (<>{elem.function({ events: elem.events, props: elem.props }, elem.children)} </>)
                    })
                  }

                </>
              )

            }
          </Form>)}

      </Formik>

    </div>
  )
}

export default App