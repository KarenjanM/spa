import { useContext, useEffect, useState } from "react"
import CheckoutFooter from "../../components/checkout/CheckoutFooter"
import CheckoutHeader from "../../components/checkout/CheckoutHeader"
import CheckoutSidebar from "../../components/checkout/CheckoutSidebar"
import { CheckoutContext } from "../../contexts/checkoutContext"
import { Address, Checkout, ShippingMethod, useCompleteCheckoutMutation, useCreateCheckoutPaymentMutation } from "../../../generated/graphql"
import { useGetCheckout } from "../../hooks/checkout"
import { CheckoutInfoCheck } from "./shipping"
import DropIn from "braintree-web-drop-in-react";
import { useRouter } from "next/router"
import { ClipLoader } from "react-spinners"
import Spinner from "../../components/Spinner"
import { CheckoutLayout } from "./information"
import NoCheckout from "../../components/NoCheckout"

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
    if (loading) return <ClipLoader loading={loading} />;
    if (data)
        if(data?.checkout?.lines?.length>=1)
            return (
                    <CheckoutLayout>
                        <div className="flex flex-col gap-3 py-20 bg-white px-5 sm:px-10 md:pl-20 lg:pl-40">
                            <div className="flex flex-col gap-3 mr-20">
                                <CheckoutHeader checkout={data?.checkout as Checkout} />
                                <CheckoutInfoCheck email={data?.checkout?.email} checkoutAddress={data?.checkout?.shippingAddress as Address}
                                    shippingMethod={data?.checkout?.shippingMethod as ShippingMethod} />
                                <CheckoutPaymentBlock checkout={data?.checkout as Checkout} />
                            </div>
                        </div>
                        <CheckoutSidebar checkout={data.checkout as Checkout} />
                    </CheckoutLayout>
            )
    if(!checkoutId || data?.checkout?.lines?.length < 1)
        return <NoCheckout />
}

export function CheckoutPaymentBlock({ checkout }: { checkout: Checkout }) {
    
    const availableGateways = checkout?.availablePaymentGateways;
    const [requestable, setRequestable] = useState(false);
    const [createCheckoutPayment] = useCreateCheckoutPaymentMutation();
    const [checkoutComplete, {loading}] = useCompleteCheckoutMutation();
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
            })
            .catch((e)=>console.log(e))
            .then((data) => {
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
                    router.push(`/checkout/success/${data?.data?.checkoutComplete?.order?.id}`);

                }).catch((e)=>console.log(e))
            })
        })
    }
    if(loading) return <Spinner />
    return (
        <div>
            <form id="payment-form" className="flex flex-col gap-2" onSubmit={(e) => onSubmit(e)}>
                <div className="text-xl self-start px-1">Zahlung</div>
                <div>
                    <DropIn onNoPaymentMethodRequestable={() => setRequestable(false)} onPaymentMethodRequestable={() => setRequestable(true)}
                        options={{ authorization: checkout.availablePaymentGateways[0].config[1].value, paypal: { flow: "vault" } }}
                        onInstance={(instance) => setInstance(instance)} onError={(error) => console.log(error)} />
                </div>
                <CheckoutFooter disabled={!requestable} back={"zum Versand"} link={"/checkout/shipping"} forward={""} />
            </form>
        </div>
    )
}