import { useRouter } from "next/router";
import { useState } from "react";
import { useAppSelector } from "../../redux/hoooks";
import SubmitButton from "../buttons/SubmitButton"
import { AuthInput } from "./LoginForm"
import { useAccountRegisterMutation } from "../../generated/graphql";

export default function RegisterForm(){
    const auth = useAppSelector((state)=>state.auth);
    const router = useRouter();
    const [accountRegister] = useAccountRegisterMutation({
        variables: {
            input: {
                email: "",
                password: "",
                channel: "default-channel"
            }
        }
    })
    const [formState, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    function handleSubmit(e){
        e.preventDefault()
        accountRegister({
            variables: {
                input: {
                    ...formState,
                    channel: "default-channel",
                    redirectUrl: "http://localhost:3002"
                }
            }
        }).then(({data}) => console.log(data.accountRegister.user))
        router.push("/login")
    }
    return(
        <form action="#" className="flex flex-col gap-6 self-center text-center py-20 px-40 " onSubmit={handleSubmit}>
            <div className="text-3xl tracking-wide">
            Konto erstellen
            </div>
            <div className="flex flex-col gap-4">
                <AuthInput placeholder="First Name" onChange={(e)=>setForm({...formState, firstName: e.target.value})} type={"text"}/>
                <AuthInput placeholder="Last Name" onChange={(e)=>setForm({...formState, lastName: e.target.value})} type={"text"}/>
                <AuthInput placeholder="E-Mail" onChange={(e)=>setForm({...formState, email: e.target.value})} type={"email"}/>
                <AuthInput placeholder="Passwort" onChange={(e)=>setForm({...formState, password: e.target.value})} type={"password"}/>
            </div>
            <div className="flex flex-col grow-0 justify-center gap-4">
            <SubmitButton text={"Erstellen"}/>
            </div>
        </form>
    )
}