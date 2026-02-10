import SunIcon from "../Icons/SunIcon"
import MoonIcon from "../Icons/MoonIcon"
import { useThemeHook } from "../useThemeHook"

export default function ThemeToggler() {
    const { theme, setTheme } = useThemeHook()
    return (
        <div className="flex items-center ml-auto">
            {theme === "light"?
                <button onClick={()=>setTheme("dark")} className="p-2 rounded-full cursor-pointer hover:outline-2 hover:outline-text">
                    <SunIcon className="size-6 stroke-text"/>
                </button>:
                <button onClick={()=>setTheme("light")} className="p-2 rounded-full cursor-pointer hover:outline-2 hover:outline-text">
                    <MoonIcon className="size-6 stroke-text"/>
                </button>
            }
        </div>
    )
}