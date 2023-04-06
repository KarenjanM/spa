import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faApple, faGoogle, faPaypal } from '@fortawesome/free-brands-svg-icons'
export default function CheckoutExpress() {
    return (
        <div className="flex flex-col gap-3">
            <div className="inline-flex items-center place-content-center relative">
                <hr className="w-full my-8 bg-gray-500 "/>
                <span className="absolute px-3 font-medium text-gray-900 bg-white">Express Checkout</span>
            </div>
            <div className="flex flex-row gap-3 justify-between">
                <PaymentButton icon={faPaypal} />
                <PaymentButton icon={faApple} />
                <PaymentButton icon={faGoogle} />
            </div>
            <div className="inline-flex items-center place-content-center relative">
                <hr className="w-full my-8 bg-gray-500 "/>
                <span className="absolute px-3 font-medium text-gray-900 bg-white">ODER</span>
            </div>
        </div>
    )
}

export function PaymentButton({ icon }) {
    return (
        <button className={`flex place-items-center grow place-content-center py-1 rounded-lg ${icon == faPaypal ? 'bg-yellow-500' : 'bg-black'}  gap-1`}>
            <FontAwesomeIcon icon={icon} size={"xl"} color={icon == faPaypal ? 'blue' : 'white'} />
            <div className={`${icon == faPaypal ? 'text-sky-700' : 'text-white'} text-2xl`}>Pay</div>
        </button>
    )
}