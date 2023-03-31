import { PoliciesLayout } from "../../components/layouts/PoliciesLayout";
import { PoliciyHeader } from "./impressum";

export default function PrivacyPolicy() {
    return (
        <PoliciesLayout>
            <div className="flex flex-col place-items-center gap-3">
            <PoliciyHeader>
                Datenschutzerklärung
            </PoliciyHeader>
            <PrivacyPolicyList/>
            </div>
        </PoliciesLayout>
    )
}

export function PrivacyPolicyList() {
    return (
        <div className="flex flex-col">
            <div className="flex flex-col gap-2">
                <ListItemHeader number={1}>
                    Einleitung und Kontaktdaten des Verantowrtlichen
                </ListItemHeader>
                <ListItemContent>
                    <div className="text-stone-700"><span className="font-bold">1.1</span> Wir freuen uns, dass Sie unsere Website besuchen und bedanken uns für Ihr Interesse. Im Folgenden informieren wir Sie über den Umgang mit Ihren personenbezogenen Daten bei der Nutzung unserer Website. Personenbezogene Daten sind hierbei alle Daten, mit denen Sie persönlich identifiziert werden können.</div>

                    <div className="text-stone-700"><span className="font-bold">1.2</span> Verantwortlicher für die Datenverarbeitung auf dieser Website im Sinne der Datenschutz-Grundverordnung (DSGVO) ist Mert Taskin, Am Magnitor 7A, 38100 Braunschweig, Deutschland, Tel.: 01744880381, E-Mail: info@kreateamshop.de. Der für die Verarbeitung von personenbezogenen Daten Verantwortliche ist diejenige natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.</div>

                    <div className="text-stone-700"><span className="font-bold">1.3</span> Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung personenbezogener Daten und anderer vertraulicher Inhalte (z.B. Bestellungen oder Anfragen an den Verantwortlichen) eine SSL-bzw. TLS-Verschlüsselung. Sie können eine verschlüsselte Verbindung an der Zeichenfolge „https://“ und dem Schloss-Symbol in Ihrer Browserzeile erkennen.</div>
                </ListItemContent>
            </div>
        </div>
    )
}


export function ListItemHeader({ number, children }) {
    return (
        <div className="text-3xl">
            {`${number} ) `}{children}
        </div>
    )
}

export function ListItemContent({ children }) {
    return (
        <div className="flex flex-col gap-1">
            {children}
        </div>
    )
}