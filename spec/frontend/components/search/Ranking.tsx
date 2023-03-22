import { SortBy } from "./SortBy";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FilterPopover } from "./FilterPopover";
import { RangeMenu } from "./RangeMenu";
import { Configure, useStats } from "react-instantsearch-hooks-web";

export function Ranking() {
    return (
        <div className='flex flex-row justify-between'>
            <Configure />
            <Filtering />
            <Sorting />
        </div>
    )
}

export function Filtering() {
    return (
        <div className='flex flex-row gap-2 place-items-center'>
            <div className="text-sm">
                Filter:
            </div>
            <div className="flex flex-row gap-10">
                <Pricing />
            </div>
        </div>
    )
}

export function Sorting() {
    const stats = useStats();
    return (
        <div className='flex flex-row gap-2 place-items-center cursor-pointer'>
            <div className='text-sm'>
                Sortieren nach:
            </div>
            <SortBy />
            <div>
            {stats.nbHits} Ergebnisse
            </div>
        </div>
    )
}


export function Pricing() {
    const [show, setShow] = useState(false);

    return (
        <div>
            <div onClick={() => setShow(!show)} className="cursor-pointer group flex flex-row gap-2">
                <div className="group-hover:underline">
                    Pricing
                </div>
                <FontAwesomeIcon icon={faChevronDown} className="self-center w-3 h-3" />
            </div>
            <FilterPopover show={show}>
                <RangeMenu />
            </FilterPopover>
        </div>
    )
}





export function AvailabilityMenu() {
    function handleClick() {
    }
    return (
        <div className="grid grid-rows-2 divide-y divide-gray-300">
            <div className="flex flex-row justify-between px-5 py-2">
                <div>
                    <div></div>ausgewählt
                </div>
                <button onClick={handleClick} className="underline">
                    Zurücksetzen
                </button>
            </div>
            <div>
            </div>
        </div>
    )
}

export function Availability() {
    const [show, setShow] = useState(false);

    return (
        <div>
            <div onClick={() => setShow(!show)} className="cursor-pointer group flex flex-row gap-2">
                <div className="group-hover:underline">
                    Verfügbarkeit
                </div>
                <FontAwesomeIcon icon={faChevronDown} className="self-center w-3 h-3" />
            </div>
            <FilterPopover show={show}>
                <AvailabilityMenu />
            </FilterPopover>
        </div>
    )
}