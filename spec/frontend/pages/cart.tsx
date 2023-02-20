import { useApolloClient } from '@apollo/client';
import {PlusIcon, MinusIcon, TrashIcon} from '@heroicons/react/24/outline';
import { useContext } from 'react';
import { CheckoutContext } from '../contexts/checkoutContext';
import { useGetCheckout, useRemoveProduct, useUpdateQuantity } from '../hooks/checkout';


export default function Cart(){
    const checkoutId = useContext(CheckoutContext);
    const client = useApolloClient();
    const {data, loading, error} = useGetCheckout(client, checkoutId);
    const updateQuantity = useUpdateQuantity(checkoutId);
    const removeProduct = useRemoveProduct(checkoutId);
    function update(id, quantity, number){
      updateQuantity({variables: {lines: {lineId: id, quantity: quantity + number}}})
    }
    function remove(id){
      removeProduct({variables: {linesIds: id}})
    }
    if (loading) return <div>Loading</div>
    if(error) return <div>Error</div>
    if (data){
    // cart and checkout is actually the same object, but I use here cart variable for better understanding
    const cart = data.checkout
    return (
        <>
        <div className="flex flex-col container py-10 mx-auto gap-4">
            {cart.lines.length === 0 ? (
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
          {cart.lines.map(({variant, quantity, id}) => (
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
                    <button onClick={() => update(id, quantity, -1)}>
                    <MinusIcon className='h-4 w-4'/>
                    </button>
                <p>{quantity}</p>
                <button onClick={() => update(id,quantity, 1)}>
                  <PlusIcon className='h-4 w-4'/>
                </button>
                    </div>
                <button onClick={() => remove(id)}>
                <TrashIcon className='h-4 w-4'/>
                </button>
                </div>
              </div>
              <p>$ {quantity * variant.pricing.price.gross.amount}</p>
            </div>
          ))}
          </div>
          <div className='text-center py-6 text-lg font-bold'>Zwischensumme: $ {cart.totalPrice.gross.amount}</div>
          </div>
                </>
            )}
        </div>
        </>
    );
  }
}