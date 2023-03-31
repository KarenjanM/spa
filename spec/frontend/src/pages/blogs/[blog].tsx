import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";
import { useGetPostByIdQuery } from "../../../generated/graphql";
import getFormattedDate from "../../lib/getFormattedDate";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function BlogTopic() {
    const router = useRouter();
    const { blog } = router.query

    const { data, loading, error } = useGetPostByIdQuery({
        variables: { id: blog as string }
    })
    if (loading) return <ClipLoader loading={loading} />;
    if (error) return <div>Error! {error.message}</div>;
    if (data) {
        return (
            <div className="my-auto mx-80">
                <BlogPage  attributes={data.strapi_post.data.attributes!}/>
            </div>
        )
    }
}

export function BlogPage({attributes}) {
    return (
        <div className="flex flex-col gap-3 place-items-center place-content-center">
            <div className="font-normal text-4xl tracking-wide hover:underline self-start">{attributes.title}</div>
            <div className="text-xs font-extralight self-start">
                {
                    getFormattedDate(attributes.createdAt)
                }
            </div>
            <div className="block text-sm font-normal text-base">
                {attributes.content}
            </div>
            <Link href={"/blogs"} className="text-xl py-2">
               <FontAwesomeIcon icon={faArrowLeft}/> Zurück zum Blog
            </Link>
        </div>
    )
}