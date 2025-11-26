import { useState } from "react";
import SearchIcon from "../Icons/SearchIcon";

interface Props {
    onSearch: (text: string) => void
}

export default function SearchBar({onSearch}:Props) {
    const [searchText, setSearchText] = useState("")
    const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value)
    }
    return (
        <div className="flex items-center py-5">
            <label htmlFor="search" className="sr-only">Búsqueda</label>
            <input
                type="text"
                id="search"
                className="bg-container-2 border border-text text-text text-sm rounded-lg w-full max-w-150"
                placeholder="Buscar por título o descripción"
                value={searchText}
                onChange={handleSearch}
            />
            <button
                type="submit"
                className="inline-flex items-center rounded-lg py-2.5 px-3 ms-2 text-sm font-medium bg-blue-300 text-blue-800 dark:bg-blue-900 dark:text-blue-300 shadow-2xl hover:bg-blue-100 dark:hover:bg-blue-500 hover:text-blue-500 dark:hover:text-blue-100 cursor-pointer"
                onClick={()=>onSearch(searchText)}
                >
                <SearchIcon className="size-4 me-2"/> Buscar
            </button>
        </div>
    )
}