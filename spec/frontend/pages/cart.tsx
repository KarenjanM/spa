import { PlusIcon, MinusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import SubmitButton from '../components/buttons/SubmitButton';
import { CheckoutContext } from '../contexts/checkoutContext';
import { useGetCheckout, useRemoveProduct, useUpdateQuantity } from '../hooks/checkout';


export default function Cart() {
  const { checkoutId } = useContext(CheckoutContext);
  const { data, loading, error } = useGetCheckout({ checkoutId: checkoutId });
  const router = useRouter();
  function onSubmit(){
    router.push('/checkout/information')
  }

  if (loading) return <div>Loading</div>
  if (error) return <div>Error</div>
  if (data) {
    // cart and checkout is actually the same object, but I use here cart variable for better understanding
    const cart = data.checkout
    console.log("Cart data");

    console.log(data);

    return (
      <>
        <div className="flex flex-col container py-10 mx-auto gap-4">
          {!cart?.lines || cart?.lines?.length === 0 ? (
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
                  {cart?.lines?.map(({ variant, quantity, id }) => (
                    <CartItem checkoutId={checkoutId} variant={variant} quantity={quantity} id={id} />
                  ))}
                </div>
                <div className='flex text-end flex-col gap-3'>
                  <div className='pt-3 text-lg font-normal'>Zwischensumme €{cart?.totalPrice?.gross?.amount - cart?.shippingPrice?.gross?.amount}</div>
                  <div className='text-sm text-gray-600'>
                    Inklusive Steuern, Versand wird beim Checkout berechnet
                  </div>
                  <SubmitButton onClick={onSubmit} className='self-end'>Auschecken</SubmitButton>
                </div>
              </div>
            </>
          )}
        </div>
      </>
    );
  }
  else{
    return(
      <div className="flex flex-col container py-10 mx-auto gap-4">
        <div className='text-center text-2xl font-extrabold'>Your cart is empty</div>
      </div>
    )
  }
}

export function CartItem({ checkoutId, variant, quantity, id }) {
  const [stateQuantity, setQuantity] = useState(quantity);
  const updateQuantity = useUpdateQuantity({ checkoutId });
  const removeProduct = useRemoveProduct({ checkoutId });
  async function increaseQuantity() {
    setQuantity(stateQuantity + 1)
    await updateQuantity({ variables: { lines: { lineId: id, quantity: stateQuantity + 1 } } })
  }
  async function decreaseQuantity() {
    setQuantity(stateQuantity - 1)
    await updateQuantity({ variables: { lines: { lineId: id, quantity: stateQuantity - 1 } } })
  }
  function remove() {
    removeProduct({ variables: { linesIds: id } })
  }
  return (
    <div className='grid grid-cols-5 px-12'>
      <div className='flex flex-row col-span-3'>
        <div>
          <img alt={variant.product.name} src={variant.product.thumbnail.url} className="h-32 w-32" />
        </div>
        <div className="flex flex-col">
          <p className='text-base'>{variant.product.name}</p>
          <p className='text-sm'>$ {variant.pricing.price.gross.amount}</p>
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
      <p>$ {quantity * variant.pricing.price.gross.amount}</p>
    </div>
  )
}