import Link from "next/link";

export default function  RequestSuccess(){
    return(
        <div className="flex flex-col gap-4 place-items-center my-auto">
            <div className="text-3xl text-center font-semibold">In Kürze sollten Sie einen Email mit dem Link für die Passwortzurücksetzung bekommen!</div>
            <Link href={"/products"} className="hover:underline text-xl hover:underline-offset-2 text-sky-700">Weiter einkaufen</Link>
        </div>
        
    )
}