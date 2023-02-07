import Link from "next/link"
import SubmitButton from "../buttons/SubmitButton"
import { useState } from "react"
import { useTokenCreateMutation } from "../../generated/graphql"
import { useAppDispatch } from "../../redux/hoooks"
import { setTokens, verify } from "../../redux/auth.slice"
import { useRouter } from "next/router"
import { useAppSelector } from "../../redux/hoooks"
import { useTokenVerifyMutation } from "../../generated/graphql";


export default function LoginForm(){
    const auth = useAppSelector((state)=>state.auth)

    const router = useRouter();
    const dispatch = useAppDispatch();
    const [emailState, setEmail] = useState("");
    const [pwdState, setPwd] = useState("");
    const [tokenCreateMutation] = useTokenCreateMutation({
        variables: {
            email: "",
            password: ""
        }
    });

    function handleSubmit(e){
        e.preventDefault()
        
        tokenCreateMutation({variables: {email: emailState, password: pwdState}}).then(({data}) => dispatch(setTokens({
            userToken: data.tokenCreate.token,
            refreshToken: data.tokenCreate.refreshToken
        })));
        

        router.push("/")
        }
        return(
            <form action="#" className="flex flex-col gap-6 self-center text-center py-20 px-40 " onSubmit={handleSubmit}>
                <div className="text-3xl tracking-wide">
                    Login
                </div>
                <div className="flex flex-col gap-4">
                    <AuthInput placeholder="E-Mail" onChange={(e)=>setEmail(e.target.value)} type={"email"}/>
                    <AuthInput placeholder="Passwort" onChange={(e)=>setPwd(e.target.value)} type={"password"}/>
                    <Link href="#" className="underline text-sm self-start hover:underline">
                        Hast du dein Passwort vergessen?
                    </Link>
                </div>
                <div className="flex flex-col grow-0 justify-center gap-4">
                <SubmitButton text={"Anmelden"}/>
                <Link href="/register" className="underline text-sm hover:underline">
                        Konto erstellen
                </Link>
                </div>
            </form>
        )
}

export function AuthInput({placeholder, onChange, type}){
    return (
    <input placeholder={placeholder} type={type} onChange={onChange} className="focus:outline-none px-5 py-3 border border-gray-400 text-black" required>
    </input>
    )
}