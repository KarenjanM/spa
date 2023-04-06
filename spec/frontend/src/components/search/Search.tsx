import algoliasearch from 'algoliasearch/lite';
import Link from 'next/link';
import { InstantSearch } from 'react-instantsearch-hooks-web';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { SearchBox } from './SearchBox';
import { Pagination } from './Pagination';
import { Hits } from './Hits';
import { Ranking, Sorting } from './Ranking';
import Stats from './Stats';



const searchClient = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID, process.env.NEXT_PUBLIC_ALGOLIA_API_KEY);





export function SearchBlock({ query }: { query?: string }) {

  return (
    <InstantSearch searchClient={searchClient} indexName="test.default-channel.USD.products">
      <div className='flex flex-col text-black gap-5'>
        <div className='text-3xl text-center'>
          {query ? "Suchergebnisse" : "Suchen"}
        </div>
        <div className='flex justify-center md:mx-40 md:block'>
          <SearchBox value={query} iconColor="black" className='text-black' />
        </div>
        <div className='flex flex-col place-items-center sm:place-content-center gap-5 sm:flex-row'>
          <Ranking />
          <div className='flex flex-col sm:flex-row sm:place-items-center gap-2 sm:gap-5'>
            <Sorting />
            <Stats />
          </div>
        </div>
        <Hits isFullPage={true} className='text-black' />
        <Pagination />
      </div>
    </InstantSearch>
  )
}


export function SearchPopover({ setShowSearch }: { setShowSearch: (value: boolean) => void }) {
  const [value, setValue] = useState("");
  const [isHits, setIsHits] = useState(true);
  return (
    <div className='flex bg-stone-500'>
      <InstantSearch searchClient={searchClient} indexName="test.default-channel.USD.products">
        <div className='flex flex-col'>
          <SearchBox iconColor='white' className='text-white' setValue={setValue} />
          <Popover className="relative">
            <>
              <Transition
                enter="transition ease-out duration-100"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
                show={value ? true : false}
              >
                <Popover.Panel className="absolute z-10 -ml-4 mt-3 w-screen max-w-md transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className={`relative grid gap-2 bg-stone-600 divide-y`}>
                      <div className={`px-5 py-4 ${isHits && 'divide-y'}`}>
                        {isHits ? <div className='py-1 text-xs text-stone-200'>
                          PRODUKTE
                        </div> : <div className='text-stone-200'>Keine Ergebnisse</div>}
                        <span onClick={()=>setShowSearch(false)}><Hits setIsHits={setIsHits} isFullPage={false} className='text-gray-50' /></span>
                      </div>
                      <Link onClick={() => setShowSearch(false)} href={{
                        pathname: "/search",
                        query: { search: value }
                      }} className="bg-stone-600 flex flex-row justify-between px-4 py-2 place-items-center text-gray-50">
                        <div>
                          Nach "{value}" suchen
                        </div>
                        <FontAwesomeIcon icon={faArrowRight} color="white" width={"12px"} height={"12px"} />
                      </Link>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          </Popover>
        </div>
      </InstantSearch>
    </div>
  );
}



