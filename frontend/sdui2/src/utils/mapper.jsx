import React from "react";
import FormControl from "../components/FormControlModified";
import ButtonControl from "../components/Button";
export const mapperComponents = [
    {
        name: "input",
        tag: FormControl,
    },
    {
        name: "textarea",
        tag: FormControl,

    },
    {
        name: "button",
        tag: ButtonControl,
    }

]

export const mapper = (name) => {
    console.log("name", name,typeof(name));
    const elem = mapperComponents.find((elem, id) => {
        return elem.name == String(name);
    })
    console.log("elem tag is",elem.tag)
    return elem.tag;
}



