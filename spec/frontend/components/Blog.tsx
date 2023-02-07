import Link from "next/link";
import { useGetPostsQuery } from "../generated/graphql"

const getPosts = /* GraphQL */ `
query getPosts {
    strapi_posts {
      data {
        id
        attributes {
          content
          created
          title
        }
      }
    }
  }
`

export default function Blog(){
    const {data, loading, error} = useGetPostsQuery();
    if (loading) return <div>Loading</div>;
    if (error) return <div>Error! {error.message}</div>;
    if (data) {
        const latestPosts = data.strapi_posts.data
        
        return (
            <div className={`md:grid sm:flex lg:mx-auto sm:flex-col grid-cols-${latestPosts.length} gap-4`}>
                {latestPosts.map(({attributes, id}) => 
                <div className="bg-white flex">
                <BlogCard attributes={attributes} id={id}/>
                </div>
                )}
            </div>
        )
    }

}

export function BlogCard({attributes, id}){

    function formatDate(){
      let date = new Date(Date.parse(attributes.created))
      let dateString = date.toDateString().split(' ').slice(1)
      
      let temp = dateString[1]
      dateString[1] = dateString[0]
      dateString[0] = temp
      for (let i = 0; i < dateString.length; i++){
          if(i == 0)
            dateString[i] = dateString[i].toUpperCase() + ". "
          else
            dateString[i] = dateString[i].toUpperCase() + " "
      }
      return dateString;     
    }
    
    return (
        <Link href={`blogs/${id}`} className="flex flex-col gap-4 px-5 py-5 bg-stone-100 overflow-hidden">
        <div className="font-normal text-2xl tracking-wide hover:underline">{attributes.title}</div>
      <div className="text-xs font-extralight">
        {
          formatDate()
        }
      </div>
      <div className="block text-sm font-normal text-gray-600 text-base">
        {attributes.content}
      </div>
    </Link>
    )
}