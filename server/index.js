const express = require("express");
const cors = require("cors");
const app = express();


app.use(cors());

const plansData = {
    plansForCompanies: [
        {
            companyName: "Tata",
            plans: ["Plan A", "Plan B"]
        },
        {
            companyName: "ABC",
            plans: ["Plan C, Plan D"]
        },
        {
            companyName: "FireFox",
            plans: ["Plan E", "Plan F"]
        },
        {
            companyName: "Google",
            plans: ["Plan G", "Plan H"]
        }
    ]
}
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
                        placeholder: "Enter the email",
                    },
                    validations: {
                        required: true,

                    }
                },
                {
                    field: "input",
                    props: {
                        name: "lastname",
                        type: "text",
                        placeholder: "Enter the lastname",
                    },
                    validations: {
                        required: true,

                    }
                },
                {
                    field: "dropdown",
                    props: {
                        title: "Company",
                        conditional_rendered:false
                    },
                    events: [
                        {
                            event_name: "onClick",
                            event_data: {
                                event_type: "data fetching",
                                endpoint: "http://localhost:3000/companies"
                            }
                        }
                    ]
                },
                {
                    field: "dropdown",
                    props: {
                        title: "Plans",
                        conditional_rendered:true
                        // disabled:true
                    },
                    condition:{
                        Company:true
                    },
                    events: [
                        {
                            event_name: "onClick",
                            event_data: {
                                event_type: "open_modal",
                                endpoint: "http://localhost:3000/plans"
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

                            },
                            event_res_data_name: "plans"
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

app.get('/companies', (req, res) => {
    res.json([
        {
            name: "Tata",
            id: 123,
        },
        {
            name: "ABC",
            id: 1234,

        },
        {
            name: "FireFox",
            id: 12345,

        },
        {
            name: "Google",
            id: 12367,
        },
    ])
})

app.get('/plans', (req, res) => {
    // res.json(getPlansByCompanyName(req.body.companyName))

    res.json([
        {name:"Plan A", id:1},
        {name:"Plan B", id:2},
        {name:"Plan C", id:3},
        {name:"Plan D", id:4},
    ])


})


function getPlansByCompanyName(companyName) {
    return plansData.find((data) => data.companyName == companyName).plans;
}



app.listen(3000, () => {
    console.log("running on port ", 3000);
})

