import type { Project } from "../../types/types"
import CloseIcon from "../Icons/CloseIcon"
import Carousel from "./Carousel"

interface ImageModalProps {
    toggleModal: ()=>void
    item: Project
}

export default function ImageModal({toggleModal, item}: ImageModalProps) {
    return (
        <div
            id="image-modal"
            tabIndex={-1}
            aria-hidden="true"
            className="fixed inset-0 z-50 flex items-center justify-center w-full max-w-base h-full bg-container-1/40 backdrop-blur-sm p-4"
            onClick={toggleModal}
        >
            <div className="relative w-full max-w-4xl h-full max-h-full" onClick={(e) => e.stopPropagation()}>
                <button
                    type="button"
                    className="absolute top-4 right-4 z-20 text-gray-400 bg-gray-200/50 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-10 h-10 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white backdrop-blur-md"
                    onClick={toggleModal}
                >
                    <CloseIcon className="size-6 stroke-text" />
                    <span className="sr-only">Cerrar modal</span>
                </button>
                <Carousel item={item}/>
            </div>
        </div>
    )
}