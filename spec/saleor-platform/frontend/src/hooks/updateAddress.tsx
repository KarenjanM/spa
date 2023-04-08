import { CountryCode, useUpdateCheckoutBillingAddressMutation, useUpdateCheckoutShippingAddressMutation } from "../../generated/graphql";
import { CheckoutAddressData } from "../components/forms/CheckoutForm";

export default function useUpdateAddress(){
    const [updateCheckoutShippingAddress] = useUpdateCheckoutShippingAddressMutation();
    const [updateCheckoutBillingAddress] = useUpdateCheckoutBillingAddressMutation();
    async function updateAddress({formData, checkoutId} : {formData: CheckoutAddressData, checkoutId: string}){
        await updateCheckoutShippingAddress({
            variables: {
                input: {
                    firstName: formData?.firstName, lastName: formData?.lastName,
                    streetAddress1: formData?.streetAddress, city: formData?.city,
                    country: formData?.country.value as CountryCode, postalCode: formData?.postalCode, phone: formData?.phone
                },
                id: checkoutId
            }
        }).then((result)=>{
            console.log(result);
        })
        await updateCheckoutBillingAddress({
            variables: {
                input: {
                    firstName: formData?.firstName, lastName: formData?.lastName,
                    streetAddress1: formData?.streetAddress, city: formData?.city,
                    country: formData?.country.value as CountryCode, postalCode: formData?.postalCode, phone: formData?.phone
                },
                id: checkoutId
            }
        }).then((result)=>{
            console.log(result);
        })
    }
    return updateAddress
}