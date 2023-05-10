import { useState } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Order } from "../pages/profile";
import { Transition } from "@headlessui/react";
/**
 * Carousel component for nextJS and Tailwind.
 * Using external library react-easy-swipe for swipe gestures on mobile devices (optional)
 *
 * @param images - Array of images with src and alt attributes
 * @returns React component
 */
export default function Carousel({ nodes }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const handleNextSlide = () => {
    let newSlide = (currentSlide + 1)%2;
    console.log(currentSlide);
    
    console.log(newSlide);
    
    setCurrentSlide(newSlide);
  };

  const handlePrevSlide = () => {
    let newSlide = currentSlide === 0 ? nodes.length - 1 : currentSlide - 1;
    setCurrentSlide(newSlide);
  };

  return (
    <div className="flex flex-row gap-2 place-items-center relative w-full">
      {nodes.length > 1 && <ArrowLeftIcon
        onClick={handlePrevSlide}
        className="w-6 h-6 md:w-8 md:h-8 cursor-pointer text-gray-400"
      />}
      <div className="flex overflow-hidden w-60 whitespace-normal sm:whitespace-nowrap">
        {nodes.map(({ node }, index) => {
          return (
            <Transition
              enter="transition-all ease-in-out duration-500 delay-1000"
              enterFrom="opacity-0 translate-x-full"
              enterTo="opacity-100 translate-x-0"
              leave="transition-all ease-in-out duration-700"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 -translate-x-full"
              show={index === currentSlide}>
                <Order node={node} />
            </Transition>
          );
        })}
      </div>
      {nodes.length > 1 && <ArrowRightIcon
        onClick={handleNextSlide}
        className="w-6 h-6 md:w-8 md:h-8 cursor-pointer text-gray-400"
      />}
    </div>
  );
}