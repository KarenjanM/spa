import Link from "next/link"
import EmailForm from "./forms/EmailForm"
export default function Footer() {
    return (
        <footer id="footer" className="bg-stone-600 mt-auto shadow md:items-center md:justify-between">
            <div className="flex flex-col gap-6 divide-y py-4 divide-gray-400">
                <div className="grid grid-rows-2">
                    <div className="sm:block flex text-lg place-content-center">
                        <div className="flex flex-col gap-1 items-center px-5  mt-3 text-sm text-gray-300 sm:place-items-center sm:gap-0 sm:mt-0">
                            <div className="flex flex-col gap-1 sm:gap-5 sm:flex-row items-start">
                                <Link href="/policies/impressum" className="hover:underline">Impressum</Link>
                                <Link href="/policies/privacy" className="hover:underline">Datenschutzerklärung</Link>
                                <Link href="/policies/refund-policy" className="hover:underline">Widerrufsrecht & Widerrufsformular</Link>
                            </div>
                            <Link href="/policies/terms-of-service" className="self-start sm:self-center sm:mt-2 hover:underline">Algemeine Geschäftsbedigungen</Link>
                        </div>
                    </div>
                    <div className="flex justify-center sm:justify-start px-5 py-2 sm:px-20">
                        <EmailForm />
                    </div>
                </div>
                <div className="text-sm text-gray-300 py-4 text-center">© 2023 <a href="https://deep5.io/" className="hover:underline">DEEP5</a>. All Rights Reserved.
                </div>
            </div>
        </footer>
    )
}