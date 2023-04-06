import { useRouter } from "next/router";
import parse from "html-react-parser";
import { useContext, useState } from "react";
import { CheckoutContext } from "../../contexts/checkoutContext";
import { useAddToCheckout } from "../../hooks/checkout";
import AddButton from "../../components/buttons/AddButton";
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import { useCreateCheckoutMutation, useGetProductByIdQuery } from "../../../generated/graphql";
import Spinner from "../../components/Spinner";
import ErrorBlock from "../../components/blocks/ErrorBlock";


export default function Product() {
  const [quantity, setQuantity] = useState(1);
  const {checkoutId, setCheckoutId, checkout} = useContext(CheckoutContext);
  const router = useRouter();
  const [createCheckoutMutation] = useCreateCheckoutMutation({
    variables: {
        input: {
            channel: "default-channel",
            lines: []
        }
    }
});
  const { id } = router.query;
  let {addToCheckout, isLoading} = useAddToCheckout({})
  const { data, loading, error } = useGetProductByIdQuery({
    variables: {
      id: id as string
    }
  })
  async function addToCart() {
    console.log("adding in Checkout");
    console.log("checkoutId " + checkoutId);
    
    if(checkoutId){
    console.log("ADDED");  
    await addToCheckout({
      variables: {
        checkoutId: checkoutId,
        lines: [{
          variantId: data.product.defaultVariant.id,
          quantity: quantity
        }]
      }
    }).then((data)=>{
      console.log(data);
    })
  }
  else{
    console.log("Creating Checkout with this product");
    
    await createCheckoutMutation({
      variables: {
        input: {
          channel: "default-channel",
          lines:[
            {
              variantId: data.product.defaultVariant.id,
              quantity: quantity
            }
          ]
        }
      }
    }).then((data)=>{
                    console.log(data.data);
                    setCheckoutId(data.data.checkoutCreate.checkout.id)
                    isLoading=true
                  })
  }
  }
  if (error) return <ErrorBlock />
  if (loading) return <Spinner />;
  if (data) {
    const product = data.product
    return (
      <div className="md:grid md:grid-cols-2 mx-20 my-10">
        <div>
          <div className="grid max-w-sm grow rounded overflow px-6">
            <img src={product.thumbnail.url} alt="image" className="w-full group-hover:scale-105 transition" />
          </div>
        </div>
        <ProductSidebar quantity={quantity} setQuantity={setQuantity} product={product} addToCheckout={addToCart} isLoading={isLoading}/>
      </div>
    )
  }
}

export function ProductDescription({ children }) {
  return (
    <div className="block text-sm font-medium text-gray-700 text-base">
      {children}
    </div>
  )
}

export function ProductSidebar({ quantity, setQuantity, product, addToCheckout, isLoading }) {
  
  return (
    <div className="flex flex-col gap-4">
      <div className="text-3xl mb-2 group-hover:underline">{product.name}</div>
      <div className="text-start text-xl self-start">${product.pricing.priceRange.stop.gross.amount} {product.pricing.priceRange.stop.gross.currency}</div>
      <ProductQuantity quantity={quantity} setQuantity={setQuantity}/>
      {isLoading ? <AddButton className="self-start" text={"Loading"} onClick={addToCheckout} disabled={true}/> : <AddButton className="self-start" text={"In den Warenkorb liegen"} onClick={addToCheckout} disabled={false}/>}
      <div className="self-start">
            {product.description ? (
              <ProductDescription>
                {JSON.parse(product.description) !== null && parse(JSON.parse(product.description).blocks[0].data.text)}
              </ProductDescription>) : (
              <ProductDescription>
                No description yet
              </ProductDescription>
            )}
          </div>
    </div>
  )
}
export function ProductQuantity({quantity, setQuantity}) {
  function decreaseQ(){
    if(quantity > 1)
      setQuantity(quantity-1)
  }
  return (
    <div>
    <div></div>
    <div className='flex flex-row gap-4'>
      <div className="flex flex-row gap-4 px-2 border border-black">
        <button onClick={decreaseQ}>
          <MinusIcon className='h-4 w-4' />
        </button>
        <p>{quantity}</p>
        <button onClick={()=>setQuantity(quantity+1)}>
          <PlusIcon className='h-4 w-4' />
        </button>
      </div>
    </div>
    </div>
  )
}