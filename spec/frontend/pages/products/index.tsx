import { useLatestProductQuery } from "../../generated/graphql";
import ProductList from '../../components/ProductList';

export default function Products(){
  const { data, loading, error } = useLatestProductQuery();
  if(error) return <div>Error</div>
  if(loading) return <div>Loading...</div>
  if(data) return (
        <div className="max-w-7xl mx-auto">
        <ProductList products={data.products}/>
        </div>
    )
}