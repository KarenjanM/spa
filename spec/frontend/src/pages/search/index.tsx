import { useRouter } from "next/router"
import { SearchBlock } from "../../components/search/Search";

export default function SearchPage(){
    const router = useRouter();
    const {search} = router.query
    return(
        <div className="sm:mx-10 mx-5 my-10">
            <SearchBlock query={search as string}/>
        </div>
    )
}