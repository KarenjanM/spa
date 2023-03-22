import { useState } from 'react';
import Select from 'react-select';
import { Address, AddressTypeEnum, CountryCode, useCreateAdressMutation, useSetAsDefaultMutation, useUpdateAdressMutation } from "../../generated/graphql"
import { AdressInput } from '../adress/AdressInput';
import SubmitButton from '../buttons/SubmitButton';
import { TransparentButton } from '../buttons/TransparentButton';


export default function AdressForm({ data, operation, setShow }: { data, operation: string, setShow }) {
    const [adressUpdate] = useUpdateAdressMutation();
    const [adressCreate] = useCreateAdressMutation();
    const [setAsDefault] = useSetAsDefaultMutation();
    const [adress, setAdress] = useState({
        firstName: data?.firstName ?? "",
        lastName: data?.lastName ?? "",
        companyName:  data?.companyName ?? "",
        streetAdress1: data?.streetAddress1 ?? "",
        streetAdress2: data?.streetAddress2 ?? "",
        city: data?.city ?? "",
        country: data?.country ?? "",
        postalCode: data?.postalCode ?? "",
        phone: data?.phone ?? "",
        asDefault: false,
    })
    async function onSubmit(e) {
        e.preventDefault();
        if(operation==="update"){
            console.log("UPDATING ADRESS");
            console.log(adress);
            setShow(false);

            await adressUpdate({
                variables:{
                    id: data.id,
                    input: {
                        firstName: adress.firstName,
                        lastName: adress.lastName,
                        companyName: adress.companyName,
                        streetAddress1: adress.streetAdress1,
                        streetAddress2: adress.streetAdress2,
                        city: adress.city,
                        country: adress.country.code,
                        postalCode: adress.postalCode,
                        phone: adress.phone
                    }
                }
            }).then((result)=>{
                console.log(data);
                
                // if(adress.asDefault){
                //     setAsDefault({
                //         variables: {
                //             addressId: result.data.accountAddressUpdate.user.a.id,
                //             type: AddressTypeEnum.Shipping,
                //         }
                //     })
                // }
            });
        } else if(operation==="add"){
            console.log("ADDING ADRESS");
            console.log(adress);
            setShow(false);
            await adressCreate({
                variables: {
                    input: {
                        firstName: adress.firstName,
                        lastName: adress.lastName,
                        companyName: adress.companyName,
                        streetAddress1: adress.streetAdress1,
                        streetAddress2: adress.streetAdress2,
                        city: adress.city,
                        country: CountryCode.De,
                        postalCode: adress.postalCode,
                        phone: adress.phone
                    }
                }
            }).then((result)=>{
                console.log(result.data);
                
                // if(adress.asDefault){
                //     setAsDefault({
                //         variables: {
                //             addressId: result.data.accountAddressCreate.address.id,
                //             type: AddressTypeEnum.Shipping,
                //         }
                //     })
                // }
            })
        }
    }
    
    const countries = [{ label: "Deutschland", value: CountryCode.De }]

    return (
        <form className="flex flex-col self-center gap-5" onSubmit={(e)=>onSubmit(e)}>
            <div className="flex flex-row gap-3">
                <AdressInput onChange={(value) => setAdress({ ...adress, firstName: value.target.value })} defaultValue={data?.firstName} placeholder="Vorname" />
                <AdressInput onChange={(value) => setAdress({ ...adress, lastName: value.target.value })} defaultValue={data?.lastName} placeholder="Nachname" />
            </div>
            <AdressInput onChange={(value) => setAdress({ ...adress, companyName: value.target.value })} defaultValue={data?.companyName} placeholder="Unternehmen" />
            <AdressInput onChange={(value) => setAdress({ ...adress, streetAdress1: value.target.value })} defaultValue={data?.streetAddress1} placeholder="Adresse 1" />
            <AdressInput onChange={(value) => setAdress({ ...adress, streetAdress2: value.target.value })} defaultValue={data?.streetAddress2} placeholder="Adresse 2" />
            <AdressInput onChange={(value) => setAdress({ ...adress, city: value.target.value })} defaultValue={data?.city} placeholder="Ort" />
            <AdressSelect adress={adress} setAdress={setAdress} options={countries} />
            <AdressInput onChange={(value) => setAdress({ ...adress, postalCode: value.target.value })} defaultValue={data?.postalCode} placeholder="PLZ" />
            <AdressInput onChange={(value) => setAdress({ ...adress, phone: value.target.value })} type="tel" defaultValue={data?.phone} placeholder="Telefonnummer" />
            <div className='flex flex-row justify-between'>
                {operation=="add" ? <SubmitButton>Adresse hinzufügen</SubmitButton> : <SubmitButton>Adresse aktualisieren</SubmitButton>}
                <TransparentButton onClick={()=>setShow(false)}>Abbrechen</TransparentButton>
            </div>
        </form>
    )
}



export function AdressSelect({ options, className = "", adress, setAdress }) {
    return (
        <div className='flex flex-col text-start gap-1'>
            <label className='text-lg'>
                Land/Region
            </label>
            <Select
                options={options}
                defaultValue={options[0]}
                onChange={(value) => {setAdress({ ...adress, country: value})}}
                className={`${className}`}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: 'gray',
                        borderRadius: 0,
                        paddingTop: 2,
                        paddingBottom: 2,
                        paddingLeft: 5,
                        paddingRight: 5,
                    }),
                    placeholder: (baseStyles, state) => ({
                        ...baseStyles,
                        color: 'darkslategray'
                    })
                }}
            />
        </div>
    )
}