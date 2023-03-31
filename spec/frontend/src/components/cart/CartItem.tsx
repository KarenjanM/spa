import { PlusIcon, MinusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { ProductVariant } from '../../../generated/graphql';
import getCurrencySymbol from '../../lib/getCurrencySymbol';
import getPrettyPrice from '../../lib/getPrettyPrice';

interface CartItemProps {
  checkoutId: string
  variant: ProductVariant
  quantity: number
  lineId: string
  lineUpdateMutation: Function
  removeProduct: Function
}

export function CartItem(props: CartItemProps & {setLoading: (value: boolean)=>void}) {
  console.log(props.quantity);
  const [stateQuantity, setQuantity] = useState(props.quantity);

  async function increaseQuantity() {
    setQuantity(stateQuantity + 1)
    await props.lineUpdateMutation({ variables: { lines: { lineId: props.lineId, quantity: stateQuantity + 1 } } })
  }
  async function decreaseQuantity() {
    console.log("decreasing");

    setQuantity(stateQuantity - 1)
    await props.lineUpdateMutation({ variables: { lines: { lineId: props.lineId, quantity: stateQuantity - 1 } } })
  }
  function remove() {
    console.log("removing");
    props.removeProduct({ variables: { linesIds: props.lineId } })
  }
  return (
    <div className='grid grid-cols-5 px-12'>
      <div className='flex flex-row col-span-3'>
        <div>
          <img alt={props.variant.product.name} src={props.variant.product.thumbnail.url} className="h-32 w-32" />
        </div>
        <div className="flex flex-col">
          <p className='text-base'>{props.variant.product.name}</p>
          <p className='text-sm'>{getCurrencySymbol(props.variant.pricing.price.gross.currency as any)} {getPrettyPrice(props.variant.pricing.price.gross.amount)}</p>
        </div>
      </div>
      <div className="justify-between text-center col-span-1">
        <div className='flex flex-row gap-4 py-2'>
          <div className="flex flex-row gap-4 px-2 border border-black">
            <button onClick={decreaseQuantity}>
              <MinusIcon className='h-4 w-4' />
            </button>
            <p>{stateQuantity}</p>
            <button onClick={increaseQuantity}>
              <PlusIcon className='h-4 w-4' />
            </button>
          </div>
          <button onClick={remove}>
            <TrashIcon className='h-4 w-4' />
          </button>
        </div>
      </div>
      <p>$ {getPrettyPrice(props.quantity * props.variant.pricing.price.gross.amount)}</p>
    </div>
  )
}