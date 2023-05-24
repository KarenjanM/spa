import Select from 'react-select';
import { CheckoutInput } from "../checkout/CheckoutInput";
import { FC, useState } from "react";
import { Checkout, CountryCode, User, useUpdateCheckoutEmailMutation } from "../../../generated/graphql";
import CheckoutFooter from '../checkout/CheckoutFooter';
import { useRouter } from 'next/router';
import ContactForm from './ContactForm';
import { Controller, useForm } from 'react-hook-form';
import { StateManagerProps } from 'react-select/dist/declarations/src/useStateManager';
import React from 'react';
import useUpdateAddress from '../../hooks/updateAddress';

type Country = {
    label?: string,
    value?: CountryCode | string
} 

export interface CheckoutAddressData {
        firstName: string,
        lastName: string,
        companyName:  string,
        streetAddress: string,
        city: string,
        country:  Country,
        postalCode: string,
        phone: string,
        asDefault: boolean
}

export default function CheckoutForm({user, checkoutId, checkout, refetch} : {user: User, checkoutId, checkout?: Checkout, refetch?}) {
    const countries = [{ label: "Germany", value: CountryCode.De }] 
    const router = useRouter();

    const updateAddress = useUpdateAddress();
    const [updateCheckoutEmail] = useUpdateCheckoutEmailMutation();
    const [email, setEmail] = useState( user?.email || checkout?.email || "");
    
    const [currAddrId, setCurrAddrId] = useState("");
    let addresses;
    if (user)
        addresses = [{ label: "Neue Addresse verwenden", value: "" }, ...user?.addresses?.map((item)=> {return {label: `${item.streetAddress1},${item.postalCode} ${item.city}, ${item.country.country} (${item.firstName} ${item.lastName})`, value: item.id}})]
    const {register, handleSubmit, control, watch, setValue}= useForm<CheckoutAddressData>({defaultValues: {
        firstName: (user?.defaultShippingAddress?.firstName || checkout?.shippingAddress?.firstName) ?? "",
        lastName: (user?.defaultShippingAddress?.lastName || checkout?.shippingAddress?.lastName) ?? "",
        streetAddress: (user?.defaultShippingAddress?.streetAddress1 || checkout?.shippingAddress?.streetAddress1) ?? "",
        city:  (user?.defaultShippingAddress?.city || checkout?.shippingAddress?.city) ?? "",
        country: {label: (user?.defaultShippingAddress?.country?.country || checkout?.shippingAddress?.country?.country) ?? "", value: (user?.defaultShippingAddress?.country?.code || checkout?.shippingAddress?.country?.code) ?? ""},
        postalCode: (user?.defaultShippingAddress?.postalCode || checkout?.shippingAddress?.postalCode)?? "",
        phone: (user?.defaultShippingAddress?.phone || checkout?.shippingAddress?.phone) ?? "",
    }})
    
    function onAddressSelect(selectedValue){
        const currAddr = user?.addresses?.find((value)=>value.id === selectedValue.value);
        
        currAddr ? setCurrAddrId(currAddr?.id) : "";
        setValue("firstName", currAddr?.firstName)
        setValue("lastName", currAddr?.lastName)
        setValue("streetAddress", currAddr?.streetAddress1)
        setValue("city", currAddr?.city)
        setValue("country", {label: currAddr?.country?.country, value: currAddr?.country?.code})
        setValue("postalCode", currAddr?.postalCode)
        setValue("phone", currAddr?.phone)
    }

    async function onSubmit(formData : CheckoutAddressData){
        const emailData = await updateCheckoutEmail({
            variables: {
                id: checkoutId,
                email: email
            }
        })
        const addressData = await updateAddress({formData: formData, checkoutId: checkoutId})
        await refetch({id: checkout?.id})
        router.push("/checkout/shipping")
    }

    return (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)} >
            <ContactForm email={email} setEmail={setEmail} user={user as User}/>
            <div className="text-xl self-start pb-2">Lieferadresse</div>
            <div key={currAddrId} className="flex flex-col gap-4 ">
                    {user?.addresses?.length > 0 && <CheckoutSelect onChange={(value) => onAddressSelect(value)} options={addresses} />}
                    <Controller
                        name="country"
                        control={control as any}
                        render={({field})=><CheckoutSelect {...field} options={countries} />} />
                    <PairBox>
                        <CheckoutInput {...register("firstName")} type="text" placeholder="Vorname" />
                        <CheckoutInput {...register("lastName")} type="text" placeholder="Nachname" />
                    </PairBox>
                    <CheckoutInput {...register("streetAddress")} type="text" placeholder="Adresse" />
                    <PairBox>
                        <CheckoutInput {...register("postalCode")} type="text" placeholder="Postleitzahl" />
                        <CheckoutInput {...register("city")}  type="text" placeholder="Stadt" />
                    </PairBox>
                    <CheckoutInput  {...register("phone")} type="tel" placeholder="Telefon (optional)" />
                    <CheckoutFooter link={"/cart"} back={"zum Warenkorb"} forward={"zum Versand"}/>
            </div>
        </form>
    )
}

export function PairBox({children}){
    return(
        <div className="flex flex-col sm:flex-row gap-2">
            {children}
        </div>
    )
}

export const CheckoutSelect: FC<StateManagerProps> = React.forwardRef<any, StateManagerProps>(({...props}, ref)=>{
    return (
        <Select ref={ref} styles={{
            control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused && 'blue',
                paddingTop: 3,
                paddingBottom: 3
            })
        }} 
        {...props}
        defaultValue={props.options[0]}
        />
    )
})