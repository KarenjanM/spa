import CheckoutSidebar from "../components/CheckoutSidebar"
import CheckoutForm from "../components/forms/CheckoutForm"
import { useAppSelector } from "../redux/hoooks"


export interface tag{
    type: string
    content: unknown
}

export default function Checkout(){
    const adressOptions = ["Neue Adresse"]
    const countryOptions = [{label: "Deutschland", value: "DE"}]
    const auth = useAppSelector((state) => state.auth)
    let tagsList: tag[];
    if(auth.loggedIn)
        tagsList.push({type: "select", content: {options: adressOptions, label: ""}})
    tagsList = [
        {type: "select", content: {options: countryOptions, label: ""}},
        {type: "input-pair", content: [{type: "text", placeholder: "Vorname"}, {type: "text", placeholder: "Nachname"}]},
        {type: "input", content: {type: "text", placeholder: "Adresse"}},
        {type: "input", content: {type: "text", placeholder: "Wohnung, Zimmer, usw.(optional)"}},
        {type: "input-pair", content: [{type: "text", placeholder: "Postleizahl"}, {type: "text", placeholder: "Stadt"}]},
        {type: "input", content: {type: "tel", placeholder: "Telefon (optional)"}},
    ]
    return (
        <div className="flex flex-row divide-x divide-slate-500">
        <div className="py-20 flex self-center justify-center bg-white px-10">
            <div className="flex flex-col gap-3">
                <div className="text-xl self-start">Lieferadresse</div>
                <CheckoutForm tags={tagsList}/>
            </div>
        </div>
        <CheckoutSidebar lines={lines}/>
        </div>
    )
}