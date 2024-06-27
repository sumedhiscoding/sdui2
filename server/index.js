const express = require("express");
const cors = require("cors");
const app = express();


app.use(cors());

app.get("/button", (req, res) => {
    res.json({
        sublayout: {
            type: "form",
            components: [
                {
                    field: "button",
                    props: {
                        variant: "secondary",
                        size: "lg",
                        // disabled: "true",
                    },
                    children: "Fetch Data",
                    events: [
                        {
                            event_name: "onClick",
                            event_data: {
                                event_type: "data-fetching",
                                endpoint: "http://localhost:3000/endpoint",

                            }
                        }
                       
                    ]
                }
            ]
        }
    })
})

app.get("/", (req, res) => {
    res.json({
        sublayout: {
            type: "form",
            components: [
                {
                    field: "input",
                    props: {
                        name: "email",
                        type: "email",
                        placeholder: "Enter the name",
                    },
                    validations: {
                        required: true,

                    }
                },
                {
                    field:"dropdown",
                    props:{
                        title:"Company",
                    },
                    events:[
                        {
                            event_name:"useEffect",
                            event_data:{
                                event_type:"data fetching",
                                endpoint:"http://localhost:3000/companies"
                            }
                        }
                    ]
                },
                {
                    field:"dropdown",
                    props:{
                        title:"Plans",
                        disabled:true
                    },
                    events:[
                        {
                            event_name:"useEffect",
                            event_data:{
                                event_type:"open_modal",
                                endpoint:"http://localhost:3000/plans"
                            }
                        }
                    ]
                },
                {
                    field: "button",
                    props: {
                        type: "submit"
                    },
                    children: "Submit"
                },
                {
                    field: "button",
                    props: {
                        variant: "secondary",
                        size: "md",
                        // disabled: "true",
                    },
                    children: "Fetch Data",
                    events: [
                        {
                            event_name: "onClick",
                            event_data: {
                                event_type: "data-fetching",
                                endpoint: "http://localhost:3000/endpoint",

                            }
                        }
                       
                    ]
                }

            ]
        }
    })
})

app.get("/endpoint", (req, res) => {
    res.json({ message: "Hi this is my endpoints" });
})

app.get('/companies',(req,res)=>{
    res.json({companies:[
        "Tata",
        "ABC",
        "FireFox",
        "Google",
    ]})
})





app.listen(3000, () => {
    console.log("running on port ", 3000);
})

