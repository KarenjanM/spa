import { useContext, useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import { 
    CheckoutLineInput,
    useLineUpdateMutation,
    useDeleteLinesMutation,
    useGetCheckoutQuery, 
    useAddLineMutation,
    GetCheckoutQueryResult,} from "../generated/graphql";

export function useUpdateQuantity({checkoutId}){
    const [lineUpdateMutation] = useLineUpdateMutation({
        variables:{
            checkoutId: checkoutId,
            lines: []
        }
    })
    return lineUpdateMutation
}

export function useGetCheckout({client=useApolloClient(), checkoutId=""}): GetCheckoutQueryResult{
    const {data, loading, error} = useGetCheckoutQuery({
      client: client,
      variables: {
          id: checkoutId
      },
      skip: !checkoutId
  })
  return {data, loading, error} as GetCheckoutQueryResult;
}

export function useAddToCheckout({client=useApolloClient(), checkoutId=""}){
    const [addToCheckout, {loading}] = useAddLineMutation({
        client: client,
        variables:{
            checkoutId: checkoutId,
            lines: []
        }
    })
    return {addToCheckout, isLoading: loading}
}

export function useRemoveProduct({checkoutId}){
    const [removeProduct] = useDeleteLinesMutation({
        variables: {
            checkoutId: checkoutId,
            linesIds: []
        }
    })
    return removeProduct
}