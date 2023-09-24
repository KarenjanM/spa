import Link from "next/link";

export default function  RegisterSuccess(){
    return(
        <div className="flex flex-col gap-4 place-items-center my-auto">
            <div className="text-3xl text-center font-semibold">Vielen Dank, dass Sie sich bei uns ein Konto erstellt haben. In Kürze sollten Sie einen Email-Bestätigunglink bekommen!</div>
            <Link href={"/products"} className="hover:underline text-xl hover:underline-offset-2 text-sky-700">Weiter einkaufen</Link>
        </div>
        
    )
}