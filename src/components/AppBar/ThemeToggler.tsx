import { useEffect, useState } from "react"
import SunIcon from "../Icons/SunIcon"
import MoonIcon from "../Icons/MoonIcon"

type Theme = "light" | "dark"

export default function ThemeToggler() {
    const [theme, setTheme] = useState<Theme>("light")
    function ChangeTheme(newTheme: string){
        const root = document.documentElement;
        if (newTheme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem("theme",newTheme)
        setTheme(newTheme as Theme)
    }
    useEffect(() => {
        function CheckTheme(){
            const root = document.documentElement;
            if(root.classList.contains("dark")){
                setTheme("dark");
            } else {
                setTheme("light");
            }
        }
        CheckTheme();
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    CheckTheme();
                }
            });
        });
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        })
        return () => observer.disconnect();
    },[theme])
    return (
        <div className="flex items-center ml-auto">
            {theme === "light"?
                <button onClick={()=>ChangeTheme("dark")} className="p-2 rounded-full cursor-pointer hover:outline-2 hover:outline-text">
                    <SunIcon className="size-6 stroke-text"/>
                </button>:
                <button onClick={()=>ChangeTheme("light")} className="p-2 rounded-full cursor-pointer hover:outline-2 hover:outline-text">
                    <MoonIcon className="size-6 stroke-text"/>
                </button>
            }
        </div>
    )
}