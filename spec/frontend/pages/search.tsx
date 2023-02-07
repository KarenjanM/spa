import Link from "next/link";
import ProductList from "../components/ProductList";
import Search from "../components/Search";
import { useState } from "react";
import { useSearchProductQuery } from '../generated/graphql';



export default function SearchPage(){
    const { data, loading, error } = useSearchProductQuery({
        variables: {
            query: {search: ""}
        }
    });
    const [queryResult, setQueryResult] = useState({
        data: data,
        loading: loading,
        error: error
    })
    console.log(queryResult);
    console.log(data);
    return (
        <div>
        <Search queryResult={queryResult} setQueryResult={setQueryResult}/>
        <ProductList data={queryResult.data} loading={queryResult.loading} error={queryResult.error}/>
        </div>
    )
}
