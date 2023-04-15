import { useState } from "react";

export default function Images(props: Parameters) {
    const [imageState, setImageState] = useState("Collapse...");
    const [image, setImage] = useState(() => {
        if (props.image.includes("https://i.redd.it/")) {
            return props.image
        }
        else {
            return props.thumbnail
        }
    });

    const onExpand = () => {
        setImageState(imageState === "Expand..." ? "Collapse" : "Expand...");
        setImage(image === props.thumbnail ? props.image : props.thumbnail);
    };

    if (props.thumbnail === "default" || props.thumbnail === "self") {
        return <></>;
    }

    if (!props.image.includes("https://i.redd.it/")) {
        return (
            <div className="py-4 max-w-sm">
                <img src={image} alt="" />
            </div>)
    }

    return (
        <div className="py-4 max-w-sm">
            <img src={image} alt="" />
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
