import { useState } from 'react';
import axios from 'axios';
import ExtraActions from '../ExtraActions';

async function postActions(action: string, id: string) {
  const instance = axios.create();
  const response = await instance.post("api/comments-actions", { "action": action, "postId": id });
  return response;
}

export default function CommentsButtons(props: { comment: Props }) {
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
      await postActions("none", props.comment.id);
    } else {
      setUpvoated(true);
      setDownvoated(false);
      setActiveButtons([activeUpvoated, inactiveDownvoated]);
      await postActions("upvote", props.comment.id);
    }
  }

  async function handleDownvote() {
    if (downvoated) {
      setDownvoated(false);
      setActiveButtons([inactiveUpvoated, inactiveDownvoated]);
      await postActions("none", props.comment.id);
    } else {
      setDownvoated(true);
      setUpvoated(false);
      setActiveButtons([inactiveUpvoated, activeDownvoated]);
      await postActions("downvote", props.comment.id);
    }
  }

  return (
    <>
      {props.comment.score ? (
        <h1 className="p-2 text-white text-md font-semibold justify-center">{props.comment.score}</h1>
      ) : (
        <h1 className="p-2 text-md text-white font-semibold justify-center">{props.comment.score}</h1>
      )}
      {props.comment.archived ?
        <>
          <button className="btn btn-sm btn-outline btn-secondary p-2 m-1" >📁</button>
        </> :
        props.comment.locked ?
          <>
            <button className="btn btn-sm btn-outline btn-warning p-2 m-1" >🔒</button>
          </>
          : <>
            <button className={activeButtons[0]} onClick={handleUpvote}>⬆️</button>
            <button className={activeButtons[1]} onClick={handleDownvote}>⬇️</button>
            <div className="dropdown dropdown-top">
              <button>
                <label tabIndex={0} className="btn btn-sm btn-outline btn-primary rounded focus:shadow-outline p-2 m-1"> ⚙️ </label>
              </button>
              <ul tabIndex={0} className="dropdown-content menu shadow bg-[#2E1065] focus:bg-teal-300 outline outline-1 rounded-box w-40 text-white">
                <ExtraActions id={props.comment.id} link={props.comment.permalink} isSaved={props.comment.saved} />
              </ul>
            </div>
          </>
      }


    </>

  );
}

interface Props {
  id: string,
  score: number,
  locked: boolean,
  archived: boolean,
  saved: boolean,
  permalink: string,
}