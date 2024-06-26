const express=require("express");
const cors=require("cors");
const app=express();


app.use(cors());



app.get("/",(req,res)=>{
    res.json({
      sublayout: {
            type:"form",
            components:[
                {
                    field:"input",
                    type:"text",
                    props:{
                        placeholder:"Enter the name",
                    }
                },
                {
                    field:"button",
                    name:"Submit"
                }
            ]
        }
    })
})



app.listen(3000,()=>{
    console.log("running on port ",3000);
})