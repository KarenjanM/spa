import { Fragment, useContext, useMemo, useState } from 'react';
import { Transition, Popover } from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  UserIcon,
  ShoppingBagIcon,
  ArrowRightIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import { CheckoutContext } from '../contexts/checkoutContext';
import { useGetCheckout } from '../hooks/checkout';
import { SearchPopover } from './search/Search';
import { useAppSelector } from '../redux/hooks';

// examples for menus
const solutions = [
  {
    name: 'Alle Produkte',
    description: 'Get a better understanding of where your traffic is coming from.',
    href: '/products',
  },
  {
    name: 'Daily Planner',
    description: 'Speak directly to your customers in a more meaningful way.',
    href: '/products/categories/planner',
  },
  { name: 'Kalender 2023', description: "Your customers' data will be safe and secure.", href: '/products/categories/calendar' },
  {
    name: 'Familienkalender 2023',
    description: "Connect with third-party tools that you're already using.",
    href: '/products/categories/familiencalendar',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  const { checkoutId } = useContext(CheckoutContext);
  const { data, loading, error } = useGetCheckout({ checkoutId: checkoutId });
  const [showSearch, setShowSearch] = useState(false);
  const [hideOverflow, setHideOverflow] = useState(false);

  useMemo(()=>hideOverflow ? document.body.classList.add("overflow-hidden") : document.body.classList.remove("overflow-hidden"), [hideOverflow])

  function getTotalQuantity() {
    let total = 0;

    if (data?.checkout) {
      data.checkout.lines.map((line) => total += line.quantity)
    }
    return total
  }

  return (
    <Popover id='header' className="relative bg-stone-600">
      {({open,close})=>{
        open !== hideOverflow && setHideOverflow(open);
        return (
      <>
      <div className="mx-auto max-w-7xl px-6">
        <div className={`flex flex-row items-center border-gray-100 py-6 ${showSearch ? "justify-center" : "justify-between"} `}>
          {showSearch ? (
            <div className='flex flex-row justify-center gap-3 place-items-center'>
              <SearchPopover setShowSearch={setShowSearch} />
              <XMarkIcon onClick={() => setShowSearch(false)} className='w-6 h-6 cursor-pointer' color='white' />
            </div>
          ) : (
            <>
              <div className="-my-2 -mr-2 md:hidden">
                <Popover.Button className="items-center justify-center rounded-md p-2 text-gray-400 hover:bg-stone-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
                  {open ? <XMarkIcon className="h-6 w-6" aria-hidden="true"/> : <Bars3Icon className="h-6 w-6" aria-hidden="true" />}
                </Popover.Button>
              </div>
              <div className='flex flex-row gap-10 place-items-center'>
                <Link href="/" className=''>
                  <span className="sr-only">KreaTeam</span>
                  <img
                    className="h-8 w-auto sm:h-10"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                </Link>
                <NavPopover />
              </div>
              <div className="items-center justify-end flex lg:w-0">
                <div onClick={() => setShowSearch(true)} className="whitespace-nowrap text-base font-medium text-gray-300 hover:text-white">
                  <MagnifyingGlassIcon
                    className='ml-4 h-5 w-5'
                  />
                </div>
                <Link
                  href="/profile"
                  className="hidden sm:block whitespace-nowrap text-base font-medium text-gray-300 hover:text-white"
                >
                  <UserIcon className='ml-4 h-5 w-5' />
                </Link>
                <Link
                  href="/cart"
                  className='whitespace-nowrap text-base font-medium text-gray-300 hover:text-white relative'
                >
                  <ShoppingBagIcon className="ml-4 h-7 w-7" />
                  <span className="absolute right-0 bottom-0 rounded-full bg-white w-4 h-4 text-black font-mono text-sm leading-4 text-center">{getTotalQuantity()}
                  </span>
                </Link>

              </div>
            </>
          )}

        </div>
      </div>
      <SideNavbar close={close} />
      </>)}}
    </Popover>
  )
}


export function NavPopover() {
  return (
    <Popover.Group as="nav" className="hidden space-x-10 md:flex">
      <Link href="/" className="text-base text-gray-300 hover:text-white hover:underline">
        Startseite
      </Link>
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={classNames(
                open ? 'text-white' : 'text-gray-300',
                'group inline-flex items-center text-base hover:text-white hover:underline focus:outline-none'
              )}
            >
              <span>KreaTeam</span>
              <ChevronDownIcon
                className={classNames(
                  open ? 'text-white' : 'text-gray-300',
                  'ml-2 h-5 w-5 group-hover:text-white'
                )}
                aria-hidden="true"
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 -ml-4 mt-3 w-screen max-w-md transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-6 bg-stone-600 px-5 py-6 sm:gap-8 sm:p-8">
                    {solutions.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={close}
                        className="-m-3 flex items-start text-gray-300 p-3 hover:bg-stone-700"
                      >
                        <div className="ml-4">
                          <p className="text-base font-medium">{item.name}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
        <Link href="/collections/juices" className="text-base text-gray-300 hover:text-white hover:underline">
          243 MOON
        </Link>
    </Popover.Group>
  )
}

export function SideNavbar(props) {
  const auth = useAppSelector((state)=>state.auth);

  return (
    <>
    <Transition
      as={Fragment}
      enter="transition ease-out duration-50"
      enterFrom="opacity-0 -translate-x-full"
      enterTo="opacity-100 translate-x-0"
      leave="transition ease-in duration-50"
      leaveFrom="opacity-100 translate-x-0"
      leaveTo="opacity-0 -translate-x-full"
    >
      <Popover.Panel className="fixed z-5 overflow-hidden grid grid-rows-5 bg-stone-600 w-5/6 h-screen">

        <div className='flex flex-col gap-5 py-40 px-10 row-span-4'>
          <Link onClick={props.close} href="/" className="text-gray-300 text-2xl hover:text-white hover:underline">
            Startseite
          </Link>
          <Popover>
            {({open})=>
            <>
                <Popover.Button
                  className={'text-gray-300 group inline-flex items-center text-base hover:text-white hover:underline focus:outline-none'}
                >
                  <span className='text-2xl'>KreaTeam</span>
                  <ArrowRightIcon
                    className={classNames(
                      open ? 'text-white' : 'text-gray-300',
                      'ml-2 h-5 w-5 group-hover:text-white'
                    )}
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
                  <Popover.Panel className="fixed top-0 left-0 bg-stone-600 w-5/6 h-screen">
                    
                      <div className="flex flex-col gap-5 py-20 px-10">
                      <Popover.Button className={'text-gray-300 group inline-flex gap-2 items-center text-base hover:text-white hover:underline focus:outline-none'}>
                    <ArrowLeftIcon
                        className={classNames(
                          open ? 'text-white' : 'text-gray-300',
                          'ml-2 h-4 w-4 group-hover:text-white'
                        )}
                        aria-hidden="true"
                      />
                      <span className='text-base'>KreaTeam</span>
                      </Popover.Button>
                        {solutions.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="-m-3 flex items-start text-gray-300 p-3 hover:bg-stone-700"
                          >
                            <div className="ml-4">
                              <p className="text-xl">{item.name}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                  </Popover.Panel>
                </Transition>
                </>}
          </Popover>
          <Link href="/products" onClick={props.close} className='text-gray-300 text-2xl'>
            243 MOON
          </Link>
        </div>
        <Link href={"/profile"} onClick={props.close} className="flex flex-row gap-2 place-items-center pb-20 bg-stone-500 grow text-gray-100">
          <UserIcon className='ml-4 h-5 w-5' />
          {!auth.loggedIn ? <div>Einloggen</div> : <div>Konto</div>}
        </Link>
      </Popover.Panel>
    </Transition>
    
    </>
  )
}