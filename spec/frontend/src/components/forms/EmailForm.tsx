import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function EmailForm(){
    return (
        <form action="#">
              <div className="flex flex-col items-center sm:items-start mx-auto mb-3 space-y-4 max-w-screen-sm">
                <div className="text-gray-100 font-medium">Subscribe to our emails</div>
                <div className="flex flex-row border border-gray-300">
                    <div>
                        <label className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">E-Mail</label>
                        <input className="block p-3 w-full text-sm text-white bg-transparent sm:rounded-none sm:rounded-l-lg focus:outline-none" placeholder="E-Mail" type="email" id="email"></input>
                    </div>
                    <div className="items-center">
                        <button type="submit" className="py-3 px-5 w-full text-sm font-medium text-center text-white rounded-lg cursor-pointer bg-primary-700  sm:rounded-none sm:rounded-r-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"><ArrowRightIcon className="w-4 h-4"/></button>
                    </div>
                </div>
              </div>
          </form>
    )
}