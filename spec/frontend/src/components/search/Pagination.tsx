import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePagination } from "react-instantsearch-hooks-web";

export function Pagination() {
    const { pages, isFirstPage, isLastPage, canRefine, currentRefinement, refine } = usePagination();
    if (canRefine)
      return (
        <div className='flex flex-row gap-3 self-center'>
          {!isFirstPage && (
            <div className='flex flex-row place-items-center gap-2 '>
              <div onClick={() => refine(0)} className="cursor-pointer">
                <FontAwesomeIcon icon={faChevronLeft} className="w-2 h-2" color='gray' />
                <FontAwesomeIcon icon={faChevronLeft} className="w-2 h-2" color='gray' />
              </div>
              <FontAwesomeIcon onClick={() => refine(currentRefinement - 1)} icon={faChevronLeft} className="w-2 h-2 cursor-pointer" color='gray' />
            </div>)}
          {pages.map((number) => (
            <div onClick={() => refine(number)} className={`${currentRefinement === number ? "text-stone-300" : "text-black"} cursor-pointer`}>
              {number + 1}
            </div>
          ))}
          {!isLastPage && (
            <div className='flex flex-row place-items-center gap-2 '>
              <FontAwesomeIcon onClick={() => refine(currentRefinement + 1)} icon={faChevronRight} className="w-2 h-2 cursor-pointer" color='gray' />
              <div onClick={() => refine(pages.length - 1)} className="cursor-pointer">
                <FontAwesomeIcon icon={faChevronRight} className="w-2 h-2" color='gray' />
                <FontAwesomeIcon icon={faChevronRight} className="w-2 h-2" color='gray' />
              </div>
            </div>)}
        </div>
      )
  }