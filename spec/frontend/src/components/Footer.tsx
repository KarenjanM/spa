import Link from "next/link"
import EmailForm from "./forms/EmailForm"
export default function Footer(){
    return (
        <footer id="footer" className="bg-stone-600 mt-auto shadow md:items-center md:justify-between">
            <div className="flex flex-col gap-6 divide-y py-4 divide-gray-400">
            <div className="grid grid-rows-2">
                <div className="grid grid-rows-2 text-center text-lg justify-center">
                    <div className="flex flex-wrap items-center mt-3 text-sm text-gray-300 sm:mt-0">
                            <Link href="/policies/impressum" className="mr-4 hover:underline md:mr-6 ">Impressum</Link>
                            <Link href="/policies/privacy" className="mr-4 hover:underline md:mr-6">Datenschutzerklärung</Link>
                            <Link href="#" className="mr-4 hover:underline md:mr-6">Widerrufsrecht & Widerrufsformular</Link>
                    </div>
                    <div className="tems-center mt-3 text-sm text-gray-300 sm:mt-0">
                        <Link href="#" className="hover:underline">Algemeine Geschäftsbedigungen</Link>
                    </div>
                </div>
                <div className="grid grid-cols-5 justify-start px-12 mx-12">
                    <EmailForm />
                </div>
            </div>
            <div className="text-sm text-gray-300 py-4 sm:text-center">© 2023 <a href="https://deep5.io/" className="hover:underline">DEEP5</a>. All Rights Reserved.
            </div>
            </div>
        </footer>
    )
}