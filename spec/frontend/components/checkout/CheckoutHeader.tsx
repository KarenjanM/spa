import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

export default function CheckoutHeader({shippingAddress=null, shippingMethod=null}){
    const router = useRouter();
    const currentPage = router.asPath.split("/")[2];
    const info = shippingAddress ? (<Link href={"/checkout/information"} className="text-sky-700">Information</Link>)
     : (<div className="text-stone-500">Information</div>)
     const shipping = shippingMethod ? (<Link href={"/checkout/shipping"} className="text-sky-700">Versand</Link>)
     : (<div className="text-stone-500">Versand</div>)
     const payment = shippingAddress ? (<Link href={"/checkout/payment"} className="text-sky-700">Zahlung</Link>)
     : (<div className="text-stone-500">Information</div>)
     const check = shippingAddress ? (<Link href={"/checkout/information"} className="text-sky-700">Information</Link>)
     : (<div className="text-stone-500">Information</div>)

    return(
        <div className="flex flex-col gap-2">
            <div className="text-2xl">Kreateam</div>
            <div className="flex flex-row place-items-center text-xs gap-1">
                <Link href={'/cart'} className="text-sky-700">Warenkorb</Link>
                <ChevronRightIcon className="w-4 h-4"/>
                {currentPage=="information" ? (<div>Information</div>) 
                : info}
                <ChevronRightIcon className="w-4 h-4"/>
                {currentPage=="shipping" ? (<div>Versand</div>) : shipping} 
                <ChevronRightIcon className="w-4 h-4"/>
                {currentPage=="payment" ? (<div>Zahlung</div>) : payment} 
                <ChevronRightIcon className="w-4 h-4"/>
                <div className="text-stone-500">Überprüfung</div>
                </div>
        </div>
    )
}