import { Popover, Transition } from "@headlessui/react";

export function FilterPopover({children }: { children }) {
    return (
        <div className="relative">
            <Transition
                enter="transition ease-out duration-100"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <Popover.Panel className="absolute z-10 -ml-4 mt-3 bg-white transform">
                    <div className="border border-gray-300">
                        {children}
                    </div>
                </Popover.Panel>
            </Transition>
        </div>
    )
}