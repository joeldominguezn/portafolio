import { useState, type JSX } from "react"
import DotIcon from "../Icons/DotIcon"
import SortIcon from "../Icons/SortIcon"
import type { SortState } from "../../types/types"

type SortKey = 'none' | 'asc' | 'desc';

const StateMap = {
    none: <DotIcon className="size-4 fill-text" />,
    asc: <SortIcon className="size-4 fill-text rotate-180" />,
    desc: <SortIcon className="size-4 fill-text" />
}
interface Props {
    states: SortState[]
    onSort: (id: string) => void
}
export default function SortButtons({ states, onSort }: Props) {
    const getClass = (index: number) => {
        if (index === 0) return "md:rounded-l-xl"
        if (index === states.length - 1) return "md:rounded-r-xl"
        return ""
    }
    return (
        <div className="flex items-center py-5 w-full">
            <div className="flex flex-wrap gap-2 md:gap-0 md:inline-flex justify-center w-full" role="group">
                {states.map((item, index) => (
                    <button
                        type="button"
                        className={
                            `inline-flex items-center px-3 py-2 text-xs md:text-base font-medium gap-x-2 outline outline-text
                    cursor-pointer whitespace-nowrap transition-colors
                    
                    ${item.state !== "none" ? "bg-blue-100 dark:bg-blue-800" : "hover:bg-blue-100 dark:hover:bg-blue-700"}
                    rounded-lg
                    md:rounded-none
                    ${index === 0 ? 'md:rounded-l-xl' : ''} 
                    ${index === states.length - 1 ? 'md:rounded-r-xl' : ''}
                    `
                        }
                        key={item.id}
                        onClick={() => onSort(item.id)}
                    >
                        {item.title}
                        {StateMap[item.state as SortKey]}
                    </button>
                ))}
            </div>
        </div>
    )
}