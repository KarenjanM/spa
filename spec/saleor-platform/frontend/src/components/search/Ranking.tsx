import { SortBy } from "./SortBy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faSliders } from "@fortawesome/free-solid-svg-icons";
import { FilterPopover } from "./FilterPopover";
import { RangeMenu } from "./RangeMenu";
import { Configure } from "react-instantsearch-hooks-web";
import { Popover, Transition } from "@headlessui/react";
import { ArrowLeftIcon, ArrowRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, ReactNode, useEffect, useState } from "react";

export function Ranking({rangeProps, sortProps}) {
    
    return (
        <div className='flex flex-col md:flex-row gap-4'>
            <Configure />
            <div className="hidden sm:block">
                <Filtering {...rangeProps} />
            </div>
            <RankingPopover rangeProps={rangeProps} sortProps={sortProps}/>
        </div>
    )
}

export function RankingPopover({rangeProps, sortProps}) {
    return (
        <Popover>
            {({ open }) =>
                <>
                    <Popover.Button disabled={open} className="sm:hidden flex flex-row gap-2 place-items-center">
                        <FontAwesomeIcon icon={faSliders} />
                        Filtern und Sortieren
                    </Popover.Button>
                    <Popover.Overlay className="fixed inset-0 bg-black opacity-30"/>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-50"
                        enterFrom="opacity-0 translate-x-full"
                        enterTo="opacity-100 translate-x-0"
                        leave="transition ease-in duration-50"
                        leaveFrom="opacity-100 translate-x-0"
                        leaveTo="opacity-0 translate-x-full"
                    >
                        <Popover.Panel className="fixed flex flex-col divide-y-2 top-0 right-0 z-5 overflow-hidden bg-white w-5/6 h-screen ">
                            <div className="grid grid-cols-3 place-items-center place-content-center">
                                <div className="col-span-2 place-self-center">
                                    Filtern und Sortieren
                                </div>
                                <Popover.Button className="rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                    <XMarkIcon className="h-8 w-8" aria-hidden="true" />
                                </Popover.Button>
                                </div>
                            <div className='flex flex-col gap-5 py-40 px-10'>
                                <InnerRankingPopover text="Preis">
                                    <RangeMenu {...rangeProps}/>
                                </InnerRankingPopover>
                                <Sorting {...sortProps}/>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            }
        </Popover>
    )
}

export function InnerRankingPopover({text, children}: {text: string, children?: ReactNode}){
    return(
        <Popover>
                                    {({ open }) =>
                                        <>
                                            <Popover.Button
                                                className={'text-black group inline-flex items-center text-base hover:underline focus:outline-none'}
                                            >
                                                <span className='text-base'>Preis</span>
                                                <ArrowRightIcon className={'text-black ml-2 h-4 w-4'}
                                                    aria-hidden="true"
                                                />
                                            </Popover.Button>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-50"
                                                enterFrom="opacity-0 translate-x-full"
                                                enterTo="opacity-100 translate-x-0"
                                                leave="transition ease-in duration-50"
                                                leaveFrom="opacity-100 translate-x-0"
                                                leaveTo="opacity-0 translate-x-full"
                                            >
                                                <Popover.Panel className="fixed top-0 left-0 z-10 bg-white w-full h-screen">

                                                    <div className="flex flex-col gap-5 py-20 px-10">
                                                        <Popover.Button className={'text-black group inline-flex gap-2 items-center text-base hover:underline focus:outline-none'}>
                                                            <ArrowLeftIcon
                                                                className={'text-black ml-2 h-4 w-4 group-hover:text-white'}
                                                                aria-hidden="true"
                                                            />
                                                            <span className='text-base'>{text}</span>
                                                        </Popover.Button>
                                                        {children}
                                                    </div>
                                                </Popover.Panel>
                                            </Transition>
                                        </>}
                                </Popover>
    )
}

export function Filtering(rangeProps) {
    return (
        <div className='flex flex-row gap-2 place-items-center'>
            <div className="text-sm">
                Filter:
            </div>
            <div className="flex flex-row gap-10">
                <Pricing {...rangeProps}/>
            </div>
        </div>
    )
}

export function Sorting(sortProps) {
    return (
        <div className='flex sm:flex-row place-items-center cursor-pointer'>
            <div className='text-sm'>
                Sortieren nach:
            </div>
            <SortBy {...sortProps}/>
        </div>
    )
}


export function Pricing(rangeProps) {
    return (
        <Popover>
            <Popover.Button className="cursor-pointer group flex flex-row gap-2">
                <div className="group-hover:underline">
                    Pricing
                </div>
                <FontAwesomeIcon icon={faChevronDown} className="self-center w-3 h-3" />
            </Popover.Button>
            <FilterPopover>
                <RangeMenu {...rangeProps}/>
            </FilterPopover>
        </Popover>
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
    return (
        <Popover>
            <Popover.Button className="cursor-pointer group flex flex-row gap-2">
                <div className="group-hover:underline">
                    Verfügbarkeit
                </div>
                <FontAwesomeIcon icon={faChevronDown} className="self-center w-3 h-3" />
            </Popover.Button>
            <FilterPopover>
                <AvailabilityMenu />
            </FilterPopover>
        </Popover>
    )
}