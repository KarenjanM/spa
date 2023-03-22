import {XMarkIcon} from '@heroicons/react/24/outline';
import { Transition } from "@headlessui/react";
import { Fragment } from 'react';


export default function AuthAlert({show, text, hide}){
    return(
        <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
        show={show}
      >
          <div role="alert" className="">
              <div className="border border-t-0 border-red-400 flex flex-row justify-between bg-red-500 text-white font-normal px-4 py-2">
                <div>{text}</div>
                <XMarkIcon className="h-4 w-4 self-center hover:bg-red-600 hover:rounded" onClick={hide}/>
              </div>
          </div>
        </Transition>
    )
}