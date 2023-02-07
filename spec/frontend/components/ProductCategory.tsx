import Link from "next/link";
import { useGetCategoriesQuery, useSearchByCategorieQuery } from "../generated/graphql"


const getCategories = /* GraphQL */ `
    query getCategories{
        categories(last: 16){
            edges{
                node{
                    id
                    name
                }
            }
        }
    }
`
const searchByCategorie = /* GraphQL */ `
    query searchByCategorie($filter: ProductFilterInput!){
        products(
            first: 4, 
            channel: "default-channel",
            filter: $filter
          ) {
            edges{
              node{
                thumbnail{
                  url
                }
                category{
                    id
                    name
                  }
              }
            }
          }
    }
`
export default function ProductCategory(){

    const {data, loading, error} = useGetCategoriesQuery();
    if (loading) return <div>Loading</div>;
    if (error) return <div>Error! {error.message}</div>;
    if (data) {
        const categories = data.categories.edges
        let nodes = []
        categories.forEach((item) => nodes.push(item.node) )
        return (
        <ul className="lg:mx-auto grid md:grid-cols-4 gap-4">

        <CategoryCard nodes={nodes} />
        </ul>

        )
    }
}


function CategoryCard({nodes}){
    const ids = [] 
    nodes.forEach(element => {
        ids.push(element.id)
    });
    const {data, loading, error} = useSearchByCategorieQuery({variables: {filter: {categories: ids}}})
    if (loading) return <div>Loading</div>;
    if (error) return <div>Error! {error.message}</div>;
    if (data) {
    const products = data.products.edges
    return(
        <>
                { products.map(({node}) => 
                <li className="bg-white flex place-items-stretch">
                    <Link href={`collections/${node.category.id}`}>
                        <div className="grid max-w-sm grow rounded overflow-hidden shadow-lg">
                            <img src={node.thumbnail.url} alt="image" className="w-full hover:scale-105 transition"/>
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{node.category.name}</div>
                            </div>
                        </div>
                    </Link>
                </li>
            )}
            </>
        )
    }
}
