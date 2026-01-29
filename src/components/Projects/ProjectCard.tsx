import { useState } from "react";
import Badges from "../Badges";
import RightArrow from "../Icons/RightArrow";
import ImageRegister from "./ImageRegister";
import type {Project} from "../../types/types";
import dayjs from "dayjs";
import SearchIcon from "../Icons/SearchIcon";
import CloseIcon from "../Icons/CloseIcon";
import ImageModal from "./ImageModal";
interface Props {
    item: Project
}
export default function ProjectCard({item}:Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => setIsModalOpen(!isModalOpen);
    return (
        <>
            <div className="w-full max-w-sm bg-container-2 border-2 border-container-1 rounded-lg shadow-2xl">
                <div onClick={toggleModal} className="cursor-pointer group relative overflow-hidden rounded-t-lg">
                    <ImageRegister ImgClass="rounded-t-lg h-50 w-full object-cover object-top" src={item.imageSrc} alt={item.imageAlt}/>
                    <div className="absolute inset-0 group-hover:bg-container-1/40 transition-all duration-300 flex items-center justify-center">
                        <SearchIcon className="size-8 text-text opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                    </div>
                </div>
                <div className="p-5">
                    <a href={item.link}>
                        <h5
                            className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {item.title}
                        </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {item.description}
                    </p>
                    <div className="flex flex-col gap-2 flex-wrap py-2">
                        <h3
                            className="text-gray-500 dark:text-gray-300 text-md font-semibold"
                        >
                            Nivel de Importancia: <span className="text-red-600 dark:text-red-400 text-md">{item.priority}</span>
                        </h3>
                        <h3
                            className="text-gray-500 dark:text-gray-300 text-md font-semibold"
                        >
                            Creado: <span className="text-blue-600 dark:text-blue-400 text-md">{dayjs(item.createdAt).format("DD/MM/YYYY HH:mm:ss").toString().substring(0,10)}</span>
                        </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {item.tecs.map((tec,index) => (
                            <Badges
                                title={tec}
                                classColor='bg-teal-100 border-teal-800 text-teal-800'
                                classDarkColor='dark:bg-teal-900 dark:border-teal-300 dark:text-teal-300'
                                key={index}
                            />
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-4 py-4">
                        <a
                            href={item.link}
                            target="_blank"
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-800 bg-blue-300 border border-blue-300 rounded-lg hover:bg-blue-100 hover:text-blue-600 dark:bg-blue-800 dark:text-blue-300 dark:border-blue-600 dark:hover:text-blue-100 dark:hover:bg-blue-700">
                            Ver el Repositorio
                            <RightArrow className="size-4 ms-2 fill-blue-800 hover:fill-blue-600 dark:fill-blue-300 dark:hover:fill-blue-100" />
                        </a>
                        {item.liveLink &&
                            <a
                                href={item.liveLink}
                                target="_blank"
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-sky-800 bg-sky-300 border border-sky-300 rounded-lg hover:bg-sky-100 hover:text-sky-600 dark:bg-sky-800 dark:text-sky-300 dark:border-sky-600 dark:hover:text-sky-100 dark:hover:bg-sky-700">
                                Ver el Proyecto en Vivo
                                <RightArrow className="size-4 ms-2 fill-sky-800 hover:fill-sky-600 dark:fill-sky-300 dark:hover:fill-sky-100" />
                            </a>
                        }
                    </div>
                </div>
            </div>
            {isModalOpen && <ImageModal toggleModal={toggleModal} item={item}/>}
        </>
    )
}