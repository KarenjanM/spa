import Link from "next/link";
import { useState } from "react";
import { User } from "../../generated/graphql";
import { useAppSelector } from "../../redux/hooks";
import { CheckoutInput } from "../checkout/CheckoutInput";

export default function ContactForm({ user, setEmail, email }: {user: User, setEmail, email}) {
    const auth = useAppSelector((state) => state.auth);
    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between">
                <div className="text-xl self-start">Kontaktinformation</div>
                {!auth.loggedIn && <div className="text-sm self-center">Hast du bereits ein Konto? <Link href={'/login'} className="text-sky-700">Anmelden</Link></div>}
            </div>
            {auth.loggedIn ? (
                <div className="text-sm">
                    <div>{user?.firstName} {user?.lastName} {`(${user?.email})`}</div>
                    <Link href={'/logout'} className="text-sky-700">Ausloggen</Link>
                </div>
            ) : (
                <CheckoutInput type="email" value={email} onChange={(e)=>setEmail(e)} className="grow" placeholder="E-Mail" />
            )}
            <div className="flex flex-row gap-3">
                <CheckoutCheckbox />
                <div className="align-center text-sm text-stone-500">
                    Neuigkeiten und Angebote via E-Mail erhalten
                </div>
            </div>
        </div>
    )
}

export function CheckoutCheckbox() {
    const [checked, setChecked] = useState(false);
    return (
        <>
            <input type="checkbox" onChange={() => setChecked(!checked)} className="self-center" />
        </>
    )
}