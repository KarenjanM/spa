import { useRouter } from "next/router";
import { useMemo, useState } from "react";
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
    const { email, token } = router.query;
    const { register, handleSubmit, watch, formState: { errors } } = useForm<PasswordResetInterface>({
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
    })
    const [showAlert, setShowAlert] = useState<boolean>(false);

    useMemo(() => {
        setShowAlert(!!errors?.confirmPassword?.message)
    }, [errors?.confirmPassword?.message])

    function onSubmit(data: PasswordResetInterface) {
        setPasswordMut({
            variables: {
                email: email as string,
                token: token as string,
                password: data.confirmPassword
            }
        }).then((data) => {
            console.log("setPasswordMut");
            console.log(data)
        })
        router.push("/")
    }
    return (
        <div>
            <AuthAlert
                show={showAlert}
                text={errors?.confirmPassword?.message}
                hide={() => setShowAlert(false)}
            />
            <AuthForm onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-3">
                    <div className="text-2xl">
                        Reset your password:
                    </div>
                    <div className="text-sky-700">
                        Note that your passwords must match
                    </div>
                </div>
                <AuthInput {...register("password", { required: true })} type="password" placeholder="Password" />
                <AuthInput
                    {...register("confirmPassword", {
                        required: true,
                        validate: (val: string) => watch("password") !== val ? "Ihre Passwörte stimmen nicht überein!" : true
                    })}
                    type="password"
                    placeholder="Confirm your password" />
                <SubmitButton>Passwort zurücksetzen</SubmitButton>
            </AuthForm>
        </div>
    )
}