import Link from "next/link"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import CheckoutFooter from "../../components/checkout/CheckoutFooter"
import CheckoutHeader from "../../components/checkout/CheckoutHeader"
import CheckoutSidebar from "../../components/checkout/CheckoutSidebar"
import { CheckoutContext } from "../../contexts/checkoutContext"
import { Address, Checkout, ShippingMethod, useUpdateCheckoutShippingMethodMutation } from "../../generated/graphql"
import { useGetCheckout } from "../../hooks/checkout"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import CheckoutSecure from "../../components/CheckoutSecure"

export default function CheckoutShipping() {
    const { checkoutId } = useContext(CheckoutContext)
    const { data, loading, error } = useGetCheckout({ checkoutId })
    useEffect(() => {
        const footer = document.getElementById('footer')
        footer.classList.add("hidden")
        const header = document.getElementById('header')
        header.classList.add("hidden")
        return () => {
            footer.classList.remove('hidden');
            header.classList.remove('hidden');
        }
    }, [])
    if (error) return <div>Error</div>
    if (loading) return <div>Loading...</div>
    if (data)
        return (
            <CheckoutSecure>
            <div className="grid min-h-screen grid-cols-4 divide-x divide-slate-500 pl-40">
                <div className="py-20 grid col-span-2 bg-white">
                    <div className="flex flex-col gap-3 mr-20">
                        <CheckoutHeader shippingAddress={data?.checkout?.shippingAddress} shippingMethod={data?.checkout?.shippingMethod} />
                        <CheckoutInfoCheck email={data?.checkout?.email} checkoutAddress={data?.checkout?.shippingAddress as Address} />
                        <CheckoutShippingOptions checkoutId={checkoutId} shippingMethods={data?.checkout?.shippingMethods as Array<ShippingMethod>} />
                    </div>
                </div>
                <CheckoutSidebar checkout={data.checkout as Checkout} />
            </div>
            </CheckoutSecure>
        )
}

export function CheckoutInfoCheck({ email, checkoutAddress, shippingMethod }: { email: string, checkoutAddress: Address, shippingMethod?: ShippingMethod }) {
    const parsedAddress = checkoutAddress ?  `${checkoutAddress?.streetAddress1}, ${checkoutAddress?.postalCode} ${checkoutAddress?.city}, ${checkoutAddress?.country?.country}` : <FontAwesomeIcon icon={faSpinner} size={"xs"} />;
    const parsedShippingMethod = `${shippingMethod?.name} • ${shippingMethod?.price?.amount}€`
    return (
        <div className="border rounded-lg">
            <div className="text-sm">
                <div className="flex flex-col divide-y px-3">
                    <CheckoutInfoBlock href={"information"} blockName={"Kontakt"} info={email} />
                    <CheckoutInfoBlock href={"information"} blockName={"Liefern an"} info={parsedAddress} />
                    {shippingMethod && <CheckoutInfoBlock href={"shipping"} blockName={"Art"} info={parsedShippingMethod} />}
                </div>
            </div>
        </div>
    )
}

export function CheckoutInfoBlock({ blockName, info, href="" }) {
    return (
        <div className="grid grid-cols-6 justify-between py-3 break-inside-avoid">
            <div>{blockName}</div>
            <div className="col-span-4">{info}</div>
            <div className="justify-self-end"><Link href={`/checkout/${href}`} className="text-sm text-sky-700">Ändern</Link></div>
        </div>
    )
}

export function CheckoutShippingOptions({ shippingMethods, checkoutId }: { shippingMethods?: Array<ShippingMethod>, checkoutId: string }) {
    const [updateShippingMethod] = useUpdateCheckoutShippingMethodMutation();
    const [buttonId, setButtonId] = useState("");
    const router = useRouter();
    function onClick(shippingMethodId) {

        setButtonId(shippingMethodId);

        updateShippingMethod({
            variables: {
                id: checkoutId,
                shippingMethodId: shippingMethodId
            }
        }).then((data) => {
            console.log(data);
        })
    }

    function onSubmit(e){
        e.preventDefault();
        router.push("/checkout/payment")
    }
    return (
        <form className="flex flex-col gap-2" onSubmit={(e)=>onSubmit(e)}>
            <div className="text-xl self-start px-1">Versand</div>
            {shippingMethods ? shippingMethods.map((value) => (
                <button type="button" className={`border rounded-lg hover:border-black ${buttonId == value.id && "border-black"}`} onClick={() => onClick(value.id)}>
                    <div className="flex flex-row justify-between text-sm px-3 py-3 pointer-events-none">
                        <div>
                            {value.name}
                        </div>
                        <div>
                            {value.price.amount} €
                        </div>
                    </div>
                </button>
            )) : (
                <div className="px-3">Unfortunately there are no shipping methods yet</div>
            )}
            <CheckoutFooter back={"zu den Informationen"} forward={"zur Zahlung"}/>
        </form>
    )
}