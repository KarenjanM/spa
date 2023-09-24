import Link from "next/link";
import { CategoryCountableEdge } from "../../generated/graphql"
export default function ProductCategory({ categories }: { categories: Array<CategoryCountableEdge> }) {
    return (
        <>
            <CategoryCards categories={categories} />
        </>
    )
}

function CategoryCards({ categories }: { categories: Array<CategoryCountableEdge> }) {

    return (
        <ul className={`sm:flex sm:flex-col lg:flex-row lg:justify-center gap-4`}>
            {categories.map(({ node }) =>
                <li key={node.id} data-testid={`category-block`} className="bg-white flex self-stretch my-5 sm:my-0">
                    <Link href={`collections/${node.id}`} className="flex flex-col rounded-lg shadow-lg">
                        <img src={node?.backgroundImage?.url} alt={node?.backgroundImage?.alt} className="w-screen hover:scale-105 transition" />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{node.name}</div>
                        </div>
                    </Link>
                </li>
            )}
        </ul>
    )
}
