import ProductCategory from '../components/ProductCategory';
import { CategoryCountableEdge, useGetCategoriesQuery, useGetPostsQuery } from '../../generated/graphql';
import Spinner from '../components/Spinner';
import ErrorBlock from '../components/blocks/ErrorBlock';
import BlogCards from '../components/Blog';
import BgBlock from '../components/blocks/BgBlock';
import AboutBlock from '../components/blocks/AboutBlock';
import SloganBlock from '../components/blocks/SloganBlock';

export default function Home() {
  return (
    <div className='pb-10' >
      <div className='flex flex-col gap-10 lg:text-center'>
        <BgBlock />
        <div className='mx-40'>
          <AboutBlock />
          <Categories />
          <Blogs />
        </div>
        <SloganBlock />
      </div>
    </div>
  );
}
function Blogs() {
  const { data, loading, error } = useGetPostsQuery();
  let content;
  if (loading) content = <Spinner />;
  if (error) content = <ErrorBlock />;
  if (data) content = (
    <div className="flex flex-row">
      <BlogCards latestPosts={data.strapi_posts.data} />
    </div>
  );
  return (
    <div>
      <div className='text-5xl py-10 font-base text-black'>
        Blogs
      </div>
      {content}
    </div>
  )
}
function Categories() {
  const { data, loading, error } = useGetCategoriesQuery();

  let content;
  if (loading) content = <Spinner />;
  if (error) content = <ErrorBlock />;
  if (data) content = (<div className="flex">
    <ProductCategory categories={data.categories.edges as Array<CategoryCountableEdge>} />
  </div>);
  return (
    <div>
      <div className='text-5xl py-10 font-base text-black'>
        Unsere Produkte
      </div>
      {content}
    </div>
  )
}