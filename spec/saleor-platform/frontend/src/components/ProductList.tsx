import Link from "next/link";
import getCurrencySymbol from "../lib/getCurrencySymbol";

export default function ProductList({ products }) {
  const latestProducts = products?.edges ?? products  ?? [];
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 place-items-center gap-4 py-5 ">
      {latestProducts.map((product) =>
        <div key={product?.node?.id ? product?.node?.id : product?.productId} data-testid={`product`} className="bg-white flex place-items-stretch">
          <Product product={product} />
        </div>
      )}
    </div>
  );
}

function Product({ product }: { product: any }) {
  const productNode = product?.node;
  const productPrice = productNode?.pricing?.priceRange?.stop?.gross?.amount ?? product?.grossPrice;
  const productCurrency = getCurrencySymbol(productNode?.pricing?.priceRange?.stop?.gross?.currency);
  return (
    <Link href={`/products/${productNode?.id ?? product?.productId}`} className="group">
      <div className="grid max-w-sm grow rounded overflow-hidden px-6">
        <img src={productNode?.thumbnail?.url ?? product?.thumbnail} alt="image" className="w-full group-hover:scale-105 transition" />
        <div className="mb-2 group-hover:underline">{productNode?.name ?? product?.productName}</div>
        <div className="text-start text-xl self-center">{productPrice}{productCurrency ?? "$"}</div>
      </div>
    </Link>
  )
}

