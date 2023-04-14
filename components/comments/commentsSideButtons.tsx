import { useState } from 'react';
import axios from 'axios';

async function postActions(action: string, id: string) {
  const instance = axios.create();
  const response = await instance.post("api/comments-actions", {"action": action, "postId": id});
  return response;
}

export default function CommentsSideButtons(props: Props) {
    const activeUpvoated = 'bg-green-500 hover:bg-green-700 text-white font-bold m-1 py-2 px-2 rounded focus:outline-none focus:shadow-outline'
    const inactiveUpvoated = 'bg-gray-500 hover:bg-green-700 text-white font-bold m-1 py-2 px-2 rounded focus:outline-none focus:shadow-outline'
    const activeDownvoated = 'bg-red-500 hover:bg-red-700 text-white font-bold m-1 py-2 px-2 rounded focus:outline-none focus:shadow-outline'
    const inactiveDownvoated =  'bg-gray-500 hover:bg-red-700 text-white font-bold m-1 py-2 px-2 rounded focus:outline-none focus:shadow-outline'

  const [upvoated, setUpvoated] = useState(false);
  const [downvoated, setDownvoated] = useState(false);
  const [activeButtons, setActiveButtons] = useState([inactiveUpvoated, inactiveDownvoated]);
    
  async function handleUpvote() {
    if (upvoated) {
      setUpvoated(false);
      setActiveButtons([inactiveUpvoated, inactiveDownvoated]);
      await postActions("none", props.id);
    } else {
      setUpvoated(true);
      setDownvoated(false);
      setActiveButtons([activeUpvoated, inactiveDownvoated]);
      await postActions("upvote", props.id);
    }
  }

  async function handleDownvote() {
    if (downvoated) {
      setDownvoated(false);
      setActiveButtons([inactiveUpvoated, inactiveDownvoated]);
      await postActions("none", props.id);
    } else {
      setDownvoated(true);
      setUpvoated(false);
      setActiveButtons([inactiveUpvoated, activeDownvoated]);
      await postActions("downvote", props.id);
    }
  }

  return (
    <div className="flex flex-col content-center">
      {props.score < 1 ? <h1 className="p-2 text-white text-xl font-semibold justify-center">{props.score}</h1> 
      : <h1 className="p-2 text-xl text-white font-semibold justify-center">{props.score}</h1> }
      <button className={activeButtons[0]} onClick={handleUpvote}>⬆️</button>
      <button className={activeButtons[1]} onClick={handleDownvote}>⬇️</button>
      <button >⚙️</button>
    </div>
  );
}

interface Props {
    id: string,
    score: number,
}