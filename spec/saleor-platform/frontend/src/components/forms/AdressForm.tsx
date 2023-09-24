import React, { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { StateManagerProps } from 'react-select/dist/declarations/src/useStateManager';
import { Address, CountryCode, useCreateAdressMutation, useUpdateAdressMutation } from "../../../generated/graphql"
import { AdressInput } from '../adress/AdressInput';
import AuthAlert from '../Alert';
import SubmitButton from '../buttons/SubmitButton';
import { TransparentButton } from '../buttons/TransparentButton';


type Country = {
    label?: string,
    value?: CountryCode | string
} 

interface AddressData {
        firstName: string,
        lastName: string,
        companyName:  string,
        streetAddress1: string,
        streetAddress2: string,
        city: string,
        country:  Country,
        postalCode: string,
        phone: string
}


export default function AdressForm({ data, operation, setShow }: { data: Address, operation: "update" | "add", setShow }) {
    const [adressUpdate, updateObj] = useUpdateAdressMutation();
    const [adressCreate, createObj] = useCreateAdressMutation();
    const {register, handleSubmit, control, formState: {errors}} = useForm<AddressData>({defaultValues: {
        firstName: data?.firstName ?? "",
        lastName: data?.lastName ?? "",
        companyName:  data?.companyName ?? "",
        streetAddress1: data?.streetAddress1 ?? "",
        streetAddress2: data?.streetAddress2 ?? "",
        city: data?.city ?? "",
        country: {label: data?.country.country, value: data?.country.code}  ?? {label: "", value: ""},
        postalCode: data?.postalCode ?? "",
        phone: data?.phone ?? ""
    }})
    async function onSubmit(formData: AddressData) {
        switch(operation){
        case "update":
            setShow(false);
            await adressUpdate({
                variables:{
                    id: data.id,
                    input: {...formData, country: formData.country.value! as CountryCode}
            }})
            .catch((e)=>console.log(e))
            .then((data)=>console.log(data))
            break;
        case "add":
            setShow(false);
            await adressCreate({
                variables: {
                    input: {...formData, country: formData.country.value as CountryCode}
                }
            })
            .catch((e)=>console.log(e))
            .then((data)=>console.log(data))
            break;
        }
    }
    
    const countries = [{ label: "Germany", value: CountryCode.De }]

    return (
        <form className="flex flex-col self-center gap-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row gap-3">
                <AdressInput {...register("firstName")} required placeholder="Vorname" />
                <AdressInput {...register("lastName")} required placeholder="Nachname" />
            </div>
            <AdressInput {...register("companyName")} placeholder="Unternehmen" />
            <AdressInput {...register("streetAddress1")} required placeholder="Adresse 1" />
            <AdressInput {...register("streetAddress2")} placeholder="Adresse 2" />
            <AdressInput {...register("city")} required placeholder="Ort" />
            <Controller
            name="country"
            control={control as any}
            render={({field})=><AdressSelect {...field} options={countries} />} />
            <AdressInput {...register("postalCode")} required placeholder="PLZ" />
            <AdressInput type={"tel"} {...register("phone")} placeholder="Telefonnummer" />
            <div className='flex flex-row justify-between'>
                {operation=="add" ? <SubmitButton>Adresse hinzufügen</SubmitButton> : <SubmitButton>Adresse aktualisieren</SubmitButton>}
                <TransparentButton onClick={()=>setShow(false)}>Abbrechen</TransparentButton>
            </div>
        </form>
    )
}




export const AdressSelect: FC<StateManagerProps> = React.forwardRef<any, StateManagerProps>(({...props}, ref) =>{
    return (
        <div className='flex flex-col text-start gap-1'>
            <label className='text-lg'>
                Land/Region
            </label>
            <Select
            required
            ref={ref}
            {...props}
            styles={{
                control: (baseStyles) => ({
                    ...baseStyles,
                    borderColor: 'gray',
                    borderRadius: 0,
                    paddingTop: 2,
                    paddingBottom: 2,
                    paddingLeft: 5,
                    paddingRight: 5,
                }),
                placeholder: (baseStyles) => ({
                    ...baseStyles,
                    color: 'darkslategray'
                })
            }}
        />
        </div>
    )
})