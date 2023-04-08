import { ClipLoader } from "react-spinners";
import { BlogCard } from "../../components/Blog";
import { useGetPostsQuery } from "../../../generated/graphql";


export default function BlogTopic() {
    const { data, loading, error } = useGetPostsQuery()    
    if (loading) return <ClipLoader loading={loading} />;
    if (error) return <div>Error! {error.message}</div>;
    if (data) {
        return (
            <div className="my-auto mx-20">
                <div className="text-4xl py-5">
                    Topics
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {data.strapi_posts.data.map((value) => <BlogCard key={value.id} attributes={value.attributes} id={value.id} />)}
                </div>
            </div>
        )
    }
}