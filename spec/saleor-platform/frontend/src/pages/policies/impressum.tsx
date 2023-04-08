import { PoliciesLayout } from "../../components/layouts/PoliciesLayout"


export default function Impressum() {
    return (
        <PoliciesLayout>
            <div className="flex flex-col gap-3 place-items-center">
            <PoliciyHeader>
                Impressum
            </PoliciyHeader>
                <div className="flex flex-col gap-5 text-stone-500 text-start text-lg">
                    <ImpressumAddress />
                    <ImpressumContact />
                    <div>
                        Umsatzsteuer-Identifikationsnummer: DE340667159<br />
                        USt. wird nicht ausgewiesen, da der Verkäufer Kleinunternehmer im Sinne des UStG ist.
                    </div>
                    <div>
                        Plattform der EU-Kommission zur Online-Streitbeilegung:<br /> https://ec.europa.eu/odr
                    </div>
                    <div>
                        Wir sind zur Teilnahme an einem Streitbeilegungsverfahren vor<br/> einer Verbraucherschlichtungsstelle weder verpflichtet noch bereit
                    </div>
                    <div className="flex flex-row gap-3 self-end text-xs py-5">
                        <div>Stand:</div>
                        <div>
                            10.01.2023, 15:53:11 Uhr
                        </div>
                    </div>
                </div>

            </div>
        </PoliciesLayout>
    )
}

export function ImpressumAddress() {
    return (
        <div className="flex flex-col">
            <div>Mert Taskin</div>
            <div>Am Magnitor 7A</div>
            <div>38100 Braunschweig</div>
            <div>Deutschland</div>
        </div>
    )
}

export function ImpressumContact() {
    return (
        <div className="flex flex-col gap-1">
            <div className="flex flex-row gap-1">
                <div>
                    Tel.:
                </div>
                <div>01744880381</div>
            </div>
            <div className="flex flex-row gap-1">
                <div>
                    E-Mail:
                </div>
                <div>info@kreateamshop.de</div>
            </div>
        </div>
    )
}

export function PoliciyHeader({children}){
    return(
        <div className="text-4xl">
        {children}
        </div>
    )
}