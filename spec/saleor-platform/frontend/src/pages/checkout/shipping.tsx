import Link from "next/link"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import CheckoutFooter from "../../components/checkout/CheckoutFooter"
import CheckoutHeader from "../../components/checkout/CheckoutHeader"
import CheckoutSidebar from "../../components/checkout/CheckoutSidebar"
import { CheckoutContext } from "../../contexts/checkoutContext"
import { Address, Checkout, ShippingMethod, useUpdateCheckoutShippingMethodMutation } from "../../../generated/graphql"
import { useGetCheckout } from "../../hooks/checkout"
import Spinner from "../../components/Spinner"
import ErrorBlock from "../../components/blocks/ErrorBlock"
import { CheckoutLayout } from "./information"
import NoCheckout from "../../components/NoCheckout"
import useHideLayout from "../../hooks/hideLayout"

export default function CheckoutShipping() {
    const { checkoutId } = useContext(CheckoutContext)
    const { data, loading, error } = useGetCheckout({ checkoutId })
    useHideLayout();
    if (error) return <ErrorBlock />
    if (loading) return <Spinner />;
    if (data){
        if (data?.checkout?.lines?.length >= 1)
            return (
                <CheckoutLayout>
                    <div className="flex flex-col gap-3 py-20 bg-white px-5 sm:px-10 md:pl-20 lg:pl-40">
                        <div className="flex flex-col gap-3 mr-20">
                            <CheckoutHeader checkout={data?.checkout as Checkout} />
                            <CheckoutInfoCheck email={data?.checkout?.email} checkoutAddress={data?.checkout?.shippingAddress as Address} />
                            <CheckoutShippingOptions
                                selectedShippingMethod={data?.checkout?.shippingMethod as ShippingMethod}
                                checkoutId={checkoutId}
                                shippingMethods={data?.checkout?.shippingMethods as Array<ShippingMethod>} />
                        </div>
                    </div>
                    <CheckoutSidebar checkout={data.checkout as Checkout} />
                </CheckoutLayout>
            )
    }
    if (!checkoutId || data?.checkout?.lines?.length < 1)
        return <NoCheckout />
}

export function CheckoutInfoCheck({ email, checkoutAddress, shippingMethod }: { email: string, checkoutAddress: Address, shippingMethod?: ShippingMethod }) {
    const parsedAddress = checkoutAddress ? `${checkoutAddress?.streetAddress1}, ${checkoutAddress?.postalCode} ${checkoutAddress?.city}, ${checkoutAddress?.country?.country}` : <Spinner />;
    const parsedShippingMethod = `${shippingMethod?.name} • ${shippingMethod?.price?.amount}€`
    return (
        <div className="border rounded-lg">
            <div className="text-sm">
                <div className="flex flex-col divide-y px-3">
                    <CheckoutInfoBlock href={"information"} blockName={"Kontakt"} info={email ? email : <Spinner />} />
                    <CheckoutInfoBlock href={"information"} blockName={"Liefern an"} info={parsedAddress} />
                    {shippingMethod && <CheckoutInfoBlock href={"shipping"} blockName={"Art"} info={parsedShippingMethod} />}
                </div>
            </div>
        </div>
    )
}

export function CheckoutInfoBlock({ blockName, info, href = "" }) {
    return (
        <div className="grid grid-cols-6 justify-between py-3 break-inside-avoid">
            <div>{blockName}</div>
            <div className="col-span-4">{info}</div>
            <div className="justify-self-end"><Link href={`/checkout/${href}`} className="text-sm text-sky-700">Ändern</Link></div>
        </div>
    )
}

export function CheckoutShippingOptions({ selectedShippingMethod, shippingMethods, checkoutId }: { selectedShippingMethod: ShippingMethod, shippingMethods?: Array<ShippingMethod>, checkoutId: string }) {
    const [updateShippingMethod] = useUpdateCheckoutShippingMethodMutation();
    const [buttonId, setButtonId] = useState<string>(selectedShippingMethod?.id);
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
        }).catch((e) => console.log(e))
    }

    function onSubmit(e) {
        e.preventDefault();
        router.push("/checkout/payment")
    }
    return (
        <form className="flex flex-col gap-2" onSubmit={(e) => onSubmit(e)}>
            <div className="text-xl self-start px-1">Versand</div>
            {shippingMethods.length > 0 ? shippingMethods.map((value) => (
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
            <CheckoutFooter link={"/checkout/information"} back={"zu den Informationen"} forward={"zur Zahlung"} />
        </form>
    )
}