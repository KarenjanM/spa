import { useRouter } from "next/router"
import { useAppSelector } from "../redux/hooks"
import { GetUserQuery, useGetUserQuery } from "../../generated/graphql";
import Link from "next/link";
import Authorization from "../components/Authorization";
import ErrorBlock from "../components/blocks/ErrorBlock";
import Spinner from "../components/Spinner";
import ProfileLayout from "../components/layouts/ProfileLayout";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import getFormattedDate from "../lib/getFormattedDate";
import { QueryResult } from "@apollo/client";
import { ApolloError } from "apollo-client";
import { AdressBlock } from "../components/adress/AdressBlock";
import { Divider } from "semantic-ui-react";


export default function Profile() {
  const auth = useAppSelector((state) => state.auth);
  const router = useRouter();
  const { data, loading, error } = useGetUserQuery();
  const [showOrders, setShowOrders] = useState(false);
  let component = <></>;
  if (loading) component = <Spinner />
  if (error) component = <ErrorBlock />
  if (auth.loggedIn) {
    component = (
      <ProfileLayout>
        <div>
          <ProfileHeader size="4xl">
            Konto
          </ProfileHeader>
          <button className="text-gray-700 underline underline-offset-2" onClick={() => router.push("/logout")}>
            Abmelden
          </button>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-3 cursor-pointer" >
            <ProfileHeader size="3xl" onClick={() => setShowOrders(!showOrders)}>
              Bestellhistorie
            </ProfileHeader>
            <Orders data={data} loading={loading} error={error} />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <ProfileHeader onClick={() => setShowOrders(!showOrders)} size="3xl">
                Kontodetails
              </ProfileHeader>
              <div className="text-lg">
                {data?.me.firstName} {data?.me?.lastName}
              </div>
              {data?.me?.addresses?.length > 0 ? (
                <div className="flex flex-col">
                  <div>Standartadresse: </div>
                  <div className="px-2">
                    <AdressBlock address={data?.me.addresses[0]} />
                  </div>
                </div>) : (<div className="text-stone-500">Noch keine Adresse gestellt</div>)}
            </div>
            <Link href={'/adresses'} className="underline underline-offset-2 hover:decoration-2">Adressen anzeigen</Link>
          </div>
        </div>
      </ProfileLayout>
    )
  }
  return (
    <Authorization>
      {component}
    </Authorization>
  )
}

export function ProfileHeader({ size, children, onClick }: { size: "2xl" | "3xl" | "4xl", children, onClick?: () => void }) {
  return (
    <div className={`text-${size}`} onClick={onClick}>
      {children}
    </div>
  )
}

export function Orders({ data, loading, error }: { data: GetUserQuery, loading: boolean, error: ApolloError }) {
  const [show, setShow] = useState(false);
  if (error) return <ErrorBlock />
  if (loading) return <Spinner />
  if (data) {
    console.log(data?.me?.orders?.edges[0]);

    let component = data?.me?.orders?.edges?.length > 0 ? (
      <div className="flex flex-col gap-4 px-3">
        <div className="flex flex-col">
          {!show && <div>Letzte Bestellung: </div>}
          <Order node={data?.me?.orders?.edges[0].node} />
        </div>
        {show && data?.me?.orders?.edges?.slice(1).map(({ node }) => (
          <Order node={node} />
        ))}
        <div className="text-sky-700" onClick={() => setShow(!show)}>
          {show ? "Bestellungen ausblenden" : "Alle Bestellung ansehen"}
        </div>
      </div>
    ) : (
      <div className="text-gray-700">
        Du hast noch keine Bestellungen aufgegeben.
      </div>
    )
    return <>{component}</>
  }
}

export function Order({ node }) {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col gap-2 px-2 shadow-lg py-4 rounded-lg">
      <div className="hover:underline hover:underline-offset-2 cursor-pointer" onClick={() => setShow(!show)}>
        Gekaufte Produkte ansehen <FontAwesomeIcon icon={show ? faChevronUp : faChevronDown} />
      </div>
      {show && <ul className="pl-5 list-disc">
        {node?.lines?.map((value) => (
          <li>
            <span>{value.productName}</span> x{value.quantity}
          </li>
        ))}
      </ul>}
      <div>
        Status: {node?.isPaid ? <span>Bezahlt <FontAwesomeIcon icon={faCheck} color={"green"} /></span> : "Muss bezahlt werden"}
      </div>
      <div>
        Abgeschlossen: {getFormattedDate(node?.created)}
      </div>
    </div>
  )
}