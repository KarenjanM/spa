import useCreateCheckout from "../hooks/checkout";
import CheckoutProductList from "./CheckoutProductList";



export default function CheckoutSidebar({lines}){
    return(
        <section className="max-w-md w-full flex flex-col ">
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 md:pr-4 md:py-4 md:pl-0 p-4">
        Sidebar
      </h1>

      <CheckoutProductList lines={lines} />
    </section>
    )
}