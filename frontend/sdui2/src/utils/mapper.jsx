import React from "react";
import FormControl from "../components/FormControlModified";
import ButtonControl from "../components/Button";
export const mapperComponents = [
    {
        name: "input",
        tag: FormControl({type:"text"}),
        attributes: {
            type: "text",
        }
    },
    {
        name: "textarea",
        tag: FormControl({type:"textarea"}),
        attributes: {
            type: "textarea",
        }
    },
    {
        name:"button",
        tag:ButtonControl("Submit"),
        
        
    }

]


export const mapper=(name)=>{
    console.log("name",name);
    const elem= mapperComponents.find((elem,id)=>{
        return elem.name==String(name);
     }) 
     return elem.tag;
}



