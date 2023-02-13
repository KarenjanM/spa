import { useEffect, useState } from "react";
import { useTokenVerifyMutation } from "../generated/graphql";
import { verify } from '../redux/auth.slice';
import { useAppDispatch } from "../redux/hoooks";

interface optionsInterface {
    auth: {
        userToken?: string
        isVerified: boolean
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
    if(!options.auth.isVerified && options.auth.userToken )
        tokenVerifyMutation()
            .then(({data})=> {
                    setData(data.tokenVerify.isValid)
                    dispatch(verify(data.tokenVerify.isValid))
                }) 
    return data
}