import { useState } from "react"
import FilterIcon from "../Icons/FilterIcon"
import Paginator from "./Paginator"
import ProjectsGrid from "./ProjectsGrid"
import SearchBar from "./SearchBar"
import SortButtons from "./SortButtons"
import TecnologiesTagForm from "./TecnologiesTagForm"
import ProjectsMock from "../../assets/mocks/projects.json"
import SortMock from "../../assets/mocks/sorts.json"
import type {Project, Category, SortState} from "../../types/types";

const mockProjects: Project[]= ProjectsMock
const mockSorts: SortState[] = SortMock


export default function ProjectsSection() {
    const Tecnologies = mockProjects.flatMap(item=>item.tecs)
    const UniqueCats = [...new Set(Tecnologies)]
    const Categories = UniqueCats.map(item=>({id: item.toLowerCase(),name:item} as Category))
    const [projects, setProjects] = useState(mockProjects)
    const [currPage, setCurrPage] = useState(1)
    const [pageSize, setPageSize] = useState(6)
    const [skip, setSkip] = useState(0)
    const [sortStates, setSortStates] = useState<SortState[]>(mockSorts)
    const [totalItems, setTotalItems] = useState(mockProjects.length)

    const onPageChange = (index: number) =>{
        setCurrPage(index)
        setSkip(pageSize*(index-1))
    }
    const onPageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = Number(e.target.value)
        setPageSize(val)
    }
    const NextState = (currState: string) => {
        if(currState === "none") return "asc"
        if(currState === "asc") return "desc"
        if(currState === "desc") return "none"
        return "none"
    }
    const onSort = (id: string) => {
        setSortStates(sortStates.map(item=>item.id === id?{...item,state:NextState(item.state)}:item))
    }
    const onTecSelected = (newSelected: Category[]) => {
        const resetProjects = [...mockProjects]
        const filteredArray = resetProjects.filter(item => newSelected.every(filt => item.tecs.includes(filt.name)))
        setProjects(filteredArray)
        setTotalItems(filteredArray.length)
    }
    const onSearch = (search: string) => {
        const resetProjects = [...mockProjects]
        const filteredArray = resetProjects.filter(item => item.title.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase()))
        setProjects(filteredArray)
        setTotalItems(filteredArray.length)
    }
    return (
        <div className="flex flex-col gap-y-5">
            <div id="filters" className="flex flex-col w-full">
                <div className="flex items-center gap-x-2">
                    <FilterIcon className="size-6 fill-text"/>
                    <h1 className="text-xl font-bold">Filtros</h1>
                </div>
                <h3 className="text-lg">Buscar</h3>
                <SearchBar onSearch={onSearch}/>
                <h3 className="text-lg">Tecnologías</h3>
                <TecnologiesTagForm availableOptions={Categories} onTecSelected={onTecSelected}/>
                <h3 className="text-lg">Ordenar</h3>
                <SortButtons states={sortStates} onSort={onSort}/>
            </div>
            <ProjectsGrid 
                items={projects} 
                skip={skip} 
                length={pageSize}
                sortAlpha={sortStates[0].state}
                sortUpdated={sortStates[1].state}
                sortCreated={sortStates[2].state}
            />
            <Paginator onPageChange={onPageChange} totalItems={totalItems} pageSize={pageSize} currentPage={currPage} onPageSizeChange={onPageSizeChange}/>
        </div>
    )
}