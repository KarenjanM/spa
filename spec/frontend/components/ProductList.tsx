import { useApolloClient } from "@apollo/client";
import parse from "html-react-parser";
import { useContext } from "react";
import { CheckoutContext } from "../contexts/checkoutContext";
import { useAddToCheckout } from "../hooks/checkout";
import AddButton from "./buttons/AddButton";

const latestProduct = /* GraphQL */ `
query latestProduct{
    products(
      first: 10,
      channel: "default-channel")
    {
      edges{
        node{
          id,
          name
          thumbnail{
            url
          }
          pricing{
            priceRange{
              stop{
                gross{
                  amount
                  currency
                }
              }
            }
          }
          description
          defaultVariant{
            id
          }
        }
      }
    }
  }
`

export default function ProductList({data, loading, error}){

    if (loading) return <div>Loading</div>;
    if (error) return <div>Error! {error.message}</div>;
    if (data) {
        const latestProducts = data.products.edges || [];

        
        return (
            <div className="grid grid-cols-4 gap-4">
                {latestProducts.map((product) => 
                <div className="bg-white flex place-items-stretch">
                <Product key={product.node.id} product={product}/>
                </div>
                )}
            </div>
        );
    }
}

function Product({product}){
  const client = useApolloClient();
  const checkoutId = useContext(CheckoutContext)
  const addToCheckout = useAddToCheckout(client, checkoutId);
  const productNode = product.node

  function addToCart(){
      addToCheckout({variables: {
        lines: {
          variantId: productNode.defaultVariant.id,
          quantity: 1
        }
    }})
  }
    return (
    <div className="grid max-w-sm grow rounded overflow-hidden shadow-lg">
      <img src={productNode.thumbnail.url} alt="image" className="w-full hover:scale-105 transition"/>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{productNode.name}</div>
      </div>
      {productNode.description ? 
      (
      <ProductDescription>
        {JSON.parse(productNode.description) !== null && parse(JSON.parse(productNode.description).blocks[0].data.text)}
      </ProductDescription>
       ) : (
      <ProductDescription>
        No description yet
      </ProductDescription>)}
      <div className="px-6 pt-4 pb-2 grid grid-cols-2 gap-4">
      <div>
        <AddButton text={"Add to Cart"} onClick={addToCart}/>
      </div>
      <div className="text-center self-center">{productNode.pricing.priceRange.stop.gross.amount} {productNode.pricing.priceRange.stop.gross.currency}</div>
      </div>
    </div>
    )
}

export function ProductDescription({children}){
  return (
    <div className="block text-sm font-medium text-gray-700 text-base px-4">
      {children}
    </div>
  )
}