import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BlogCard } from "../../components/Blog";
import { useGetPostsQuery } from "../../generated/graphql";


export default function BlogTopic() {
    const { data, loading, error } = useGetPostsQuery()    
    if (loading) return <div>Loading</div>;
    if (error) return <div>Error! {error.message}</div>;
    if (data) {
        return (
            <div>
                <div className="flex grid-cols-2">
                    {data.strapi_posts.data.map((value) => <BlogCard key={value.id} attributes={value.attributes} id={value.id} />)}
                </div>
                {/* <div className='flex flex-row gap-3 self-center'>
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
                            <FontAwesomeIcon onClick={} icon={faChevronRight} className="w-2 h-2 cursor-pointer" color='gray' />
                            <div onClick={() => refine(pages.length - 1)} className="cursor-pointer">
                                <FontAwesomeIcon icon={faChevronRight} className="w-2 h-2" color='gray' />
                                <FontAwesomeIcon icon={faChevronRight} className="w-2 h-2" color='gray' />
                            </div>
                        </div>)}
                </div> */}
            </div>
        )
    }
}