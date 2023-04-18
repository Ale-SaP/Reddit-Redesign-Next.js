import { useState } from "react"
import SideButtons from "./sideButtons"
import Images from "./images"
import CommentsHandler from "../comments/commentsHandler"
import PostInterface from "./postInterface"

function cutText(text: string, limit: number) {
    if (text.length > limit) {
        const splitText = text.slice(0, limit) + "..."
        return splitText
    }
    else { return text }
}

export default function Post(props: { post: PostInterface }) {
    const [commentsLoaded, setComments] = useState(false)
    const [commentsButton, setCommentsButton] = useState("Show Comments")

    const [textButton, setTextButton] = useState(() => {
        if ((props.post.selftext).length > 200) { return "Show More..." }
        else { return "" }
    })
    const [text, setText] = useState(cutText(props.post.selftext, 200))

    const handleText = () => {
        if (textButton === "Show More...") {
            setTextButton("Show less...")
            setText(props.post.selftext)
        }
        else {
            setTextButton("Show More...")
            setText(cutText(props.post.selftext, 150))
        }
    }

    const handleComments = () => {
        if (commentsButton === "Show Comments") {
            setCommentsButton("Hide Comments")
            if (commentsLoaded === false) {
                { setComments(true) }
            }
        }
        else {
            setCommentsButton("Show Comments")
        }
    }

    const dateObj = new Date(props.post.created * 1000);
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    const hour = dateObj.getHours();
    const date = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();

    return (
        <div key={props.post.id} className="rounded overflow-hidden shadow-xl my-2 border-solid border border-slate-700">
            <div className="py-4 flex">
                <SideButtons post={props.post}/>

                <div className="px-2">
                    <div className="mb-2">
                        <div className="font-bold italic text-xl text-gray-500">{props.post.subreddit}</div>
                        <div className="text-md italic font-light">u/{props.post.author} - {hour}:{minutes} at {date}/{month}/{year}</div>
                        <h1 className="font-bold text-xl">{props.post.title}</h1>
                    </div>
                    {text && <>
                        <p className="text-gray-300 text-base mb-3 flex-grow">{text}</p>
                        <div className="flex flex-row p-4">
                            <button className="" onClick={() => handleText()}>{textButton}</button>
                        </div>
                    </>}
                    <Images thumbnail={props.post.thumbnail} image={props.post.url} />
                    <div className="flex flex-row space-x-4 align-bottom">
                        <button className="btn btn-primary" onClick={() => handleComments()}>{commentsButton}</button>
                    </div>
                    <div className={commentsButton === "Show Comments" ? "hidden overflow-x-auto" : "overflow-x-auto"}>
                        {commentsLoaded ? (
                            <CommentsHandler id={props.post.id} />
                        ) : (
                            null
                        )}
                    </div>
                </div>
            </div>
        </div>



    )
}