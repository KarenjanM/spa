import Link from "next/link";
import { useHits } from "react-instantsearch-hooks-web";
import ProductList from "../ProductList";

export function Hits({ className, isFullPage }: { className?: string, isFullPage: boolean }) {
    const { hits } = useHits();
    let productHits = [];
    let productId: any = "";
    for (let i = 0; i < hits.length; i++) {
      if (productId != hits[i].productId) {
        productHits.push(hits[i]);
        productId = hits[i].productId;
      }
    }
  
    if (isFullPage) return (
      <div>
        <ProductList products={productHits} />
      </div>
    )
    else return (
      <div>
        {productHits.splice(0, 4).map((hit) => <Hit className={className} hit={hit} />)}
      </div>
    )
  }

  function Hit({ hit, className }: { hit: any, className?: string }) {
    console.log(hit);
  
    return (
      <Link href={`/products/${hit.productId}`}>
        <div className={`${className} flex flex-row place-items-center hover:bg-stone-700`}>
          <img src={hit.thumbnail} alt={hit.productName} className="flex self-start w-16" />
          <div>{hit.productName}</div>
        </div>
      </Link>
    )
  }