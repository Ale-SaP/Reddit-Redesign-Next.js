import { useState } from "react"
import Comments from "./comments"
import SideButtons from "./sideButtons"
import Images from "./images"

function cutText(text: string, limit: number) {
    if (text.length > limit) {
        const splitText = text.slice(0, limit) + "..."
        return splitText
    }
    else { return text }
}

export default function Post(props: Parameters) {
    const [commentsLoaded, setComments] = useState(false)
    const [show, setShow] = useState("")
    const [commentsButton, setCommentsButton] = useState("Show Comments")

    const [textButton, setTextButton] = useState(() => {
        if ((props.body).length > 150) { return "Show More..." }
        else { return "" }
    })
    const [text, setText] = useState(cutText(props.body, 200))

    const handleText = () => {
        if (textButton === "Show More...") {
            setTextButton("Show less...")
            setText(props.body)
        }
        else {
            setTextButton("Show More...")
            setText(cutText(props.body, 150))
        }
    }

    const handleComments = () => {
        if (commentsButton === "Show Comments") {
            setCommentsButton("Hide Comments")
            setShow("")
            if (commentsLoaded === false) {
                { setComments(true) }
            }
        }
        else {
            setShow("none")
            setCommentsButton("Show Comments")
        }
    }

    return (
        <div key={props.id} className="w-full">
            <div className="max-w-xl rounded overflow-hidden shadow-lg">
                <div className="px-6 py-4 flex">
                    <SideButtons upvoted={false} downvoated={false} />
                    <div className="flex-grow">
                        <div className="font-light italic text-xl mb-1 text-gray-500">{props.subreddit} - u/{props.author}</div>
                        <h1 className="font-bold text-xl mb-2">{props.title}</h1>
                        <p className="text-gray-300 text-base mb-3 flex-grow">{text}</p>
                        <div className="flex flex-row p-4">
                            <button className="" onClick={() => handleText()}>{textButton}</button>
                        </div>
                        <Images thumbnail={props.thumbnail} image={props.image}/>
                        <div className="flex flex-row space-x-4 align-bottom">
                            <button className="btn" onClick={() => handleComments()}>{commentsButton}</button>
                        </div>
                        <div style={{ display: show }}>
                            {commentsLoaded ? (
                                <>
                                    <Comments id={props.id} />
                                </>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

interface Parameters {
    author: string,
    id: string,
    title: string,
    body: string,
    subreddit: string,
    thumbnail: string,
    image: string,
}