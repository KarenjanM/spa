import { useRouter } from "next/router";
import { useContext, useEffect } from "react"
import { CheckoutContext } from "../contexts/checkoutContext"

export default function CheckoutSecure({children}){
    const {checkout} = useContext(CheckoutContext);
    const router = useRouter();
    useEffect(()=>{
        if(checkout?.lines.length < 1 ){
            router.back();            
        }
    })
    return(
        <>
        {children}
        </>
    )
}