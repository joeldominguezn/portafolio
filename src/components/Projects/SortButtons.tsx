import { useState, type JSX } from "react"
import DotIcon from "../Icons/DotIcon"
import SortIcon from "../Icons/SortIcon"
import type { SortState } from "../../types/types"

type SortKey = 'none' | 'asc' | 'desc';

const StateMap = {
    none: <DotIcon className="size-4 fill-text"/>,
    asc: <SortIcon className="size-4 fill-text rotate-180"/>,
    desc: <SortIcon className="size-4 fill-text"/>
}
interface Props {
    states: SortState[]
    onSort: (id:string) => void
}
export default function SortButtons({states,onSort}:Props) {
    const getClass = (index: number) => {
        if(index === 0) return "rounded-s-lg"
        if(index === states.length-1) return "rounded-e-lg"
        return ""
    }
    return (
        <div className="flex items-center py-5">
            <div className="inline-flex rounded-xl shadow-xl justify-center" role="group">
                {states.map((item,index)=>(
                    <button
                        type="button"
                        className={
                            `inline-flex items-center px-4 py-2 text-sm font-medium gap-x-2 outline outline-text
                            cursor-pointer ${item.state !== "none"?"bg-blue-100 dark:bg-blue-800 hover:bg-blue-300 dark:hover:bg-blue-400":"hover:bg-blue-100 dark:hover:bg-blue-700"}
                            ${getClass(index)}
                            `}
                        key={item.id}
                        onClick={()=>onSort(item.id)}
                    >
                        {item.title}
                        {StateMap[item.state as SortKey]}
                    </button>
                ))}
            </div>
        </div>
    )
}