import { useEffect } from "react"
import { useAppSelector } from "../redux/hoooks"

export default function Auth({children}){
    const userToken = useAppSelector((state)=> state.auth.userToken)
    useEffect(()=>{
        if (localStorage.getItem('token') != userToken && userToken != null)
            localStorage.setItem('token', userToken)
    })
    return (
        <>
        {children}
        </>
    )
}