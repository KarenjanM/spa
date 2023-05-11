import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaypal } from '@fortawesome/free-brands-svg-icons'
import { Checkout, useCompleteCheckoutMutation, useCreateCheckoutPaymentMutation, useUpdateCheckoutEmailMutation, useUpdateCheckoutShippingMethodMutation } from '../../../generated/graphql';
import DropIn from 'braintree-web-drop-in-react';
import { useEffect, useState } from 'react';
import useUpdateAddress from '../../hooks/updateAddress';
import { useRouter } from 'next/router';
import { useContext } from 'preact/hooks';
import { CheckoutContext } from '../../contexts/checkoutContext';

export default function CheckoutExpress({checkout, refetch, resetCheckoutId}: {checkout: Checkout, refetch?, resetCheckoutId}) {
    return (
        <div className="flex flex-col gap-3">
            <div className="inline-flex items-center place-content-center relative">
                <hr className="w-full my-8 bg-gray-500 "/>
                <span className="absolute px-3 font-medium text-gray-900 bg-white">Express Checkout</span>
            </div>
            <ExpressCheckout resetCheckoutId={resetCheckoutId} refetch={refetch} checkout={checkout}/>
            <div className="inline-flex items-center place-content-center relative">
                <hr className="w-full my-8 bg-gray-500 "/>
                <span className="absolute px-3 font-medium text-gray-900 bg-white">ODER</span>
            </div>
        </div>
    )
}

export function PaymentButton({ icon }) {
    return (
        <button className={`flex place-items-center grow place-content-center py-1 rounded-lg ${icon == faPaypal ? 'bg-yellow-500' : 'bg-black'}  gap-1`}>
            <FontAwesomeIcon icon={icon} size={"xl"} color={icon == faPaypal ? 'blue' : 'white'} />
            <div className={`${icon == faPaypal ? 'text-sky-700' : 'text-white'} text-2xl`}>Pay</div>
        </button>
    )
}

export function ExpressCheckout({checkout, refetch, resetCheckoutId}: {checkout: Checkout, refetch?, resetCheckoutId}){
    const [loading, setLoading] = useState(false);
    const [instance, setInstance] = useState<any>();
    const [requestable, setRequestable] = useState(false);
    const updateAddress = useUpdateAddress();
    const router = useRouter();
    const [updateShippingMethod] = useUpdateCheckoutShippingMethodMutation();
    const [updateCheckoutEmail] = useUpdateCheckoutEmailMutation();
    const [checkoutComplete] = useCompleteCheckoutMutation();
    const [createCheckoutPayment] = useCreateCheckoutPaymentMutation();

    async function completeExpressCheckout(nonce: string){
        const paymentData = await createCheckoutPayment({
            variables: {
                id: checkout.id,
                input: {
                    gateway: checkout?.availablePaymentGateways[0]?.id,
                    token: nonce
                }
            }
        })
        .catch((e)=>console.log(e))
        console.log(paymentData)
        const completeData: any = await checkoutComplete({
            variables: {
                id: checkout.id
            }
        })
        .catch((e)=>console.log(e))
        console.log(completeData)
        resetCheckoutId();
        router.push(`/checkout/success/${completeData?.data?.checkoutComplete?.order?.id}`);
    }

    useEffect(() => {
        if(instance && requestable)
            instance.requestPaymentMethod()
            .then((payload) => {
                setLoading(true);

                updateCheckoutEmail({
                    variables: {
                        id: checkout.id,
                        email: payload.details.email
                    }
                })
                .catch((error)=>console.log(error))
                updateAddress({formData: {
                    firstName: payload?.details?.shippingAddress?.recipientName?.split(' ')[0],
                    lastName: payload?.details?.shippingAddress?.recipientName?.split(' ')[1],
                    country: {value: payload?.details?.shippingAddress?.countryCode},
                    streetAddress: payload?.details?.shippingAddress?.line1,
                    asDefault: false,
                    city: payload?.details?.shippingAddress?.city,
                    postalCode: payload?.details?.shippingAddress?.postalCode,
                    phone: payload?.details?.shippingAddress?.phone,
                    companyName: payload?.details?.businessName,
                }, checkoutId: checkout.id})
                .catch((error)=>console.log(error))
                .then(()=>{
                    refetch({id: checkout?.id}).then((data)=>{
                    updateShippingMethod({variables: {
                        id: checkout?.id,
                        shippingMethodId: data?.data?.checkout?.shippingMethods[0]?.id
                    }}).then(()=>completeExpressCheckout(payload.nonce))
                })
                })
            })
    }, [instance, requestable])
    return (
        <DropIn options={{ authorization: checkout?.availablePaymentGateways[0]?.config[1]?.value, locale: "de_DE", paypal: { 
            flow: "checkout",
            amount: checkout?.totalPrice?.gross?.amount,
            currency: checkout?.totalPrice?.gross?.currency,
            enableShippingAddress: true,
            shippingAddressEditable: true,
            },
            card: false, googlePay: {transactionInfo: {
            currencyCode: checkout?.totalPrice?.gross?.currency,
            countryCode: "DE",
            totalPriceStatus: "FINAL",
            totalPrice: `${checkout?.totalPrice?.gross?.amount}`
        }}}}
        onInstance={(instance) => setInstance(instance)}
        onNoPaymentMethodRequestable={() => setRequestable(false)}
        onPaymentMethodRequestable={() => setRequestable(true)}
        onError={(error) => console.log(error)} />
    )
}