
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



const MyInput = ({ field, form, ...props }) => {
  return <input {...field} {...props} />;
};

const App = () => {

  const [ui, setUi] = useState(null);
  const [componentsObjs, setComponentObjs] = useState(null);
  const [componentsTags, setComponentTags] = useState([]);
  const [component, setComponent] = useState(null);
  const [arrayofComps, setArrayofComps] = useState([]);
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



  useEffect(() => {
    console.log("componentsObjs", componentsObjs)
    let temp = componentsObjs?.map((elem, id) => {
      console.log("mapper", elem);
      if (elem.field != "button") {
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
    setArrayofComps(temp);
    setArrayofButtons(temp2);
    console.log("array of component objects", temp);
    console.log("array of temp2 ", temp2)
  }, [componentsObjs])

  useEffect(() => {
    console.log("Array of components", arrayofComps);
    console.log("Array of Buttons", arrayofButtons);
  }, [arrayofComps, arrayofButtons])

  const getfunc = {
    "ASd": FormControl
  }

  return (
    <div>

      <Formik
        initialValues={{ email: '', email2: '' }}
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
              arrayofComps && arrayofButtons.length &&
              (
                <>
                  {console.log("values in values cc", props.values)}
                  <Field
                    {...arrayofComps[0]?.props}
                    // name="email"
                    onChange={(e) => props.setFieldValue(arrayofComps[0]?.props.name,e.target.value)}
                    component={arrayofComps[0]?.function} />
                  {/* { arrayofButtons[0].function({events:arrayofButtons[0].events,props:arrayofButtons[0].props},arrayofButtons[0].children)} */}
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