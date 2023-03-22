
import React, { ReactNode } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Checkout } from "../generated/graphql";
import { useGetCheckout } from "../hooks/checkout";


export interface CheckoutConsumerProps {
    checkoutId: string;
    setCheckoutId: (id: string) => void;
    resetCheckoutId: () => void;
    checkout: Checkout | undefined | null;
  }
  
  export const CheckoutContext = React.createContext<CheckoutConsumerProps>({
    checkoutId: "",
    setCheckoutId: () => {},
    resetCheckoutId: () => {},
    checkout: {} as Checkout,
  }) 
  
  export function CheckoutProvider({ children }: { children: ReactNode }) {
    
    const [checkoutId, setCheckoutId] = useLocalStorage("checkoutId", "");
    
    const { data } = useGetCheckout({checkoutId: checkoutId});
    
    const resetCheckoutId = () => setCheckoutId("");
  
    const providerValues: CheckoutConsumerProps = {
      checkoutId,
      setCheckoutId,
      resetCheckoutId,
      checkout: data?.checkout as Checkout,
    };
  
    return <CheckoutContext.Provider value={providerValues}>{children}</CheckoutContext.Provider>;
  }
  