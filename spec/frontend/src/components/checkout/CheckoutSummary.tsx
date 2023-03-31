export default function CheckoutSummary({subtotalPrice, totalPrice, shippingValue}){
    return(
        <>
        <div className="flex flex-col px-4 py-3 gap-3">
            <CheckoutSummaryRow name="Zwischensumme" value={`${subtotalPrice.gross.amount}€`}/>
            <CheckoutSummaryRow name="Versand" value={shippingValue ? `${shippingValue}€` : "Wird im nächsten Schritt berechnet"}/>
      </div>
      <div className="flex flex-row justify-between py-3 px-4">
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
          {totalPrice.gross.amount} €
        </div>
      </div>
    </div>
    </>
    )
}

function CheckoutSummaryRow({name, value, className=""}){
    return (
        <div className="flex flex-row justify-between">
            <div>
              {name}
            </div>
            <div className={`${className}`}>
                {value}
            </div>
        </div>
    )
}