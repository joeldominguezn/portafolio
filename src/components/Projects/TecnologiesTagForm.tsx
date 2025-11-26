import { useEffect, useRef, useState } from "react"
import type { Category } from "../../types/types"
import CloseIcon from "../Icons/CloseIcon"

interface Props {
    availableOptions: Category[]
    placeholder?: string
    onTecSelected: (tecs: Category[]) => void
}
export default function TecnologiesTagForm({availableOptions,placeholder = "Selecciona...",onTecSelected}:Props) {
    const [selected, setSelected] = useState<Category[]>([])
    const [inputValue, setInputValue] = useState<string>("")
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const filteredOptions = availableOptions.filter(
        option => option.name.toLowerCase().includes(inputValue.toLowerCase()) &&
        !selected.find(s=> s.id === option.id)
    )
    const addTag = (option: Category) => {
        const newSelected = [...selected,option]
        setSelected(newSelected)
        onTecSelected(newSelected)
        setInputValue("")
        inputRef.current?.focus()
    }
    const removeTag = (id: string) => {
        const newSelected = selected.filter(option => option.id !== id)
        setSelected(newSelected)
        onTecSelected(newSelected)
    }
    const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Backspace" && inputValue === "" && selected.length > 0){
            removeTag(selected[selected.length - 1].id)
        }
        if(e.key === "Enter" && inputValue !== "" && filteredOptions.length > 0){
            addTag(filteredOptions[0])
        }
    }
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && 
                inputRef.current && !inputRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    },[])
    return (
        <div className="relative w-full py-5">
            <div 
                className="flex flex-wrap items-center bg-container-2 border border-text shadow-2xl p-1 gap-x-2 rounded-lg"
                onClick={() => {
                    inputRef.current?.focus()
                    setIsOpen(true)
                }}
            >
                {selected.map(tag=>(
                    <div 
                        className="inline-flex items-center text-xs font-medium px-1.5 py-0.5 cursor-default rounded-xl bg-blue-100 border-blue-800 text-blue-800 dark:bg-blue-900 dark:border-blue-300 dark:text-blue-300"
                        key={tag.id}
                    >
                        {tag.name}
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation()
                                removeTag(tag.id)
                            }}
                            className="inline-flex items-center justify-center p-1 ms-2 text-blue-400 bg-transparent rounded-full cursor-pointer hover:bg-blue-300 hover:text-blue-900 dark:hover:bg-blue-500 dark:hover:text-blue-200"
                            aria-label="Remove"
                        >
                            <CloseIcon className="size-2 stroke-text"/>
                            <div className="sr-only">Remove Button</div>
                        </button>
                    </div>
                ))}
                <input 
                    ref={inputRef}
                    type="text"
                    className="flex grow bg-transparent border-none outline-none p-0 text-gray-900 dark:text-gray-300 min-w-[100px] placeholder-gray-500 focus:ring-transparent ml-1"
                    placeholder={selected.length === 0?placeholder:""}
                    value={inputValue}
                    onChange={(e)=>{
                        setInputValue(e.target.value)
                        setIsOpen(true)
                    }}
                    onKeyDown={handleKeyDown}
                    onFocus={()=>setIsOpen(true)}
                />
            </div>
            {isOpen && filteredOptions.length > 0 &&
                <div ref={dropdownRef} className="absolute z-10 w-full mt-1 bg-container-2 shadow-2xl rounded-xl max-h-60 overflow-y-auto outline outline-text">
                    <nav className="py-1 text-sm text-gray-700 dark:text-gray-200">
                        {filteredOptions.map((item,index)=>(
                            <button
                                key={index}
                                className="w-full text-start px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={()=>addTag(item)}
                            >
                                {item.name}
                            </button>
                        ))}
                    </nav>
                </div>
            }
        </div>
    )
}