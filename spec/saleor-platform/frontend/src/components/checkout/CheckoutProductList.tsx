export default function CheckoutProductList({lines}){
  console.log(lines);
  
    return (
        <ul className="flex-auto overflow-y-auto divide-y divide-gray-200 px-4 md:pr-4 md:pl-0">
          {lines?.map((line) => {
            if (!line) {
              return null;
            }
            console.log(line);
            
            return (
              <li className="flex flex-row py-4 space-x-4 justify-between">
                <div className="flex flex-row gap-2">
                <div className="border bg-white w-24 h-24 object-center object-cover rounded-md relative">
                  {line.variant.product?.thumbnail && (
                    <img
                      src={line.variant.product?.thumbnail?.url}
                      alt={line.variant.product?.thumbnail?.alt || ""}
                    />
                  )}
                  <div className="absolute right-0 top-0 rounded-full bg-stone-500 w-5 h-5 text-white font-mono text-sm leading-5 text-center">{line.quantity}</div>
                </div>
    
                <div className="flex flex-col justify-between space-y-4">
                  <div className="text-sm font-medium space-y-1">
                    <div className="text-gray-900">{line.variant.product.name}</div>
                    <div className="text-gray-500">{line.variant.name}</div>
                  </div>
                </div>
                </div>
                <div className="">{line.quantity * line.variant.pricing.price.gross.amount}€</div>
              </li>
            );
          })}
        </ul>
      );
}