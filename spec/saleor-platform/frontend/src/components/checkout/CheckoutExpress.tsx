import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaypal } from '@fortawesome/free-brands-svg-icons'
import { Checkout, useUpdateCheckoutEmailMutation, useUpdateCheckoutShippingAddressMutation, useUpdateCheckoutShippingMethodMutation } from '../../../generated/graphql';
import DropIn from 'braintree-web-drop-in-react';
import { useEffect, useState } from 'react';
import useUpdateAddress from '../../hooks/updateAddress';

export default function CheckoutExpress({checkout}: {checkout: Checkout}) {
    return (
        <div className="flex flex-col gap-3">
            <div className="inline-flex items-center place-content-center relative">
                <hr className="w-full my-8 bg-gray-500 "/>
                <span className="absolute px-3 font-medium text-gray-900 bg-white">Express Checkout</span>
            </div>
            <ExpressCheckout checkout={checkout}/>
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

export function ExpressCheckout({checkout}: {checkout: Checkout}){
    const [instance, setInstance] = useState<any>();
    const [requestable, setRequestable] = useState(false);
    const updateAddress = useUpdateAddress();
    const [updateShippingMethod] = useUpdateCheckoutShippingMethodMutation();
    const [updateCheckoutEmail] = useUpdateCheckoutEmailMutation();
    useEffect(() => {
        if(instance && requestable)
            instance.requestPaymentMethod()
            .then((payload) => {
                updateCheckoutEmail({
                    variables: {
                        id: checkout.id,
                        email: payload.details.email
                    }
                })
                updateAddress({formData: {
                    firstName: payload.details.firstName,
                    lastName: payload.details.lastName,
                    country: payload.details.country
                }, checkoutId: checkout.id})
            })
    })
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