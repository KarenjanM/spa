import { useState } from "react";
import { Checkout } from "../../../generated/graphql";
import SkyButton from "../buttons/SkyButton";
import { CheckoutInput } from "./CheckoutInput";
import CheckoutProductList from "./CheckoutProductList";
import CheckoutSummary from "./CheckoutSummary";



export default function CheckoutSidebar({ checkout } : {checkout: Checkout}) {
  const [disabled, setDisabled] = useState(true);
  function onClick(){
    console.log("clicked");
  }
  return (
    <div className="py-10 bg-stone-200 w-full flex flex-col pl-5 pr-40 col-span-2">
      <div className="divide-y divide-gray-400">
        <CheckoutProductList lines={checkout.lines} />
        <div className="flex flex-row justify-between gap-3 py-3">
          <CheckoutInput onChange={()=>{}} setDisabled={setDisabled} className={"border-gray-400 grow"} type={"text"} placeholder={"Rabattcode"} />
          <SkyButton disabled={disabled}>Anwenden</SkyButton>
        </div>
        <CheckoutSummary shippingValue={checkout.shippingPrice?.gross?.amount} totalPrice={checkout.totalPrice} subtotalPrice={checkout.subtotalPrice}/>
    </div>
    </div>
  )
}