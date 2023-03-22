import Link from "next/link"
import { useState } from "react";
import { AdressBlock } from "../components/adress/AdressBlock";
import Authorization from "../components/Authorization";
import SubmitButton from "../components/buttons/SubmitButton"
import { TransparentButton } from "../components/buttons/TransparentButton";
import AdressForm from "../components/forms/AdressForm";
import { Address, useDeleteAdressMutation, useGetUserQuery } from "../generated/graphql";


export default function Addresses() {
    const { data, loading, error } = useGetUserQuery();
    let component = <></>;
    const user = data?.me;
    if (error) component = <>Error</>
    if (loading) component = <>Loading...</>
    if (data){
        component = (
            <div className="py-10 flex flex-col text-center gap-10">
                <div className="text-4xl">
                    Adressen
                </div>
                <Link href={'/profile'} className="underline underline-offset-2 hover:decoration-2">
                    Zurück zu Kontodetails
                </Link>
                <AddressAdd operation={"add"}/>
                {user?.addresses.length > 0 && (
                <div className="flex flex-col gap-5">
                    <div className="text-2xl">
                        Standard
                    </div>
                        <>
                            {
                                user?.addresses.map((address)=>(
                                    <>
                                    <AddressUpdate operation={"update"} address={address}/>
                                    </>
                                )) 
                            }
                        </>
                </div>
                )}
            </div>
        )
    }
    return (
        <Authorization>
            {component}
        </Authorization>
    )
}

export function AddressAdd({operation}){
    const [show, setShow] = useState(false);
    return (
        <>
            <SubmitButton className="self-center" onClick={()=>setShow(!show)}>Neue Adresse hinzufügen</SubmitButton>
            {show && <AdressForm setShow={setShow} operation={operation} data={null} />}
        </>
    )
}

export function AddressUpdate({address, operation}) {
    const [show, setShow] = useState(false);
    const [deleteAdress] = useDeleteAdressMutation();
    const onDelete = () => {
        deleteAdress({
            variables:{
                addressId: address.id
            }
        })
    } 
    return (
        <>
            <AdressBlock address={address} />
            <div className="flex flex-row justify-center gap-5">
                <TransparentButton onClick={() => {setShow(!show)}}>Bearbeiten</TransparentButton>
                <TransparentButton onClick={onDelete}>Löschen</TransparentButton>
            </div>
            {show && <AdressForm setShow={setShow} operation={operation} data={address as Address} />}

        </>
    )
}