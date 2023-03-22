import { useEffect, useState } from "react";
import { useTokenVerifyMutation } from "../generated/graphql";
import { login } from '../redux/auth.slice';
import { useAppDispatch } from "../redux/hooks";

interface optionsInterface {
    auth: {
        userToken?: string
        loggedIn: boolean
    }
}

export function useVerify(options: optionsInterface){
    const dispatch = useAppDispatch();
    const [data, setData] = useState(false)
    const [tokenVerifyMutation] = useTokenVerifyMutation({
        variables: {
            token: options.auth.userToken
        }
    })
    if(!options.auth.loggedIn && options.auth.userToken )
        tokenVerifyMutation()
            .then(({data})=> {
                    console.log("success in useVerify");
                    
                    setData(data.tokenVerify.isValid)
                    dispatch(login())
                }) 
    return data
}