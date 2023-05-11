import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react"
import { useGetOrderByIdQuery } from "../../../../generated/graphql";
import { AdressBlock } from "../../../components/adress/AdressBlock";
import ErrorBlock from "../../../components/blocks/ErrorBlock";
import Spinner from "../../../components/Spinner";
import getFormattedDate from "../../../lib/getFormattedDate";
import useHideLayout from "../../../hooks/hideLayout";

export default function CheckoutSuccess() {
    const router = useRouter();
    const {orderId} = router.query;
    const { data, loading, error } = useGetOrderByIdQuery({
        variables: {
            id: orderId as string
        }
    });
    useHideLayout();

    let order;
    if (loading) order = <Spinner />
    if (error) order = <ErrorBlock />
    if (data) order = (
        <div className="flex flex-col gap-2">
            <div className="hover:underline hover:underline-offset-2 cursor-pointer text-2xl">
                Gekaufte Produkte:
            </div>
            <ul className="pl-5 list-disc">
                {data?.order?.lines?.map((value) => (
                    <li key={value.id} className="flex flex-row place-items-center">
                        <div>
                            <img src={value.thumbnail.url} alt={value.productName} className="w-24 h-24"/>
                        </div>
                        <div><span>{value.productName}</span> x{value.quantity}</div>
                    </li>
                ))}
            </ul>
            <div className="flex flex-col">
                <div className="text-2xl">
                    Lieferungsadresse:
                </div>
                <div className="px-3">
                    <AdressBlock address={data.order?.shippingAddress}/>
                </div>
            </div>
            <div>
                Status: {data?.order?.isPaid ? <span>Bezahlt <FontAwesomeIcon icon={faCheck} color={"green"} /></span> : "Muss bezahlt werden"}
            </div>
            <div>
                Abgeschlossen: {getFormattedDate(data?.order?.created)}
            </div>
        </div>
    )
    return (
        <div className="flex flex-col place-items-center place-content-center gap-7 min-h-screen">
            <div className="flex flex-row place-items-center place-content-center divide-x-2">
                <div className="text-center text-4xl px-5">
                    Vielen Dank für Ihren Einkauf!
                </div>
                <div className="flex flex-col gap-3 px-5">
                    <div className="text-3xl font-semibold">
                        Ihre Bestellung:
                    </div>
                    <div>
                        {order}
                    </div>
                </div>
            </div>
            <Link href={"/"} className="text-2xl text-sky-700 font-semibold hover:underline hover:underlin-offset-2 shadow-lg px-4 py-2 rounded-lg bg-yellow-400">
                Direkt weitereinkaufen
            </Link>
        </div>
    )
}