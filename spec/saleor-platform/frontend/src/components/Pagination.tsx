import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PageInfo } from "../../generated/graphql";
import { AfterBefore } from "../pages/products";

interface PaginationProps extends PageInfo {
    setAfterBefore: ({after="", before=""}: AfterBefore)=>void
}

export default function Pagination({hasNextPage, hasPreviousPage, startCursor, endCursor, setAfterBefore} : PaginationProps ){
    return(
            <div className='flex flex-row gap-3 self-center py-5'>
              {hasPreviousPage && (
                <div className='flex flex-row place-items-center gap-2 '>
                  <FontAwesomeIcon onClick={()=>setAfterBefore({before: startCursor, after: ""})} icon={faChevronLeft} className="w-4 h-4 cursor-pointer" color='gray' />
                </div>)}
              {hasNextPage && (
                <div className='flex flex-row place-items-center gap-2 '>
                  <FontAwesomeIcon onClick={()=>setAfterBefore({after: endCursor, before: ""})} icon={faChevronRight} className="w-4 h-4 cursor-pointer" color='gray' />
                </div>)}
            </div>
    )
}