import { useContext, useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import { 
    CheckoutLineInput,
    Checkout,
    useLineUpdateMutation,
    useDeleteLinesMutation,
    useCreateCheckoutMutation,
    useGetCheckoutQuery, 
    GetCheckoutQuery,
    useAddLineMutation} from "../generated/graphql";
import { CheckoutContext } from "../contexts/checkoutContext";

const createCheckout = /* GraphQL */`
mutation createCheckout($input: CheckoutCreateInput!){
    checkoutCreate(input: $input){
      checkout{
        id
        lines{
          id
        }
      }
    }
  }
`
const getCheckout = /* GraphQL */`
query getCheckout($id: ID){
  checkout(id: $id){
    id
    totalPrice{
      gross{
        amount
      }
    }
    lines{
      id
      quantity
      variant{
        id
        product{
          name
          thumbnail{
            url
          }
        }
        media{
          url
        }
        pricing{
          price{
            gross{
              amount
            }
          }
        }
      }
    }
  }
}
`
const lineUpdate = /* GraphQL */`
mutation lineUpdate($checkoutId: ID, $lines: [CheckoutLineUpdateInput!]!){
    checkoutLinesUpdate(checkoutId: $checkoutId,lines: $lines){
      checkout{
        id
        lines{
          id
        }
      }
    }
  }
`
const lineDelete = /* GraphQL */`
mutation deleteLines($checkoutId: ID, $linesIds:[ID!]!){
    checkoutLinesDelete(id: $checkoutId, linesIds: $linesIds){
      checkout{
        id
        lines{
          id
        }
      }
    }
  }
`
const addToCheckout = /* GraphQL */`
mutation addLine($checkoutId: ID, $lines: [CheckoutLineInput!]!){
    checkoutLinesAdd(
      checkoutId: $checkoutId,
      lines: $lines
    ){
      checkout{
        id
        lines{
          id
        }
      }
    }
  }
`
export default function useCreateCheckout(client, lines){
    const [checkoutData, setData] = useState({});
    const checkout = useContext(CheckoutContext)
    const [createCheckoutMutation] = useCreateCheckoutMutation({
        client: client,
        variables: {
            input: {
                channel: "default-channel",
                lines: lines as CheckoutLineInput[]
            }
        }
    });

    useEffect(()=>{
        if(!checkout)
        createCheckoutMutation()
                .then((data)=>{
                    console.log(data.data);
                    setData(data.data.checkoutCreate.checkout);
                    client.resetStore()
                })
        
    }, [checkout]);
    return checkoutData as Checkout
}

export function useUpdateQuantity(checkoutId){
    const [increaseItemQuantity] = useLineUpdateMutation({
        variables:{
            checkoutId: checkoutId,
            lines: []
        }
    })
    return increaseItemQuantity
}

export function useGetCheckout(client, checkoutId){
    const {data, loading, error} = useGetCheckoutQuery({
        client: client,
        variables: {
            id: checkoutId
        }
    })

    
    return {data, loading, error}
}

export function useAddToCheckout(client, checkoutId){
    const [addToCheckout] = useAddLineMutation({
        client: client,
        variables:{
            checkoutId: checkoutId,
            lines: []
        }
    })
    return addToCheckout
}

export function useRemoveProduct(checkoutId){
    const [removeProduct] = useDeleteLinesMutation({
        variables: {
            checkoutId: checkoutId,
            linesIds: []
        }
    })
    return removeProduct
}