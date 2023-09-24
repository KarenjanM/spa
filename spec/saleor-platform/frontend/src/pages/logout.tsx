import { useRouter } from "next/router"
import Spinner from "../components/Spinner"
import useLogOut from "../hooks/logout"


export default function Logout(){
    const router = useRouter();
    const {save_checkout} = router.query
    const data = useLogOut({save_checkout: save_checkout as unknown as boolean});
    return(
        <Spinner />
    )
}