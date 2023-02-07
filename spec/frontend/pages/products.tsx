import { useLatestProductQuery } from "../generated/graphql";
import ProductList from '../components/ProductList';

export default function Products(){
  const { data, loading, error } = useLatestProductQuery();

    return (
        <div className="max-w-7xl mx-auto">
        <ProductList data={data} loading={loading} error={error}/>
        </div>
    )
}