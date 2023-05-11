import { useContext, useEffect } from "react"
import CheckoutExpress from "../../components/checkout/CheckoutExpress"
import CheckoutHeader from "../../components/checkout/CheckoutHeader"
import CheckoutSidebar from "../../components/checkout/CheckoutSidebar"
import CheckoutForm from "../../components/forms/CheckoutForm"
import { CheckoutContext } from "../../contexts/checkoutContext"
import { useGetCheckout } from "../../hooks/checkout"
import useGetUser from "../../hooks/user"
import { Checkout, User } from "../../../generated/graphql"
import ErrorBlock from "../../components/blocks/ErrorBlock"
import Spinner from "../../components/Spinner"
import NoCheckout from "../../components/NoCheckout"
import useHideLayout from "../../hooks/hideLayout"


export default function CheckoutInfo(){
    const {checkoutId, resetCheckoutId} = useContext(CheckoutContext);
    const {data, loading, error, refetch} = useGetCheckout({checkoutId})
    const {user, userLoading, userError} = useGetUser();
    useHideLayout();
    if(error || userError) return <ErrorBlock />
    if(loading || userLoading) return <Spinner />
    if (data)
        if(data?.checkout?.lines?.length>=1)
            return (
                <>
            <CheckoutLayout>
                <div className="flex flex-col gap-3 py-20 bg-white px-5 sm:px-10 md:pl-20 lg:pl-40">
                    <CheckoutHeader checkout={data?.checkout as Checkout} />
                    <CheckoutExpress resetCheckoutId={resetCheckoutId} refetch={refetch} checkout={data?.checkout as Checkout}/>
                    <CheckoutForm refetch={refetch} checkout={data.checkout as Checkout} checkoutId={checkoutId} user={user as User}/>
                </div>
                <CheckoutSidebar className="hidden lg:block" checkout={data.checkout as Checkout}/>
            </CheckoutLayout>
            </>
        )
        if(!checkoutId || data?.checkout?.lines?.length < 1)
        return <NoCheckout />
}

export function CheckoutLayout({children}){
    return(
        <div className="flex flex-col lg:justify-center lg:flex-row min-h-screen divide-x divide-slate-500 md:gap-10">
            {children}
        </div>
    )
}