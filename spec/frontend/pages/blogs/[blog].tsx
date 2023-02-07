import { useRouter } from "next/router";
import Blog, { BlogCard } from "../../components/Blog";
import { useGetPostByIdQuery } from "../../generated/graphql";

const getPostById = /* GraphQL */ `
query getPostById($id: ID){
    strapi_post(id: $id){
      data{
        id
        attributes{
          title
          content
          created
        }
      }
    }
  }

`

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