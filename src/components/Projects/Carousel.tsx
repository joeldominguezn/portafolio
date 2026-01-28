import { useState } from "react"
import type { Project } from "../../types/types";
import RightArrow from "../Icons/RightArrow";



export default function Carousel({ item }: { item: Project }) {
    const [activeIndex, setActiveIndex] = useState(0)
    const imagesList = item.gallery || [
        { src: item.imageSrc, alt: item.imageAlt, title: item.title }
    ];

    const currentImage = imagesList[activeIndex];

    // Funciones de navegación (Circular)
    const prevSlide = () => {
        setActiveIndex((prev) => (prev === 0 ? imagesList.length - 1 : prev - 1));
    }

    const nextSlide = () => {
        setActiveIndex((prev) => (prev === imagesList.length - 1 ? 0 : prev + 1));
    }

    const goToSlide = (index: number) => {
        setActiveIndex(index);
    }
    return (
        < div className="flex flex-col items-center justify-center px-1 bg-container-1 rounded-lg shadow-2xl overflow-hidden h-full" >
            <div className="relative w-full flex justify-center items-center transition-opacity duration-500 ease-in-out" >
                <img
                    src={currentImage.src}
                    alt={currentImage.alt}
                    // Mantenemos tu regla del 60%
                    className="w-[60%] mx-auto h-auto max-h-[80vh] object-contain rounded-lg select-none"
                />
            </div >
            <p className="text-center mt-4 text-lg text-gray-500 dark:text-gray-400 font-medium" >
                {currentImage.title || item.title}
            </p >
            {imagesList.length > 1 && (
                <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse">
                    {imagesList.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`w-3 h-3 rounded-full transition-colors duration-300 ${index === activeIndex
                                    ? "bg-blue-600 dark:bg-blue-500 scale-110" // Activo (Color primario)
                                    : "bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600" // Inactivo
                                }`}
                            aria-current={index === activeIndex ? "true" : "false"}
                            aria-label={`Slide ${index + 1}`}
                            onClick={() => goToSlide(index)}
                        ></button>
                    ))}
                </div>
            )}
            {
                imagesList.length > 1 && (
                    <>
                        <button
                            type="button"
                            className="absolute top-0 start-0 z-10 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                            onClick={prevSlide}
                        >
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                <RightArrow className="size-5 rotate-180" />
                                <span className="sr-only">Previous</span>
                            </span>
                        </button>

                        <button
                            type="button"
                            className="absolute top-0 end-0 z-10 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                            onClick={nextSlide}
                        >
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                <RightArrow className="size-5" />
                                <span className="sr-only">Next</span>
                            </span>
                        </button>
                    </>
                )
            }
        </div >
    )
}