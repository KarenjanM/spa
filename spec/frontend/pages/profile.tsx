import { useRouter } from "next/router"
import { useEffect } from "react";
import { useAppSelector } from "../redux/hoooks"
import { useGetUserQuery } from "../generated/graphql";

const getUser = /* GraphQL */`
  query getUser{
    me{
      email
      firstName
      lastName
    }
  }
`
const tokenDeactivate = /* GraphQL */`
  mutation tokenDeactivate{
    tokensDeactivateAll{
      errors{
        message
      }
    }
  }
`


export default function Profile(){
    const auth = useAppSelector((state)=>state.auth);
    const router = useRouter();
    const {data, loading, error} = useGetUserQuery();
    
    useEffect(()=> {!auth.loggedIn && router.push("/login")}, [auth.loggedIn])
    if(loading) return <>Loading</>
    if(error) return <>Error</>
    if(auth.loggedIn){
    return (
        <>
        <div className="container grid grid-rows-2 gap-8 content-center py-20 px-20">
          <div>
          <div className="text-3xl">
              Konto
          </div>
          <button className="text-gray-700 underline" onClick={()=>router.push("/logout")}>
            Abmelden
          </button>
          </div>
          <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-3">
            <div className="text-2xl">Bestellhistorie</div>
            <div className="text-gray-700">
              Du hast noch keine Bestellungen aufgegeben.
            </div>
          </div>
          <div className="flex-col gap-3">
            <div className="text-2xl">Kontodetails</div>
            <div className="text-gray-700">
              <div className="text-lg">{data.me.firstName} {data.me.lastName}</div>
              <div className="text-lg">Deutschland</div>
            </div>
          </div>
          </div>
        </div>
        </>
      )
    }
    else
      return <></>
}