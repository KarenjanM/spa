
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

export default function Profile(){
    const auth = useAppSelector((state)=>state.auth);
    const router = useRouter();
    const {data, loading, error} = useGetUserQuery();
    useEffect(()=> {!auth.isVerified && router.push("/login")})
    if(auth.isVerified)
    return (
        <>
        {data.me}
        </>
      )
    else
      return <></>
}

