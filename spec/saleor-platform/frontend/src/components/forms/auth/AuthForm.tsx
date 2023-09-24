import React, { FC, FormHTMLAttributes } from "react"

type AuthFormProps = FormHTMLAttributes<HTMLFormElement>

export const AuthForm: FC<AuthFormProps> = React.forwardRef<HTMLFormElement, AuthFormProps>(({...props},ref)=>{
    return(
        <form {...props} 
        ref={ref}
        className={`${props.className} flex flex-col gap-6 self-center text-center py-20 px-20 md:px-40 lg:px-80`}>
        </form>
    )
});