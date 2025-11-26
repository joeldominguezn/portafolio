interface Props {
    title: string
    classColor: string
    classDarkColor: string
}
export default function Badges({title,classColor,classDarkColor}:Props) {
    return (
        <span
            className={`text-xs font-medium px-1.5 py-0.5 rounded ${classColor} ${classDarkColor}`}
        >
            {title}
        </span>
    )
}