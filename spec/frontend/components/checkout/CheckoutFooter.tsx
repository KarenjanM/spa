import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import SkyButton from "../buttons/SkyButton";

export default function CheckoutFooter({back, forward, className=""}) {

    return (
        <div className={`${className} flex flex-row justify-between place-items-center`}>
            <Link href={'/cart'} className="flex flex-row gap-3 text-sky-700 hover:text-sky-600">
                <ChevronLeftIcon className="w-4 h-4 self-center" />
                <div>Zurück {back}</div>
            </Link>
            <SkyButton className="self-end">Weiter {forward}</SkyButton>
        </div>
    )
}