import { useRouter } from "next/router";
import { BlogCard } from "../../components/Blog";
import { useGetPostByIdQuery } from "../../generated/graphql";

export default function BlogTopic(){
    const router = useRouter();
    const {blog} = router.query
    
    const {data, loading, error} = useGetPostByIdQuery({
            variables: {id: blog as string}
        })
    if (loading) return <div>Loading</div>;
    if (error) return <div>Error! {error.message}</div>;
    if (data) {
        return (
            <BlogCard attributes={data.strapi_post.data.attributes} id={data.strapi_post.data.id} />
        )
    }
}