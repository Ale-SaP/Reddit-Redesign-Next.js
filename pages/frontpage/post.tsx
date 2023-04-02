import { useState } from "react"
import Comments from "./comments"

export default function Post(props: Parameters) {
    const [commentsLoaded, setComments] = useState(false)
    const [show, setShow] = useState("")
    const [commentsButton, setCommentsButton] = useState("Show Comments")


    const handleClick = () => {
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
        <div key={props.id}>
            <div className="w-full max-w-xl rounded overflow-hidden shadow-lg">
                <div className="px-6 py-4 flex">
                    <div className="flex flex-col p-2">
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold m-1 py-2 px-2 rounded focus:outline-none focus:shadow-outline">⬆️</button>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold m-1 py-2 px-2 rounded focus:outline-none focus:shadow-outline">⬇️</button>
                        <button className="bg-black hover:bg-blue-700 text-white font-bold m-1 py-2 px-2 rounded focus:outline-none focus:shadow-outline">⚙️</button>
                    </div>
                    <div className="flex-grow">
                        <div className="font-light italic text-xl mb-1 text-gray-500">{props.subreddit} - u/{props.author}</div>
                        <h1 className="font-bold text-xl mb-2">{props.title}</h1>
                        <p className="text-gray-300 text-base mb-3 flex-grow">{props.body}</p>
                        <div className="flex flex-row space-x-4 align-bottom">
                            <button className="btn" onClick={() => handleClick()}>{commentsButton}</button>
                        </div>
                    </div>
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

    )
}

interface Parameters {
    author: string,
    id: string,
    title: string,
    body: string,
    subreddit: string,
}