import { useRouter } from "next/router"
import { useAppSelector } from "../redux/hooks"
import { useGetUserQuery } from "../generated/graphql";
import Link from "next/link";
import Authorization from "../components/Authorization";


export default function Profile() {
  const auth = useAppSelector((state) => state.auth);
  const router = useRouter();
  const { data, loading, error } = useGetUserQuery(); 
  
  let component = <></>;
  if (loading) component = <>Loading</>
  if (error) component = <>Error</>
  if (auth.loggedIn) {

    component = (
        <div className="container grid grid-rows-2 gap-8 content-center py-20 px-20">
          <div>
            <div className="text-4xl">
              Konto
            </div>
            <button className="text-gray-700 underline underline-offset-2" onClick={() => router.push("/logout")}>
              Abmelden
            </button>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col gap-3">
              <div className="text-3xl">Bestellhistorie</div>
              <div className="text-gray-700">
                Du hast noch keine Bestellungen aufgegeben.
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="text-3xl">Kontodetails</div>
                <div className="text-gray-700">
                  <div className="text-lg">{data?.me?.firstName} {data?.me?.lastName}</div>
                  <div className="text-lg">{data?.me?.defaultShippingAddress?.country?.country ?? 'Deutschland'}</div>
                </div>
              </div>
              <Link href={'/adresses'} className="underline underline-offset-2 hover:decoration-2">Adressen anzeigen</Link>
            </div>
          </div>
        </div>
    )
  }
  return(
    <Authorization>
      {component}
    </Authorization>
  )
}