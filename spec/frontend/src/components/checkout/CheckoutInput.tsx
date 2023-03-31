import React, { FC, InputHTMLAttributes, useState } from "react";

type CheckoutInputProps = InputHTMLAttributes<HTMLInputElement>

export const CheckoutInput: FC<CheckoutInputProps> = React.forwardRef<HTMLInputElement, CheckoutInputProps>(({...props}, ref)=>{
    const [show, setShow] = useState(false);
    
    function showLabel(e){
        if(e.target.value){
            setShow(true)
        }
        else{
            setShow(false)
        }
    }
    return (
        <div className="flex grow relative">
            <label htmlFor={props.placeholder} className="text-xs text-stone-500 absolute top-0 left-2">
                {show && props.placeholder}
            </label>
            <input ref={ref} {...props} onChange={(e)=>{props.onChange(e); showLabel(e)}} className={`${props.className} grow border border-gray-2 rounded py-3 px-3 focus:outline-2 focus:outline focus:outline-sky-600 placeholder:text-stone-500 placeholder:text-sm`}>
            </input>
        </div>
    )
})