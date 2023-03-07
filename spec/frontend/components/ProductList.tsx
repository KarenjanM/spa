import Link from "next/link";


const latestProduct = /* GraphQL */ `
query latestProduct{
    products(
      first: 10,
      channel: "default-channel")
    {
      edges{
        node{
          id,
          name
          thumbnail{
            url
          }
          pricing{
            priceRange{
              stop{
                gross{
                  amount
                  currency
                }
              }
            }
          }
          description
          defaultVariant{
            id
          }
        }
      }
    }
  }
`

export default function ProductList({data, loading, error}){

    if (loading) return <div>Loading</div>;
    if (error) return <div>Error! {error.message}</div>;
    if (data) {
        const latestProducts = data.products.edges || [];

        
        return (
            <div className="grid grid-cols-4 gap-4 py-6">
                {latestProducts.map((product) => 
                <div className="bg-white flex place-items-stretch">
                <Product key={product.node.id} product={product}/>
                </div>
                )}
            </div>
        );
    }
}

function Product({product}){
  const productNode = product.node

  
    return (
      <Link href={`products/${productNode.id}`} className="group">
      <div className="grid max-w-sm grow rounded overflow-hidden px-6">
        <img src={productNode.thumbnail.url} alt="image" className="w-full group-hover:scale-105 transition"/>
          <div className="mb-2 group-hover:underline">{productNode.name}</div>
        <div className="text-start text-xl self-center">${productNode.pricing.priceRange.stop.gross.amount} {productNode.pricing.priceRange.stop.gross.currency}</div>
      </div>
    </Link>
    )
}

