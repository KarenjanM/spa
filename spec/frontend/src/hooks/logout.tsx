import { logout } from "../redux/auth.slice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useTokenDeactivateMutation } from "../../generated/graphql";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { CheckoutContext } from "../contexts/checkoutContext";

export default function useLogOut(){
    const [endData, setData] = useState(false);
    const auth = useAppSelector((state)=>state.auth);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const {resetCheckoutId} = useContext(CheckoutContext);
    const [tokenDeactivateMutation] = useTokenDeactivateMutation();
    function logOut(){
        dispatch(logout());
        setData(true);
        console.log("LOGGED OUT");
        router.back();
        resetCheckoutId();
    }
    useEffect(()=>{
        if(auth.loggedIn)
            tokenDeactivateMutation()
            .then(()=>{
                console.log("Logging out");
                logOut();
            })
            .catch((e) =>{
                console.log("Error by logging out");
                console.log(e);
                logOut();
            })
    }, [auth.loggedIn])
    


    return endData
}