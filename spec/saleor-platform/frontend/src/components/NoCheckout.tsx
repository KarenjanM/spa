import Link from "next/link";

export default function NoCheckout(){
    return (
        <div className="my-auto mx-auto flex flex-col gap-2 text-2xl">
            Ups... It seems that you don't have any items in your cart yet
            <Link href="/" className="self-center text-sky-700 hover:underline underline-offset-2">Back to Homepage</Link>
        </div>
    )
}