import Select from 'react-select';
import { CheckoutInput } from "../checkout/CheckoutInput";
import { useState } from "react";
import { Checkout, CountryCode, User, useUpdateCheckoutBillingAddressMutation, useUpdateCheckoutEmailMutation, useUpdateCheckoutShippingAddressMutation } from "../../generated/graphql";
import CheckoutFooter from '../checkout/CheckoutFooter';
import { useRouter } from 'next/router';
import ContactForm from './ContactForm';

export default function CheckoutForm({user, checkoutId, checkout} : {user: User, checkoutId, checkout?: Checkout}) {
    const countries = [{ label: "Deutschland", value: CountryCode.De }]
    const router = useRouter();
    const [updateCheckoutShippingAddress] = useUpdateCheckoutShippingAddressMutation();
    const [updateCheckoutBillingAddress] = useUpdateCheckoutBillingAddressMutation();

    const [updateCheckoutEmail] = useUpdateCheckoutEmailMutation();
    const [email, setEmail] = useState(checkout || user ? checkout?.email || user?.email : "");
    const [currAddrId, setCurrAddrId] = useState("");
    let addresses;
    if (user)
        addresses = [{ label: "Neue Addresse verwenden", value: "" }, ...user?.addresses?.map((item)=> {return {label: `${item.streetAddress1},${item.postalCode} ${item.city}, ${item.country.country} (${item.firstName} ${item.lastName})`, value: item.id}})]
    const [address, setAddress] = useState({
        firstName: (user?.defaultShippingAddress?.firstName || checkout?.shippingAddress?.firstName) ?? "",
        lastName: (user?.defaultShippingAddress?.lastName || checkout?.shippingAddress?.lastName) ?? "",
        streetAddress: (user?.defaultShippingAddress?.streetAddress1 || checkout?.shippingAddress?.streetAddress1) ?? "",
        city:  (user?.defaultShippingAddress?.city || checkout?.shippingAddress?.city) ?? "",
        country: (user?.defaultShippingAddress?.country?.code || checkout?.shippingAddress?.country?.code)?? CountryCode.De,
        postalCode: (user?.defaultShippingAddress?.postalCode || checkout?.shippingAddress?.postalCode)?? "",
        phone: (user?.defaultShippingAddress?.phone || checkout?.shippingAddress?.phone) ?? "",
    })
    
    function onAddressSelect(id){
        const currAddr = user?.addresses?.find((value)=>value.id === id);
        console.log(currAddr);
        currAddr ? setCurrAddrId(currAddr?.id) : "";
        setAddress({
            firstName: currAddr?.firstName, lastName: currAddr?.lastName,
            streetAddress: currAddr?.streetAddress1, city: currAddr?.city,
            country: currAddr?.country?.code, postalCode: currAddr?.postalCode, phone: currAddr?.phone
        })
    }

    function onSubmit(e){
        e.preventDefault();
        updateCheckoutEmail({
            variables: {
                id: checkoutId,
                email: email
            }
        }).then((data)=>{
            console.log(data)
        })
        updateCheckoutShippingAddress({
            variables: {
                input: {
                    firstName: address?.firstName, lastName: address?.lastName,
                    streetAddress1: address?.streetAddress, city: address?.city,
                    country: address?.country as CountryCode, postalCode: address?.postalCode, phone: address?.phone
                },
                id: checkoutId
            }
        }).then((result)=>{
            console.log(result);
        })
        updateCheckoutBillingAddress({
            variables: {
                input: {
                    firstName: address?.firstName, lastName: address?.lastName,
                    streetAddress1: address?.streetAddress, city: address?.city,
                    country: address?.country as CountryCode, postalCode: address?.postalCode, phone: address?.phone
                },
                id: checkoutId
            }
        }).then((result)=>{
            console.log(result);
        })
        router.push("/checkout/shipping")
    }

    return (
        <form className="flex flex-col gap-5 mr-20" onSubmit={(e)=>onSubmit(e)} >
            <ContactForm email={email} setEmail={setEmail} user={user as User}/>
            <div className="text-xl self-start pb-2">Lieferadresse</div>
            <div key={currAddrId} className="flex flex-col gap-4 ">
                    {user?.addresses?.length > 0 && <CheckoutSelect onChange={(value) => onAddressSelect(value.value)} options={addresses} />}
                    <CheckoutSelect onChange={(value) => {setAddress({ ...address, country: value})}} options={countries} />
                    <div className="flex flex-row gap-2">
                        <CheckoutInput onChange={(value) => setAddress({ ...address, firstName: value})} type="text" placeholder="Vorname" value={address.firstName}/>
                        <CheckoutInput onChange={(value) => setAddress({ ...address, lastName: value })} type="text" placeholder="Nachname" value={address.lastName} />
                    </div>
                    <CheckoutInput onChange={(value) => setAddress({ ...address, streetAddress: value })} type="text" placeholder="Adresse" value={address.streetAddress} />
                    <div className="flex flex-row gap-2">
                        <CheckoutInput onChange={(value) => setAddress({ ...address, postalCode: value })} type="text" placeholder="Postleitzahl" value={address.postalCode}/>
                        <CheckoutInput onChange={(value) => setAddress({ ...address, city: value })} type="text" placeholder="Stadt" value={address.city} />
                    </div>
                    <CheckoutInput  onChange={(value) => {setAddress({ ...address, phone: value }); console.log(value);}} type="tel" placeholder="Telefon (optional)" value={address.phone} />
                    <CheckoutFooter back={"zum Warenkorb"} forward={"zum Versand"}/>
            </div>
        </form>
    )
}


export function CheckoutSelect({ options, onChange }) {
    return (
        <Select styles={{
            control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused && 'blue',
                paddingTop: 3,
                paddingBottom: 3
            })
        }} 
        options={options}
        defaultValue={options[0]}
        onChange={onChange}
        />
    )
}