import parse from "html-react-parser";
import { useDispatch } from "react-redux";
import { addToCart } from '../redux/cart.slice';
import AddButton from "./buttons/AddButton";

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

export default function ProductList({data, loading, error}){

    if (loading) return <div>Loading</div>;
    if (error) return <div>Error! {error.message}</div>;
    if (data) {
        const latestProducts = data.products.edges || [];
        const descriptions = latestProducts.map(({node: {description}}) => {
          try{
            return JSON.parse(description) !== null && JSON.parse(description).blocks[0].data.text
          }catch(e){
            console.log(e.message);
            
          }
        })
        console.log(descriptions)
        return (
            <div className="grid grid-cols-4 gap-4">
                {latestProducts.map((product) => 
                <div className="bg-white flex place-items-stretch">
                <Product product={product}/>
                </div>
                )}
            </div>
        );
    }
}

function Product({product}){
  const dispatch = useDispatch();

  console.log(product);
  const productNode = product.node
  if (productNode.description)
    return (
    <div className="grid max-w-sm grow rounded overflow-hidden shadow-lg">
      <img src={productNode.thumbnail.url} alt="image" className="w-full hover:scale-105 transition"/>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{productNode.name}</div>
      </div>
      <div className="block text-sm font-medium text-gray-700 text-base px-4">
        {JSON.parse(productNode.description) !== null && parse(JSON.parse(productNode.description).blocks[0].data.text)}
      </div>
      <div className="px-6 pt-4 pb-2 grid grid-cols-2 gap-4">
      <div>
        <AddButton text={"Add to Cart"} onClick={()=>dispatch(addToCart(productNode))}/>
      </div>
      <span className="text-center self-center">{productNode.pricing.priceRangeUndiscounted.stop.gross.amount} {productNode.pricing.priceRangeUndiscounted.stop.gross.currency}</span>
      </div>
    </div>
    )
  else
  return (
    <div className="grid max-w-sm grow rounded overflow-hidden shadow-lg">
      <img src={productNode.thumbnail.url} alt="image" className="w-full hover:scale-105 transition"/>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{productNode.name}</div>
      </div>
      <div className="block text-sm font-medium text-gray-700 text-base px-4">
        No description yet
      </div>
      <div className="px-6 pt-4 pb-2 grid grid-cols-2 gap-4">
      <div>
        <AddButton text={"Add to Cart"} onClick={()=>dispatch(addToCart(product))}/>
      </div>
      <span className="text-center self-center">{productNode.pricing.priceRangeUndiscounted.stop.gross.amount} {productNode.pricing.priceRangeUndiscounted.stop.gross.currency}</span>
      </div>
    </div>
    )
}