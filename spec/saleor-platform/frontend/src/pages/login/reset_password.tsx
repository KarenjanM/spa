import { shouldEmitLegacyCommonJSImports } from "@graphql-codegen/cli";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useSetPasswordMutation } from "../../../generated/graphql";
import AuthAlert from "../../components/Alert";
import SubmitButton from "../../components/buttons/SubmitButton";
import { AuthForm } from "../../components/forms/auth/AuthForm";
import { AuthInput } from "../../components/forms/auth/LoginForm";

interface PasswordResetInterface {
    password: string, 
    confirmPassword: string
}

export default function ResetPassword() {
    const [setPasswordMut] = useSetPasswordMutation();
    const router = useRouter();
    const {email, token} = router.query;
    const [showAlert, hideAlert] = useState<boolean>(false);
    const { register, handleSubmit, watch, formState: {errors} } = useForm<PasswordResetInterface>({
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
    })
    function handleClick(data: PasswordResetInterface) {
        setPasswordMut({
            variables: {
                email: email as string, 
                token: token as string,
                password: data.confirmPassword
            }
        })
    }   
    return (
        <div>
            <AuthAlert
             show={showAlert}
             text={errors?.confirmPassword?.message}
             hide={()=>hideAlert(false)}
             />
            <AuthForm onSubmit={handleSubmit(handleClick)}>
                <AuthInput {...register("password", {required: true})} placeholder="Password"/>
                <AuthInput
                {...register("confirmPassword", {required: true,
                validate: (val: string)=>watch("password") !== val && "Ihre Passwörte stimmen nicht überein!"})}
                placeholder="Confirm your password"/>
                <SubmitButton>Passwort zurücksetzen</SubmitButton>
            </AuthForm>
        </div>
    )
}