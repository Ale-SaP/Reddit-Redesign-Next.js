import { useState } from 'react';
import axios from 'axios';

async function postActions(action: string, id: string) {
  const instance = axios.create();
  const response = await instance.post("api/posts-actions", {"action": action, "postId": id});
  return response;
}

export default function SideButtons(props: Props) {
  const activeUpvoated = 'btn btn-md bg-green-500 hover:bg-green-700 text-white font-bold rounded focus:outline-none focus:shadow-outline p-2 m-1'
  const inactiveUpvoated = 'btn btn-md btn-outline btn-success text-white font-bold rounded focus:outline-none focus:shadow-outline p-2 m-1'
  const activeDownvoated = 'btn btn-md bg-red-500 hover:bg-red-700 text-white font-bold rounded focus:outline-none focus:shadow-outline p-2 m-1'
  const inactiveDownvoated = 'btn btn-md btn-outline btn-error text-white font-bold rounded focus:outline-none focus:shadow-outline p-2 m-1'

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

  const upvoteClass = `btn ${activeButtons[0]}`;
  const downvoteClass = `btn ${activeButtons[1]}`;

  return (
    <div className="flex flex-col p-1">
      <h1 className="m-2 text-xl bg-origin-padding rounded text-white font-semibold justify-center">{props.score}</h1>
      <button className={upvoteClass} onClick={handleUpvote}>⬆️</button>
      <button className={downvoteClass} onClick={handleDownvote}>⬇️</button>
      <button className='btn btn-outline btn-info text-white font-bold rounded focus:outline-none focus:shadow-outline p-2 m-1'>⚙️</button>
    </div>
  );
}

interface Props {
    id: string,
    score: number,
}
//type refers to if we are trying to interact with a post or with a comment or else.