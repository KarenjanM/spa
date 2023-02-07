import { useRouter } from "next/router";
import ProductList from "../../components/ProductList";
import {useFilterProductsQuery} from "../../generated/graphql"

const filterProducts = /* GraphQL */`
query filterProducts($filter: ProductFilterInput){
  products(
    first: 8,
    channel: "default-channel",
    filter: $filter
  )
  {
    edges{
      node{
        id,
        name
        thumbnail{
          url
        }
        pricing{
            priceRangeUndiscounted{
              stop{
                gross{
                  amount
                  currency
                }
              }
            }
          }
        description
      }
    }
  }
}
`

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
            <ProductList data={data} loading={loading} error={error}/>
        </div>
    )
    }
}