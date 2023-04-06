import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useEffect } from "react";
import { useSearchBox } from "react-instantsearch-hooks-web";

export function SearchBox({ className, value, setValue, iconColor }: { className?: string, iconColor: string, value?: string, setValue?: (value: string) => void }) {
    const { query, refine } = useSearchBox();
    useEffect(() => {
      refine(value);
    }, [])
    useEffect(() => {
      setValue && setValue(query);
    }, [query])
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      refine(e.target.value);
    };
    return (
      <div>
        <div className='flex flex-row justify-between place-items-center border border-gray-200 py-3 px-3'>
          <input value={query} type="text" onChange={handleChange} placeholder={"Suchen"} className={`${className} bg-transparent w-full text-sm bg-transparent sm:rounded-none focus:outline-none`} />
          <FontAwesomeIcon icon={faSearch} color={iconColor} />
        </div>
      </div>
    );
  }