import { useContext, useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import { 
    CheckoutLineInput,
    useLineUpdateMutation,
    useDeleteLinesMutation,
    useGetCheckoutQuery, 
    useAddLineMutation,
    GetCheckoutQueryResult,
    useCreateCheckoutMutation,} from "../../generated/graphql";

export function useUpdateQuantity({checkoutId}){
    const [lineUpdateMutation, {loading}] = useLineUpdateMutation({
        variables:{
            checkoutId: checkoutId,
            lines: []
        }
    })
    return {lineUpdateMutation, updateLoading: loading}
}

export function useGetCheckout({checkoutId=""}): GetCheckoutQueryResult{
    const {data, loading, error} = useGetCheckoutQuery({
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
    const [removeProduct, {loading}] = useDeleteLinesMutation({
        variables: {
            checkoutId: checkoutId,
            linesIds: []
        }
    })
    return {removeProduct, removeLoading: loading}
}

export function useCreateCheckout(){
    const [createCheckoutMutation, {loading}] = useCreateCheckoutMutation({
        variables: {
            input: {
                channel: "default-channel",
                lines: []
            }
        }
    });
    return {createCheckoutMutation, createCheckoutLoading: loading}
}