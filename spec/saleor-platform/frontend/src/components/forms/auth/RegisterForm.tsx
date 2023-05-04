import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SubmitButton from "../../buttons/SubmitButton"
import { AuthInput } from "./LoginForm"
import { useAccountRegisterMutation } from "../../../../generated/graphql";
import { useForm } from "react-hook-form"
import { AuthForm } from "./AuthForm";


export default function RegisterForm({ setShow, setAlertText }) {
    const router = useRouter();
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        if (success)
            router.push("/register/success");
    }, [success])
    const [accountRegister] = useAccountRegisterMutation({
        variables: {
            input: {
                email: "",
                password: "",
                channel: "default-channel",
                redirectUrl: `${window.location.href}/email_confirm`
            }
        }
    })
    const { register, handleSubmit } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        }
    });
    async function onSubmit(formData) {
        const data = await accountRegister({
            variables: {
                input: {
                    ...formData,
                    channel: "default-channel",
                    redirectUrl: `${window.location.href}/email_confirm`
                }
            }
        });
        setSuccess(true);
        if (data.data.accountRegister.errors.length > 0) {
            setSuccess(false)
            setShow(true)
            setAlertText(data.data?.accountRegister?.errors[0]?.message)
        }
    }
    return (
        <AuthForm onSubmit={handleSubmit(onSubmit)}>
            <div className="text-3xl tracking-wide">
                Konto erstellen
            </div>
            <div className="flex flex-col gap-4">
                <AuthInput minLength={2} placeholder="First Name" {...register("firstName")} type={"text"} />
                <AuthInput minLength={2} placeholder="Last Name" {...register("lastName")} type={"text"} />
                <AuthInput minLength={3} placeholder="E-Mail" {...register("email")} type={"email"} />
                <AuthInput minLength={8} placeholder="Passwort" {...register("password")} type={"password"} />
            </div>
            <div className="flex flex-col grow-0 justify-center gap-4">
                <SubmitButton>Erstellen</SubmitButton>
            </div>
        </AuthForm>
    )
}