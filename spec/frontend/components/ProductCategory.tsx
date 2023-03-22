import Link from "next/link";
import { useGetCategoriesQuery, useGetByCategorieQuery, CategoryCountableEdge } from "../generated/graphql"

export default function ProductCategory(){
    const {data, loading, error} = useGetCategoriesQuery();

    if (loading) return <div>Loading</div>;
    if (error) return <div>Error! {error.message}</div>;
    if (data) {
        console.log(data);
        
        const categories = data.categories.edges
        return (
        <ul className="lg:mx-auto grid md:grid-cols-4 gap-4">
            <CategoryCards categories={categories as Array<CategoryCountableEdge>} />
        </ul>
        )
    }
}

function CategoryCards({categories} : {categories: Array<CategoryCountableEdge>}){

    return(
        <>
                { categories.map(({node}) => 
                <li className="bg-white flex place-items-stretch">
                    <Link href={`collections/${node.id}`}>
                        <div className="grid max-w-sm grow rounded overflow-hidden shadow-lg">
                            <img src={node?.backgroundImage?.url} alt={node?.backgroundImage?.alt} className="w-full hover:scale-105 transition"/>
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{node.name}</div>
                            </div>
                        </div>
                    </Link>
                </li>
            )}
            </>
        )
}
