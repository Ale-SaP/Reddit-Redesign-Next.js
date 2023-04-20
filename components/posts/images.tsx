import { useState } from "react";
import ReactPlayer from 'react-player';

function VideoPlayer({ url }) {
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    setPlaying(true);
  };

  const handlePause = () => {
    setPlaying(false);
  };

  return (
    <div className="player-wrapper">
      <ReactPlayer
        url={url}
        className="react-player"
        width="100%"
        height="100%"
        playing={playing}
        onPlay={handlePlay}
        onPause={handlePause}
        controls={true}
      />
    </div>
  );
}


export default function Images(props: Parameters) {
    const [imageState, setImageState] = useState("Collapse...");
    const [image, setImage] = useState(() => {
        if (props.image.includes("https://i.redd.it/") || props.image.includes("https://v.redd.it/")) {
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

    if (props.image.includes("https://i.redd.it/")) {
        return (
            <div className="py-4 max-w-sm">
                <img src={image} alt="" />
                <button className="btn btn-xs mt-4" onClick={onExpand}>
                    {imageState}
                </button>
            </div>
        );
    }

    if (props.image.includes("https://v.redd.it/")) {
        return (
            <div className="py-4 max-w-sm">
                <VideoPlayer url={props.image} />
            </div>
        );
    }
    else {
        return (
            <div className="py-4 max-w-sm">
                <img src={image} alt="" />
                <a href={props.image} target="_blank" rel="noreferrer" className="hover:underline"><h1 className="text-xs font-mono italic on-hover:underline">{props.image}</h1></a>
            </div>)
    }
}

interface Parameters {
    thumbnail: string;
    image: string;
}
