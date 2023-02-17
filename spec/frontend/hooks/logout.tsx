import { setTokensNull, logout } from "../redux/auth.slice";
import { useAppDispatch, useAppSelector } from "../redux/hoooks";
import { useTokenDeactivateMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import { useApolloClient } from "@apollo/client";
import { useState } from "react";

export default function useLogOut(){
    const [endData, setData] = useState(false)
    const auth = useAppSelector((state)=>state.auth)
    const dispatch = useAppDispatch();
    const router = useRouter();
    const client = useApolloClient();
    const [tokenDeactivateMutation, {data, loading, error}] = useTokenDeactivateMutation();
    tokenDeactivateMutation()
    .then(() => {
        dispatch(logout());
        dispatch(setTokensNull());
        setData(true)
        console.log("LOGGED OUT");
        client.resetStore();
        router.push('/login');
        })
    .catch((e)=> console.log(e))

    return endData
}