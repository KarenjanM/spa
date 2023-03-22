import { useRouter } from "next/router";
import ProductList from "../../components/ProductList";
import {useFilterProductsQuery} from "../../generated/graphql"

export default function Collection(){
    const router = useRouter();
    const {col} = router.query;
    console.log(col);
    
    const {data, loading, error} = useFilterProductsQuery({
        variables: {
            filter: {
                categories: [col as string]
            }
        } 
    })
    if (loading) return <div>Loading</div>;
    if (error) return <div>Error! {error.message}</div>;
    if (data) {
    return (
        <div className="max-w-7xl mx-auto">
            <ProductList products={data.products}/>
        </div>
    )
    }
}