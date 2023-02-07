import { useAppSelector, useAppDispatch } from '../redux/hoooks';
import {
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
  } from '../redux/cart.slice';
import {PlusIcon, MinusIcon, TrashIcon} from '@heroicons/react/24/outline';

export default function Cart(){
    const cart = useAppSelector((state) => state.cart);

    const getTotalPrice = () => {
        let totalPrice = cart.reduce(
          (accumulator, item) => accumulator + item.quantity * item.pricing.priceRangeUndiscounted.stop.gross.amount,
          0
        );
        return Math.round(totalPrice * 100) / 100
      };

    const dispatch = useAppDispatch();

    return (
        <>
        <div className="flex flex-col container py-10 mx-auto gap-4">
            {cart.length === 0 ? (
                <div className='text-center text-2xl font-extrabold'>Your cart is empty</div>
            ) : (
                <>
                <div className='text-3xl font-semibold'>Dein Warenkorb</div>
                <div className="divide-y">
            <div className='grid grid-cols-5 justify-between px-12 py-6 text-gray-400 text-sm'>
                <div className='col-span-3'>PRODUKT</div>
                <div className='col-span-1'>ANZAHL</div>
                <div className='col-span-1'>GESAMTESUME</div>
            </div>
          <div>
          {cart.map((item) => (
            <div className='grid grid-cols-5 px-12'>
                <div className='flex flex-row col-span-3'>
                    <div>
                        <img alt={item.name} src={item.thumbnail.url} className="h-32 w-32" />
                    </div>
                    <div className="flex flex-col">
                    <p className='text-base'>{item.name}</p>
                    <p className='text-sm'>$ {item.pricing.priceRangeUndiscounted.stop.gross.amount}</p>
                    </div>
              </div>
              <div className="justify-between text-center col-span-1">
                <div className='flex flex-row gap-4 py-2'>
                    <div className="flex flex-row gap-4 px-2 border border-black">
                    <button onClick={() => dispatch(decrementQuantity(item.id))}>
                    <MinusIcon className='h-4 w-4'/>
                    </button>
                <p>{item.quantity}</p>
                <button onClick={() => dispatch(incrementQuantity(item.id))}>
                  <PlusIcon className='h-4 w-4'/>
                </button>
                    </div>
                <button onClick={() => dispatch(removeFromCart(item.id))}>
                <TrashIcon className='h-4 w-4'/>
                </button>
                </div>
              </div>
              <p>$ {item.quantity * item.pricing.priceRangeUndiscounted.stop.gross.amount}</p>
            </div>
          ))}
          </div>
          <div className='text-center py-6 text-lg font-bold'>Zwischensumme: $ {getTotalPrice()}</div>
          </div>
                </>
            )}
        </div>
        </>
    )

}