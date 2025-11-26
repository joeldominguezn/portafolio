import { useEffect, useRef, useState, type SyntheticEvent } from "react";
import ImageSkeleton from "./ImageSkeleton";
import PlaceHolder from "../../assets/images/imagePlaceholder.png"

interface Props {
    src: string
    alt: string
    ImgClass: string
}

export default function ImageRegister({src,alt,ImgClass}:Props) {
    const placeholder = PlaceHolder.src;
    const [imgSrc, setImgSrc] = useState<string | null>(null);
    const handleError = ()=>{
        setImgSrc(null)
    }
    useEffect(() => {
        setImgSrc(src)
    },[src])
    if(!imgSrc) return <ImageSkeleton className={ImgClass}/>
    return (
        <img 
            src={imgSrc}
            alt={alt}
            className={ImgClass}
            onError={handleError}
        />
    )
}