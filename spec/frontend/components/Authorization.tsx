import { useRouter } from "next/router";
import { useEffect } from "react"
import {  useAppSelector } from "../redux/hooks"

export default function Authorization({children}){
    const router = useRouter();
    const auth = useAppSelector((state)=>state.auth);

    useEffect(() => {
        if (!auth.loggedIn) {
            router.push("/login")
        }
    }, [auth.loggedIn])
    return (
        <>
        {children}
        </>
    )
}