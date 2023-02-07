import Head from 'next/head';
import Link from 'next/link';
import ProductCategory from '../components/ProductCategory';
import Blog from '../components/Blog';
import { useEffect } from 'react';
import { useTokenVerifyMutation } from '../generated/graphql';
import { useAppSelector, useAppDispatch } from '../redux/hoooks';
import { verify } from '../redux/auth.slice';

export default function Home() {
  const auth = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch();
  const [tokenVerifyMutation] = useTokenVerifyMutation({
    variables: {
        token: auth.userToken
    }
})
    useEffect(() => {

    if(!auth.isVerified && auth.userToken)
        process.env.BEARER_TOKEN = auth.userToken
        console.log(process.env.BEARER_TOKEN);
        
        tokenVerifyMutation().then(({data})=> dispatch(verify(data.tokenVerify.isValid))) 
    })
  return (
    <div className='pb-10' >
        <div className='flex flex-col gap-10 lg:text-center'>
          <div className="bg-[url('../public/photo.webp')] bg-cover gap-10 flex flex-col place-items-center py-auto">
            <div className='text-white text-center items-center pt-20 mt-20 text-6xl font-medium'>
              Schön, dass du da bist
            </div>
            <div className="pb-20 mb-20">
            <Link href="/products" className='text-white border py-3 px-9 hover:border-2'>zu unseren Produkten</Link>
            </div>
          </div>
          <div className='mx-40'>
          <div>
            <div className='text-5xl text-center font-base text-black'>
              kreativ. effektiv. produktiv
            </div>
            <div className='text-center text-gray-700 flex flex-col gap-3 my-6'>
              <p>
              Wir wollen dir mit unseren Produkten helfen, deinen Alltag effektiver und organisierter zu gestalten. 
              </p>
              <p>
                Dein täglicher Begleiter, der dir deinen Tag vereinfacht und erleichtert.
              </p>
            </div>
          </div>
          <Categories />
          <Blogs />
          </div>
          <div className='text-center text-stone-500 font-bold'>
            Vereinfache dir deinen Alltag, indem du alles organisierst und planst.
          </div>
        </div>
      </div>
  );
}
function Blogs(){
  return(
    <div>
            <div className='text-5xl py-10 font-base text-black'>
              Blogs
            </div>
            <div className="flex flex-row">
              <Blog />
            </div>
          </div>
  )
}
function Categories(){
  return(
  <div>
    <div className='text-5xl py-10 font-base text-black'>
      Unsere Produkte
    </div>
    <div className="flex">
      <ProductCategory />
    </div>
  </div>
  )
}