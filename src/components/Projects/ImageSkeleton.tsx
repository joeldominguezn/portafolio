import ImageIcon from "../Icons/ImageIcon";

export default function ImageSkeleton({className}: {className: string}) {
    return (
        <div role="status" className={`flex items-center justify-center w-full animate-pulse ${className} bg-gray-500`}>
            <ImageIcon className="size-11 stroke-gray-300" />
        </div>
    )
}