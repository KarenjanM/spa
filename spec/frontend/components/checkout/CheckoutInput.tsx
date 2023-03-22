import { useState } from "react";

export function CheckoutInput({type="text", placeholder="", className="", value=null, setDisabled=(arg)=>{}, onChange}){
    const [show, setShow] = useState(false);
    
    function showLabel(e){
        if(e.target.value){
            setShow(true)
            setDisabled(false)
            onChange(e.target.value);
        }
        else{
            setShow(false)
            setDisabled(true)
        }
    }
    return (
        <div className="flex grow relative">
            <label htmlFor={placeholder} className="text-xs text-stone-500 absolute top-0 left-2">
                {show && placeholder}
            </label>
            <input id={placeholder} required={type=="tel" ? false : true} defaultValue={value} type={type} placeholder={placeholder} className={`${className} grow border border-gray-2 rounded py-3 px-3 focus:outline-2 focus:outline focus:outline-sky-600 placeholder:text-stone-500 placeholder:text-sm`} onChange={showLabel}>
            </input>
        </div>
    )
}