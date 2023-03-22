import { useEffect } from "react";
import { useRefreshTokenMutation } from "../generated/graphql";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setTokens } from "../redux/auth.slice";
import { useReactiveVar } from "@apollo/client";
import { isRefreshNeeded } from "../apollo/auth_vars"; 

export default function RefreshToken({children}){
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state)=>state.auth);
    const [tokenRefresh] = useRefreshTokenMutation();
    const refreshNeeded = useReactiveVar(isRefreshNeeded);
    useEffect(()=>{
        console.log("useEffect in RefreshToken");
        
        if(refreshNeeded){
            console.log("refresh is needed");
            
            tokenRefresh({
                variables: {
                    refreshToken: auth.refreshToken
                }
            }).then(({ data }) => {
                dispatch(setTokens({ userToken: data.tokenRefresh.token, refreshToken: auth.refreshToken }));
                console.log(data);
                isRefreshNeeded(false);
            })
        }
    }, [refreshNeeded])
    return (
        <>
        {children}
        </>
    )
} 