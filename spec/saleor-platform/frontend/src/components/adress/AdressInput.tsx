import React, { FC, InputHTMLAttributes } from "react"

type AddressInputProps = InputHTMLAttributes<HTMLInputElement>

export const AdressInput : FC<AddressInputProps> = React.forwardRef<HTMLInputElement, AddressInputProps>(({...props}, ref)=>{
    return(
        <input ref={ref} {...props} className={`${props.className} border border-stone-500 px-5 py-2 placeholder:text-stone-600`}>
        </input>
    )
});