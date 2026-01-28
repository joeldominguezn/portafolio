import ProjectCard from "./ProjectCard"
import type {Project} from "../../types/types";

interface Props {
    items: Project[]
    skip: number
    length: number
    sortAlpha: string
    sortCreated: string
    sortPriority: string
}
export default function ProjectsGrid({items,skip,length,sortAlpha,sortCreated,sortPriority}:Props) {
    const nextChunck = skip + length < items.length?skip + length:items.length;
    let filteredItems = [...items]
    if(sortAlpha !== "none"){
        filteredItems.sort((prev,next) => prev.title.localeCompare(next.title))
        if(sortAlpha === "desc") filteredItems.reverse()
    }
    if(sortCreated !== "none"){
        filteredItems.sort((prev,next) => 
            sortCreated === "asc"?
            (Date.parse(prev.createdAt) - Date.parse(next.createdAt)):
            (Date.parse(next.createdAt) - Date.parse(prev.createdAt))
        )
    }
    if(sortPriority !== "none"){
        filteredItems.sort((prev,next) => 
            sortPriority === "asc"?
            prev.priority - next.priority:
            next.priority - prev.priority
        )
    }
    filteredItems = filteredItems.slice(skip,nextChunck)
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 items-start mx-auto">
            {filteredItems.map((item,index)=>
                <ProjectCard item={item} key={index}/>
            )}
        </div>
    )
}