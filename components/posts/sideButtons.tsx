import { useState } from "react"
export default function SideButtons(props: Parameters) {
    const activeUpvoated = 'bg-green-500 hover:bg-green-700 text-white font-bold m-1 py-2 px-2 rounded focus:outline-none focus:shadow-outline'
    const unactiveUpvoated = 'bg-gray-500 hover:bg-green-700 text-white font-bold m-1 py-2 px-2 rounded focus:outline-none focus:shadow-outline'
    const activeDownvoated = 'bg-red-500 hover:bg-red-700 text-white font-bold m-1 py-2 px-2 rounded focus:outline-none focus:shadow-outline'
    const unactiveDownvoated =  'bg-gray-500 hover:bg-red-700 text-white font-bold m-1 py-2 px-2 rounded focus:outline-none focus:shadow-outline'


    const [upvoated, setUpvoated] = useState(props.upvoted)
    const [downvoated, setDownvoated] = useState(props.downvoated)

    const [upvoteClass, setUpvoteClass] = useState(upvoated ? activeUpvoated : unactiveUpvoated);
    const [downvoteClass, setDownvoteClass] = useState(downvoated ? activeDownvoated : unactiveDownvoated);

    const handleUpvoteClick = () => {
        setUpvoated(!upvoated);
        setUpvoteClass(upvoated ? unactiveUpvoated : activeUpvoated);
        setDownvoated(false);
        setDownvoteClass(unactiveDownvoated);
      };
      
      const handleDownvoteClick = () => {
        setDownvoated(!downvoated);
        setDownvoteClass(downvoated ? unactiveDownvoated : activeDownvoated);
        setUpvoated(false);
        setUpvoteClass(unactiveUpvoated);
      };      


    return (
        <div className="flex flex-col p-2">
            <button className={upvoteClass} onClick={handleUpvoteClick}>⬆️</button>
            <button className={downvoteClass} onClick={handleDownvoteClick}>⬇️</button>
            <button >⚙️</button>
        </div>
    )
}


interface Parameters {
    upvoted: boolean,
    downvoated: boolean,
}