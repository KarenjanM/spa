
import React, { ReactNode, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export interface authInterface{
    isRefreshNeeded: boolean, 
    setRefreshNeeded: (value: string)=>void
}

export const AuthContext = React.createContext<authInterface>({
    isRefreshNeeded: false,
    setRefreshNeeded: ()=>{}
}) 
  
  export function AuthProvider({ children }: { children: ReactNode }) {

    const [isRefreshNeeded, setRefreshNeeded] = useLocalStorage("isRefreshNeeded", "");

    const authValues : authInterface = {
        isRefreshNeeded: isRefreshNeeded === 'true',
        setRefreshNeeded: setRefreshNeeded
    }

    return <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>;
  }
  