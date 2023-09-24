import { useRouter } from 'next/router';
import { useContext, useMemo, useState } from 'react';
import SubmitButton from '../components/buttons/SubmitButton';
import ErrorBlock from '../components/blocks/ErrorBlock';
import Spinner from '../components/Spinner';
import { CheckoutContext } from '../contexts/checkoutContext';
import { useGetCheckout, useRemoveProduct, useUpdateQuantity } from '../hooks/checkout';
import { CartItem } from '../components/cart/CartItem';
import EmptyBlock from '../components/cart/EmptyBlock';
import ColHeaders from '../components/cart/ColHeaders';
import getCurrencySymbol from '../lib/getCurrencySymbol';
import { ProductVariant } from '../../generated/graphql';
import getPrettyPrice from '../lib/getPrettyPrice';


export default function Cart() {
  const { checkoutId } = useContext(CheckoutContext);
  const { data, loading, error } = useGetCheckout({ checkoutId: checkoutId });
  const router = useRouter();
  const {lineUpdateMutation, updateLoading} = useUpdateQuantity({ checkoutId: checkoutId });
  const {removeProduct, removeLoading} = useRemoveProduct({ checkoutId });
  const [operationLoading, setOperationLoading] = useState(false);
  useMemo(()=>setOperationLoading(updateLoading ? updateLoading : removeLoading), [updateLoading, removeLoading])
  function onSubmit(){
    router.push('/checkout/information')
  }
  
  if (loading) return <Spinner />;
  if (error) return <ErrorBlock />
  if (data) {
    // cart and checkout is actually the same object, but I use here cart variable for better understanding
    const cart = data.checkout
    return (
      <>
        <div className="flex flex-col container py-10 mx-auto gap-4">
          {!cart?.lines || cart?.lines?.length === 0 ? (
            <div className='text-center text-2xl font-extrabold'>Your cart is empty</div>
          ) : (
            <div className='px-5'>
              <div className='text-center sm:text-start text-3xl font-semibold'>Dein Warenkorb</div>
              <div className="divide-y">
                <ColHeaders />
                <div>
                  {operationLoading ? <Spinner/> : cart?.lines?.map(({ variant, quantity, id }) => (
                    <CartItem key={id} lineUpdateMutation={lineUpdateMutation} removeProduct={removeProduct} setLoading={setOperationLoading} checkoutId={checkoutId} variant={variant as ProductVariant} quantity={quantity} lineId={id} />
                  ))}
                </div>
                <div className='flex text-center md:text-end flex-col gap-3'>
                  <div className='pt-3 text-lg font-normal'>Zwischensumme {getCurrencySymbol(cart?.totalPrice?.gross?.currency as any)} {getPrettyPrice(cart?.totalPrice?.gross?.amount - cart?.shippingPrice?.gross?.amount)}</div>
                  <div className='text-sm text-gray-600'>
                    Inklusive Steuern, Versand wird beim Checkout berechnet
                  </div>
                  <SubmitButton onClick={onSubmit} className='self-center md:self-end'>Auschecken</SubmitButton>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
  else{
    return(
      <EmptyBlock />
    )
  }
}

