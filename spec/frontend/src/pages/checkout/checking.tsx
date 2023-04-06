import { useContext, useEffect } from "react"
import { ClipLoader } from "react-spinners"
import CheckoutHeader from "../../components/checkout/CheckoutHeader"
import CheckoutSidebar from "../../components/checkout/CheckoutSidebar"
import { CheckoutContext } from "../../contexts/checkoutContext"
import { Address, Checkout, ShippingMethod } from "../../../generated/graphql"
import { useGetCheckout } from "../../hooks/checkout"
import { CheckoutInfoCheck } from "./shipping"

export default function CheckoutPayment(){
    const {checkoutId} = useContext(CheckoutContext)
    const {data, loading, error} = useGetCheckout({checkoutId});

    useEffect(()=>{
        const footer = document.getElementById('footer')
        footer.classList.add("hidden")
        const header = document.getElementById('header')
        header.classList.add("hidden")
        return () => {
            footer.classList.remove('hidden');
            header.classList.remove('hidden');
        }
    }, [])
    if(error) return <div>Error</div>
    if(loading) return <ClipLoader loading={loading} />;
    if (data)
    return (
        <div className="grid min-h-screen grid-cols-4 divide-x divide-slate-500 pl-40">
                <div className="py-20 grid col-span-2 bg-white">
                    <div className="flex flex-col gap-3 mr-20">
                        <CheckoutHeader shippingAddress={data?.checkout?.shippingAddress} shippingMethod={data?.checkout?.shippingMethod} />
                        <CheckoutInfoCheck email={data?.checkout?.email} checkoutAddress={data?.checkout?.shippingAddress as Address}
                        shippingMethod={data?.checkout?.shippingMethod as ShippingMethod}/>
                    </div>
                </div>
                <CheckoutSidebar checkout={data.checkout as Checkout} />
        </div>
    )
}