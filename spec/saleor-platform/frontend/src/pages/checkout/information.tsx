import { useContext, useEffect } from "react"
import CheckoutExpress from "../../components/checkout/CheckoutExpress"
import CheckoutHeader from "../../components/checkout/CheckoutHeader"
import CheckoutSidebar from "../../components/checkout/CheckoutSidebar"
import CheckoutForm from "../../components/forms/CheckoutForm"
import { CheckoutContext } from "../../contexts/checkoutContext"
import { useGetCheckout } from "../../hooks/checkout"
import useGetUser from "../../hooks/user"
import { Checkout, User } from "../../../generated/graphql"
import CheckoutSecure from "../../components/CheckoutSecure"
import ErrorBlock from "../../components/blocks/ErrorBlock"
import Spinner from "../../components/Spinner"


export default function CheckoutInfo(){
    const {checkoutId} = useContext(CheckoutContext)
    const {data, loading, error} = useGetCheckout({checkoutId})
    const {user, userLoading, userError} = useGetUser();
    useEffect(()=>{
        const footer = document.getElementById('footer')
        footer.classList.add("hidden")
        const header = document.getElementById('header')
        header.classList.add("hidden")
        return () => {
            footer.classList.remove('hidden');
            header.classList.remove('hidden');
        }
    }, [])
    if(error || userError) return <ErrorBlock />
    if(loading || userLoading) return <Spinner />
    if (data)
    return (
        <CheckoutSecure>
        <CheckoutLayout>
            <div className="flex flex-col gap-3 py-20 bg-white px-5 sm:px-10 md:pl-20 lg:pl-40">
                <CheckoutHeader checkout={data?.checkout as Checkout} />
                <CheckoutExpress />
                <CheckoutForm checkout={data.checkout as Checkout} checkoutId={checkoutId} user={user as User}/>
            </div>
            <CheckoutSidebar className="hidden lg:block" checkout={data.checkout as Checkout}/>
        </CheckoutLayout>
        </CheckoutSecure>
    )
}

export function CheckoutLayout({children}){
    return(
        <div className="flex flex-col lg:justify-center lg:flex-row min-h-screen divide-x divide-slate-500 md:gap-10">
            {children}
        </div>
    )
}