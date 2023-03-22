import { setTokensNull, logout } from "../redux/auth.slice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useTokenDeactivateMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import { useApolloClient } from "@apollo/client";
import { useEffect, useState } from "react";

export default function useLogOut(){
    const [endData, setData] = useState(false)
    const auth = useAppSelector((state)=>state.auth)
    const dispatch = useAppDispatch();
    const router = useRouter();
    const client = useApolloClient();
    const [tokenDeactivateMutation] = useTokenDeactivateMutation();
    function logOut(){
        dispatch(logout());
        setData(true);
        console.log("LOGGED OUT");
        router.back();
    }
    useEffect(()=>{
        if(auth.loggedIn)
            tokenDeactivateMutation()
            .then(logOut)
            .catch((e) =>{
                console.log(e);
                logOut()
            })
    }, [auth.loggedIn])
    


    return endData
}