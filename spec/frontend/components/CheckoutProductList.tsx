import Image from "next/image";

export default function CheckoutProductList({lines}){
    return (
        <ul className="flex-auto overflow-y-auto divide-y divide-gray-200 px-4 md:pr-4 md:pl-0">
          {lines?.map((line) => {
            if (!line) {
              return null;
            }
            return (
              <li key={line.id} className="flex py-4 space-x-4">
                <div className="border bg-white w-32 h-32 object-center object-cover rounded-md relative">
                  {line.variant.product?.thumbnail && (
                    <Image
                      src={line.variant.product?.thumbnail?.url}
                      alt={line.variant.product?.thumbnail?.alt || ""}
                      fill={true}
                    />
                  )}
                </div>
    
                <div className="flex flex-col justify-between space-y-4">
                  <div className="text-sm font-medium space-y-1">
                    <h3 className="text-gray-900">{line.variant.product}</h3>
                    <p className="text-gray-500">{line.variant}</p>
                    <p className="text-gray-900">{line.totalPrice?.gross}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      );
}