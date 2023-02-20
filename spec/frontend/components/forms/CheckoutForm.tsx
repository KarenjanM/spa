import { useState } from "react"
import { FormEvent } from "react";
import BlueButton from "../buttons/BlueButton";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Select from 'react-select'

export default function CheckoutForm({tags}){
    return(
        <div className="flex flex-col gap-2">
        {tags.map((tag)=>{
            if(tag.type === "input") return <CheckoutInput type={tag.content.type} placeholder={tag.content.placeholder}/>
            else if(tag.type === "input-pair") return (
            <div className="flex flex-row">
                <CheckoutInput type={tag.content[0].type} placeholder={tag.content[0].placeholder} className={"mr-1"}/>
                <CheckoutInput type={tag.content[1].type} placeholder={tag.content[1].placeholder}/>
            </div>
            )
            else return <CheckoutSelect options={tag.content.options}/>
        })}
        <BlueButton>Weiter zum Versand</BlueButton>
        </div>
    )
}

export function CheckoutInput({type="text", placeholder="", className=""}){
    const [show, setShow] = useState(false);
    function showLabel(e: FormEvent){
        if(e.currentTarget.nodeValue){
            setShow(true)
        }
    }
    return (
        <>
        <input type={type} placeholder={placeholder} className={`${className} border border-gray-2 rounded py-2 px-2 text-stone-500 relative`} onChange={showLabel}>
        </input>
        <div>
            {show && <span className="text-xs text-stone-500 absolute">{placeholder}</span>}
        </div>
        </>
    )
}

export function CheckoutSelect({options}){
    return (
        <Select styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderColor: state.isFocused && 'blue',
            })
          }} options={options}/>
    )
}