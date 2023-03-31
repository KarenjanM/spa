import { useLatestProductQuery } from "../../../generated/graphql";
import ProductList from '../../components/ProductList';
import { ClipLoader } from "react-spinners";
import Spinner from "../../components/Spinner";
import ErrorBlock from "../../components/blocks/ErrorBlock";
import { useContext } from "react";
import { CheckoutContext } from "../../contexts/checkoutContext";

export default function Products(){
  const { data, loading, error } = useLatestProductQuery();
  const {resetCheckoutId} = useContext(CheckoutContext);
  if(error) return <ErrorBlock />;
  if(loading) return <Spinner />;
  if(data) return (
        <div className="max-w-7xl mx-auto">
        <ProductList products={data.products}/>
        </div>
    )
}