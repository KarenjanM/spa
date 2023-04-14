import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { useRequestResetPasswordMutation } from "../../../generated/graphql";
import AuthAlert from "../../components/Alert";
import SubmitButton from "../../components/buttons/SubmitButton";
import { AuthForm } from "../../components/forms/auth/AuthForm";
import { AuthInput } from "../../components/forms/auth/LoginForm";

export default function ResetPassword(){
    const [requestPasswordReset, {error}] = useRequestResetPasswordMutation();
    const [showAlert, hideAlert] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const router = useRouter();
    function handleClick(e: FormEvent){
        e.preventDefault();
        requestPasswordReset({
            variables: {
                email: email, 
                redirectUrl: "http://localhost:3002/login/reset_password"     
            }
        });
        if(!error)
            router.push("/login/request_success")
    }
    return(
        <AuthForm onSubmit={(e)=>handleClick(e)}>
            <AuthAlert
             show={showAlert}
             text={error?.message}
             hide={()=>hideAlert(false)}
             />
            <AuthInput required={true} minLength={3} placeholder="E-Mail" onChange={(e)=>setEmail(e.target.value)} type={"email"} />
            <SubmitButton>Email senden</SubmitButton>
        </AuthForm>
    )
}