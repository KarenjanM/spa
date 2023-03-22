import { useContext, useEffect, useState } from "react"
import CheckoutFooter from "../../components/checkout/CheckoutFooter"
import CheckoutHeader from "../../components/checkout/CheckoutHeader"
import CheckoutSidebar from "../../components/checkout/CheckoutSidebar"
import { CheckoutContext } from "../../contexts/checkoutContext"
import { Address, Checkout, ShippingMethod, useCompleteCheckoutMutation, useCreateCheckoutPaymentMutation } from "../../generated/graphql"
import { useGetCheckout } from "../../hooks/checkout"
import { CheckoutInfoCheck } from "./shipping"
import DropIn from "braintree-web-drop-in-react";
import { useRouter } from "next/router"
import CheckoutSecure from "../../components/CheckoutSecure"


export default function CheckoutPayment() {
    const { checkoutId } = useContext(CheckoutContext)
    const { data, loading, error } = useGetCheckout({ checkoutId });

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
                            <CheckoutInfoCheck email={data?.checkout?.email} checkoutAddress={data?.checkout?.shippingAddress as Address}
                                shippingMethod={data?.checkout?.shippingMethod as ShippingMethod} />
                            <CheckoutPaymentBlock checkout={data?.checkout as Checkout} />
                        </div>
                    </div>
                    <CheckoutSidebar checkout={data.checkout as Checkout} />
                </div>
            </CheckoutSecure>
        )
}

export function CheckoutPaymentBlock({ checkout }: { checkout: Checkout }) {
    const availableGateways = checkout?.availablePaymentGateways;
    const [createCheckoutPayment] = useCreateCheckoutPaymentMutation();
    const [checkoutComplete] = useCompleteCheckoutMutation();
    const [instance, setInstance] = useState<any>();
    const router = useRouter();
    const { resetCheckoutId } = useContext(CheckoutContext);
    function onSubmit(e) {
        e.preventDefault();
        instance.requestPaymentMethod().then((payload) => {
            createCheckoutPayment({
                variables: {
                    id: checkout.id,
                    input: {
                        gateway: availableGateways[0].id,
                        token: payload.nonce
                    }
                }
            }).then((data) => {
                console.log("createCheckoutPayment");
                console.log(data);

                checkoutComplete({
                    variables: {
                        id: checkout.id
                    }
                }).then((data) => {
                    console.log("checkoutComplete");
                    console.log(data);
                    resetCheckoutId();
                })
            })
        })
        router.push("/");
    }
    return (
        <div>
            <form id="payment-form" className="flex flex-col gap-2" onSubmit={(e) => onSubmit(e)}>
                <div className="text-xl self-start px-1">Zahlung</div>
                <div>
                    <DropIn onNoPaymentMethodRequestable={() => console.log("...not working")} onPaymentMethodRequestable={() => console.log("working")}
                        options={{ authorization: checkout.availablePaymentGateways[0].config[1].value, paypal: { flow: "vault" } }}
                        onInstance={(instance) => setInstance(instance)} onError={(error) => console.log(error)} />
                </div>
                <CheckoutFooter back={"zur Zahlung"} forward={"zur Überpüfung"} />
            </form>
        </div>
    )
}