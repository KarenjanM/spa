import { PlusIcon, MinusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { ProductVariant } from '../../../generated/graphql';
import getCurrencySymbol from '../../lib/getCurrencySymbol';
import getPrettyPrice from '../../lib/getPrettyPrice';
import Image from 'next/image';

interface CartItemProps {
  checkoutId: string
  variant: ProductVariant
  quantity: number
  lineId: string
  lineUpdateMutation: Function
  removeProduct: Function
}

export function CartItem(props: CartItemProps & {setLoading: (value: boolean)=>void}) {
  const [stateQuantity, setQuantity] = useState(props.quantity);

  async function increaseQuantity() {
    setQuantity(stateQuantity + 1)
    await props.lineUpdateMutation({ variables: { lines: [{ lineId: props.lineId, quantity: stateQuantity + 1 }] } })
  }
  async function decreaseQuantity() {
    console.log("decreasing");

    setQuantity(stateQuantity - 1)
    await props.lineUpdateMutation({ variables: { lines: [{ lineId: props.lineId, quantity: stateQuantity - 1 }] } })
  }
  function remove() {
    console.log("removing");
    props.removeProduct({ variables: { linesIds: props.lineId } })
  }
  return (
    <div className='flex flex-row justify-between md:grid md:grid-cols-5 px-12'>
      <div className='flex flex-col sm:flex-row col-span-3'>
        <div>
          <img alt={props.variant.product.name} src={props.variant.product.thumbnail.url} className="h-24 w-24 md:h-32 md:w-32" />
        </div>
        <div className="flex flex-col">
          <p className='text-base'>{props.variant.product.name}</p>
          <p className='text-sm'>{getCurrencySymbol(props.variant.pricing.price.gross.currency as any)} {getPrettyPrice(props.variant.pricing.price.gross.amount)}</p>
        <QuantityBlock className="md:hidden"
        decreaseQuantity={decreaseQuantity} stateQuantity={stateQuantity} increaseQuantity={increaseQuantity} remove={remove}/>
        </div>
      </div>
      <QuantityBlock className="hidden md:block" decreaseQuantity={decreaseQuantity} stateQuantity={stateQuantity} increaseQuantity={increaseQuantity} remove={remove}/>
      <div className='md:col-span-1 py-2 px-2 lg:px-0 self-center md:self-start'>${getPrettyPrice(props.quantity * props.variant.pricing.price.gross.amount)}</div>
    </div>
  )
}

function QuantityBlock({className="", decreaseQuantity, stateQuantity, increaseQuantity, remove}){
  return(
    <div className={`${className} text-center col-span-0 md:col-span-1`}>
        <div className='flex flex-row gap-4 py-2'>
          <div className="flex flex-row gap-4 px-2 border border-black">
            <button data-testid={"decrease-q-cart"} onClick={decreaseQuantity}>
              <MinusIcon className='h-4 w-4' />
            </button>
            <p data-testid="quantity">{stateQuantity}</p>
            <button data-testid={"increase-q-cart"} onClick={increaseQuantity}>
              <PlusIcon className='h-4 w-4' />
            </button>
          </div>
          <button data-testid="remove" onClick={remove}>
            <TrashIcon className='h-4 w-4' />
          </button>
        </div>
      </div>
  )
}