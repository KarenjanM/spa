import React, { useState } from "react";

interface LoadingProps {
    loading: boolean
    setLoading: (value: boolean)=>void
}

export const LoadingContext = React.createContext<LoadingProps>({
    loading: false,
    setLoading: (value)=>{}
})

export function LoadingProvider({children}){
    const [loading, setLoading] = useState(false);
    const providerValues: LoadingProps = {
        loading,
        setLoading
    }
    return (<LoadingContext.Provider value={providerValues}>{children}</LoadingContext.Provider>)
}