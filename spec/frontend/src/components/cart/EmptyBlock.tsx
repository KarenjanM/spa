import Link from "next/link";

export default function EmptyBlock() {
    return (
        <div className="flex flex-col place-content-center place-items-center container py-10 mx-auto my-auto gap-4">
            <div className='text-center text-4xl font-extrabold'>Your cart is empty</div>
        </div>
    )
}