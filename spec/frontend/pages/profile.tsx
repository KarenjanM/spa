import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hoooks"
import { useGetUserQuery, useTokenDeactivateMutation } from "../generated/graphql";
import { setContext } from '@apollo/client/link/context';
import { onError } from "@apollo/client/link/error";
import { ApolloClient, createHttpLink, from, InMemoryCache } from '@apollo/client';
import {store} from '../redux/store';
import { setTokens, verify } from "../redux/auth.slice";
import { log } from "console";

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
    const dispatch = useAppDispatch();
    const router = useRouter();
    const {data, loading, error} = useGetUserQuery({
      client: auth_client
    });
    const [tokenDeactivateMutation] = useTokenDeactivateMutation({
      client: auth_client
  });
    function logout(){
      if(auth.isVerified)
          tokenDeactivateMutation()
              .then(()=>{
                  dispatch(verify(false))
                  dispatch(setTokens({userToken: "", refreshToken: ""}))
                  console.log("LOGGED OUT")})
  }
    useEffect(()=> {!auth.isVerified && router.push("/login")}, [auth.isVerified])
    if(loading) return <>Loading</>
    if(error) return <>Error</>
    if(auth.isVerified){
    return (
        <>
        <div className="container grid grid-rows-2 gap-8 content-center py-20 px-20">
          <div>
          <div className="text-3xl">
              Konto
          </div>
          <button className="text-gray-700 underline" onClick={logout}>
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

const httpLink = createHttpLink({
    uri: 'https://brunswick.stepzen.net/api/saleor-strapi/__graphql'
  });
  
  const authLink = setContext((_, { headers }) => {
    const token = store.getState().auth.userToken
    console.log(token)
    return {
      headers: {
        ...headers,
        authorization: token ? 'Bearer ' + token : null,
      }
    }
  });
  
  const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions.code) {
          // Apollo Server sets code to UNAUTHENTICATED
          // when an AuthenticationError is thrown in a resolver
          case 'UNAUTHENTICATED':
          // Modify the operation context with a new token
            const oldHeaders = operation.getContext().headers;
            operation.setContext({
              headers: {
                ...oldHeaders,
                authorization: store.getState().auth.userToken,
              },
            });
            // Retry the request, returning the new observable
            return forward(operation);
        }
      }
    }
  
    // To retry on network errors, we recommend the RetryLink
    // instead of the onError link. This just logs the error.
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  });
  
  
  export const auth_client = new ApolloClient({
    link: from([authLink.concat(httpLink), errorLink]),
    cache: new InMemoryCache()
  });
  