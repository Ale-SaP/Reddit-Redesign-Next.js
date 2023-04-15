import { useState } from 'react';
import axios from 'axios';

async function postActions(action: string, id: string) {
  const instance = axios.create();
  const response = await instance.post("api/comments-actions", { "action": action, "postId": id });
  return response;
}

export default function CommentsButtons(props: Props) {
  const activeUpvoated = 'btn btn-sm bg-green-500 hover:bg-green-700 text-white font-bold rounded focus:outline-none focus:shadow-outline p-2 m-1'
  const inactiveUpvoated = 'btn btn-sm btn-outline btn-success text-white font-bold rounded focus:outline-none focus:shadow-outline p-2 m-1'
  const activeDownvoated = 'btn btn-sm bg-red-500 hover:bg-red-700 text-white font-bold rounded focus:outline-none focus:shadow-outline p-2 m-1'
  const inactiveDownvoated = 'btn btn-sm btn-outline btn-error text-white font-bold rounded focus:outline-none focus:shadow-outline p-2 m-1'

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
    <>
      {props.score ? (
        <h1 className="p-2 text-white text-md font-semibold justify-center">{props.score}</h1>
      ) : (
        <h1 className="p-2 text-md text-white font-semibold justify-center">{props.score}</h1>
      )}
      {!props.locked ? <>
      <button className={activeButtons[0]} onClick={handleUpvote}>⬆️</button>
      <button className={activeButtons[1]} onClick={handleDownvote}>⬇️</button>
      <button className='btn btn-sm btn-outline btn-info text-white font-bold rounded focus:outline-none focus:shadow-outline p-2 m-1'>⚙️</button>
        </> : 
        <>
          <button className="btn btn-sm btn-outline btn-warning p-2 m-1" >🔒</button>
        </>
        }

    </>

  );
}

interface Props {
  id: string,
  score: number,
  locked: boolean,
}