import Link from "next/link";

export default function BgBlock(){
    return(
        <div className="bg-[url('../../public/photo.webp')] bg-cover gap-10 flex flex-col place-items-center py-auto">
        <div className='text-white text-center items-center pt-20 mt-20 text-6xl font-medium'>
          Schön, dass du da bist
        </div>
        <div className="pb-20 mb-20">
          <Link data-testid={"products-link"} href="/products" className='text-white border py-3 px-9 hover:border-2'>zu unseren Produkten</Link>
        </div>
      </div>
    )
}