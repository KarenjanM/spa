import { useLatestProductQuery } from "../../../generated/graphql";
import ProductList from '../../components/ProductList';
import Spinner from "../../components/Spinner";
import ErrorBlock from "../../components/blocks/ErrorBlock";

export default function Products(){
  const { data, loading, error } = useLatestProductQuery();
  if(error) return <ErrorBlock />;
  if(loading) return <Spinner />;
  if(data) return (
        <div className="max-w-7xl mx-auto">
          <ProductList products={data.products}/>
        </div>
    )
}