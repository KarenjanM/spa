import { useContext, useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import { 
    CheckoutLineInput,
    useLineUpdateMutation,
    useDeleteLinesMutation,
    useGetCheckoutQuery, 
    useAddLineMutation,
    GetCheckoutQueryResult,} from "../generated/graphql";

const createCheckout = /* GraphQL */`
mutation createCheckout($input: CheckoutCreateInput!){
    checkoutCreate(input: $input){
      checkout{
        id
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
}
`
const lineDelete = /* GraphQL */`
mutation deleteLines($checkoutId: ID, $linesIds:[ID!]!){
    checkoutLinesDelete(id: $checkoutId, linesIds: $linesIds){
      checkout{
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
    errors{
      message
      code
    }
  }
}
`
const addToCheckout = /* GraphQL */`
mutation addLine($checkoutId: ID, $lines: [CheckoutLineInput!]!){
    checkoutLinesAdd(checkoutId: $checkoutId, lines: $lines){
      checkout{
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
}
`
// export default function useCreateCheckout({client=useApolloClient(), lines=[]}){
//     const [checkoutData, setData] = useState("");
//     const {checkout, setCheckoutId, checkoutId} = useContext(CheckoutContext)
    
    
//     useEffect(()=>{
//         if(!checkout)
        
        
//     }, [checkout]);
//     return checkoutData ?? checkoutId
// }

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
      }
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