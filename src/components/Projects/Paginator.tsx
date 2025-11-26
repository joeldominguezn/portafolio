interface Props {
    currentPage: number
    totalItems: number
    pageSize: number
    onPageChange: (index:number) => void
    onPageSizeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export default function Paginator({currentPage, totalItems, pageSize, onPageChange, onPageSizeChange}:Props) {
    const totalPages = Math.ceil(totalItems/pageSize)
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const prevNextClass = "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-container-2 border border-text hover:bg-container-1 hover:text-text dark:text-gray-400";
    const baseButtonClass = "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-container-2 border border-text hover:bg-blue-400 hover:text-text dark:text-gray-400";
    const activeButtonClass = "flex items-center justify-center px-3 h-8 text-text border border-text bg-blue-300 hover:bg-blue-200 hover:text-blue-700 dark:bg-blue-700";
    return (
        <nav className="flex items-center justify-center space-x-4 flex-wrap py-5" aria-label="Page navigation">
            {totalPages > 1 && 
                <nav className="flex -space-x-px text-sm" >
                    <button 
                        disabled={currentPage === 1}
                        className={`${prevNextClass} rounded-s-lg disabled:opacity-50 disabled:cursor-not-allowed`}
                        onClick={()=>onPageChange(currentPage-1)}
                    >
                        Anterior
                    </button>
                    {pages.map(page=>(
                        <button 
                            key={page}
                            onClick={()=>onPageChange(page)}
                            className={currentPage === page?activeButtonClass:baseButtonClass}
                        >
                            {page}
                        </button>
                    ))}
                    <button 
                        disabled={currentPage === totalPages}
                        className={`${prevNextClass} rounded-e-lg disabled:opacity-50 disabled:cursor-not-allowed`}
                        onClick={()=>onPageChange(currentPage+1)}
                    >
                        Siguiente
                    </button>
                </nav>
            }
            <div className="w-32">
                <label htmlFor="projects" className="sr-only">Selecciona una opción</label>
                <select 
                    id="projects" 
                    className="block w-full px-3 py-2.5 bg-container-2 border border-text text-text text-sm leading-4 rounded-base shadow-xs placeholder:text-body" 
                    onChange={onPageSizeChange}
                >
                    <option value={6}>6 por página</option>
                    <option value={10}>10 por página</option>
                    <option value={25}>25 por página</option>
                    <option value={50}>50 por página</option>
                    <option value={100}>100 por página</option>
                </select>
            </div>
        </nav>
    )
}