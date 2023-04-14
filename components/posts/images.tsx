import { useState } from "react";

export default function Images(props: Parameters) {
    const [imageState, setImageState] = useState("Expand...");
    const [image, setImage] = useState(props.thumbnail);

    const onExpand = () => {
        setImageState(imageState === "Expand..." ? "Collapse" : "Expand...");
        setImage(image === props.thumbnail ? props.image : props.thumbnail);
    };

    if (props.thumbnail === "default" || props.thumbnail === "self") {
        return <></>;
    }

    if (!props.image.includes("https://i.redd.it/")) {
        return (
        <div className="py-4">
            <img src={image} alt="" />
        </div>)
    }

    return (
        <div className="py-4 max-w-sm">
            <img src={image} className="hover:max-w-lg" alt="" />
            <button className="btn btn-xs mt-4" onClick={onExpand}>
                {imageState}
            </button>
        </div>
    );
}

interface Parameters {
    thumbnail: string;
    image: string;
}
