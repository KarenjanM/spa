import { useLatestProductQuery } from "../../../generated/graphql";
import ProductList from '../../components/ProductList';
import Spinner from "../../components/Spinner";
import ErrorBlock from "../../components/blocks/ErrorBlock";
import Pagination from "../../components/Pagination";
import { useState } from "react";

export type AfterBefore = {after?: string, before?: string}

export default function Products(){
  const [afterBefore, setAfterBefore] = useState<AfterBefore>({after: "", before: ""})
  const { data, loading, error } = useLatestProductQuery({
    variables:{
      after: afterBefore?.after,
      before: afterBefore?.before,
      first: afterBefore?.before ? null : 12,
      last: afterBefore?.before ? 12 : null
    }
  });
  const pageInfo = data?.products?.pageInfo 
  if(error) return <ErrorBlock />;
  if(loading) return <Spinner />;
  if(data) return (
        <div className="max-w-7xl mx-auto flex flex-col place-items-center">
          <ProductList products={data?.products}/>
          <Pagination {...pageInfo} setAfterBefore={setAfterBefore}/>
        </div>
    )
}