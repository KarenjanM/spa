import Link from "next/link"
import SubmitButton from "../../buttons/SubmitButton"
import { FC, InputHTMLAttributes } from "react"
import { useTokenCreateMutation } from "../../../../generated/graphql"
import { useAppDispatch } from "../../../redux/hooks"
import { setTokens } from "../../../redux/auth.slice"
import React from "react"
import { useForm } from "react-hook-form"
import { AuthForm } from "./AuthForm"

interface LoginData {
    email: string,
    password: string
}

export default function LoginForm() {
    const dispatch = useAppDispatch();
    const { register, handleSubmit } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    });
    const [tokenCreateMutation] = useTokenCreateMutation({
        variables: {
            email: "",
            password: ""
        }
    });

    // handling onSubmit in LoginForm
    function onSubmit(data: LoginData) {
        // creating a token with the according mutation callback and then saving it to the local storage
        tokenCreateMutation({ variables: { ...data } }).then(({ data }) => {
            dispatch(setTokens({
                userToken: data.tokenCreate.token,
                refreshToken: data.tokenCreate.refreshToken
            }));
        });
    }

    return (
        <AuthForm onSubmit={handleSubmit(onSubmit)}>
            <div className="text-3xl tracking-wide">
                Login
            </div>
            <div className="flex flex-col gap-4">
                <AuthInput minLength={3} placeholder="E-Mail" {...register("email")} type={"email"} />
                <AuthInput placeholder="Passwort" {...register("password")} type={"password"} />
                <Link href="/login/request_reset" className="underline text-sm self-start hover:underline">
                    Hast du dein Passwort vergessen?
                </Link>
            </div>
            <div className="flex flex-col grow-0 justify-center gap-4">
                <SubmitButton>Anmelden</SubmitButton>
                <Link href="/register" className="underline text-sm hover:underline">
                    Konto erstellen
                </Link>
            </div>
        </AuthForm>
    )
}


type AuthInputProps = InputHTMLAttributes<HTMLInputElement>

export const AuthInput: FC<AuthInputProps> = React.forwardRef<HTMLInputElement, AuthInputProps>(({ ...props }, ref) => {
    return (
        <input {...props} className="focus:outline-none px-5 py-3 border border-gray-400 text-black" ref={ref}>
        </input>
    )
})