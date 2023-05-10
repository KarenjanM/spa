import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { Popover } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import CheckoutSidebar from "./CheckoutSidebar";
import { Checkout } from "../../../generated/graphql";

export default function CheckoutHeader({ checkout}: {checkout: Checkout}) {
    const router = useRouter();
    const currentPage = router.asPath.split("/")[2];
    const info = checkout.shippingAddress ? (<Link href={"/checkout/information"} className="text-sky-700">Information</Link>)
        : (<div className="text-stone-500">Information</div>)
    const shipping = checkout.shippingAddress ? (<Link href={"/checkout/shipping"} className="text-sky-700">Versand</Link>)
        : (<div className="text-stone-500">Versand</div>)
    const payment = checkout.shippingAddress && checkout.shippingMethod ? (<Link href={"/checkout/payment"} className="text-sky-700">Zahlung</Link>)
        : (<div className="text-stone-500">Zahlung</div>)

    return (
        <div className="flex flex-col gap-2">
            <div className="text-2xl">Kreateam</div>
            <CartPopover checkout={checkout}/>
            <div className="flex flex-row place-items-center text-xs gap-1">
                <Link href={'/cart'} className="text-sky-700">Warenkorb</Link>
                <ChevronRightIcon className="w-4 h-4" />
                {currentPage == "information" ? (<div>Information</div>)
                    : info}
                <ChevronRightIcon className="w-4 h-4" />
                {currentPage == "shipping" ? (<div>Versand</div>) : shipping}
                <ChevronRightIcon className="w-4 h-4" />
                {currentPage == "payment" ? (<div>Zahlung</div>) : payment}
            </div>
        </div>
    )
}

export function CartPopover({checkout}){
    return(
        <Popover className="lg:hidden">
                <Popover.Button className="w-full text-start text-sky-700 hover:underline hover:underline-offset-2 focus:outline-none bg-stone-200 px-5 py-2">
                    <FontAwesomeIcon icon={faCartShopping} /> Bestellzusammenfassung anzeigen <FontAwesomeIcon width={10} height={10} icon={faChevronDown}/>
                </Popover.Button>
                <Popover.Panel>
                    <CheckoutSidebar checkout={checkout as Checkout} />
                </Popover.Panel>
        </Popover>
    )
}