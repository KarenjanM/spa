import Link from "next/link";
import { Strapi_PostEntity } from "../../generated/graphql"
import { ClipLoader } from "react-spinners";
import getFormattedDate from "../lib/getFormattedDate";

export default function BlogCards({ latestPosts }: { latestPosts: Strapi_PostEntity[] }) {
  return (
    <div className={`md:grid sm:flex lg:mx-auto sm:flex-col grid-cols-${latestPosts.length} gap-4`}>
      {latestPosts.map(({ attributes, id }) =>
        <div className="bg-white flex">
          <BlogCard attributes={attributes} id={id} />
        </div>
      )}
    </div>
  )
}

export function BlogCard({ attributes, id }) {



  return (
    <Link href={`blogs/${id}`} className="flex flex-col gap-4 px-5 py-5 bg-stone-100 overflow-hidden">
      <div className="font-normal text-2xl tracking-wide hover:underline">{attributes.title}</div>
      <div className="text-xs font-extralight">
        {
          getFormattedDate(attributes.createdAt)
        }
      </div>
      <div className="block text-sm font-normal text-gray-600 text-base">
        {attributes.content}
      </div>
    </Link>
  )
}