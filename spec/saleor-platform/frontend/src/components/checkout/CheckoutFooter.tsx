import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import SkyButton from "../buttons/SkyButton";

export default function CheckoutFooter({back, forward, link, className="", disabled=false} : {back: string, forward: string, link: string, className?: string, disabled?: boolean}) {

    return (
        <div className={`${className} flex flex-row justify-between place-items-center`}>
            <Link href={link} className="flex flex-row gap-3 text-sky-700 hover:text-sky-600">
                <ChevronLeftIcon className="w-4 h-4 self-center" />
                <div>Zurück {back}</div>
            </Link>
            <SkyButton disabled={disabled} className="self-end">Weiter {forward}</SkyButton>
        </div>
    )
}