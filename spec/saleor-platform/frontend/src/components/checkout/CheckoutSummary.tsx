import getPrettyPrice from "../../lib/getPrettyPrice"

export default function CheckoutSummary({subtotalPrice, totalPrice, shippingValue, discount}){
    return(
        <>
        <div className="flex flex-col px-4 py-3 gap-3">
            <CheckoutSummaryRow name="Zwischensumme" value={`${subtotalPrice.gross.amount}€`}/>
            <CheckoutSummaryRow name="Versand" value={shippingValue ? `${shippingValue}€` : "Wird im nächsten Schritt berechnet"}/>
      </div>
      <div className="flex flex-col gap-2 md:flex-row md:justify-between md:place-items-center plac-items-start py-3 px-4">
      <div className="flex flex-col">
        <div>
          Gesamt
        </div>
        <div className="text-sm text-gray-500">
          inkl. 6,39 € MwSt
        </div>
      </div>
      <div className="flex flex-row gap-2 place-items-center">
        <div className="flex text-sm text-gray-500">
          EUR
        </div>
        <div className="text-xl">
          {discount?.amount > 0 ? (
          <div className="flex flex-col sm:flex-row gap-1">
            <span className="line-through decoration-red-500">{getPrettyPrice(totalPrice.gross.amount + discount?.amount)}</span>
            <div>{getPrettyPrice(totalPrice.gross.amount)} €</div>
          </div>
            ) : <div>{getPrettyPrice(totalPrice.gross.amount)} €</div>}
        </div>
      </div>
    </div>
    </>
    )
}

function CheckoutSummaryRow({name, value, className=""}){
    return (
        <div className="flex flex-col gap-1 sm:gap-0 lg:flex-row justify-between">
            <div>
              {name}
            </div>
            <div className={`${className}`}>
                {value}
            </div>
        </div>
    )
}