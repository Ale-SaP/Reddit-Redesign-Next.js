import { useState } from 'react';
import axios from 'axios';
import ExtraActions from '../ExtraActions';

async function postActions(action: string, id: string) {
  const instance = axios.create();
  const response = await instance.post("api/posts-actions", { "action": action, "postId": id });
  return response;
}

export default function SideButtons(props: { post: Props }) {
  const activeUpvoated = 'btn btn-md bg-green-500 hover:bg-green-700 text-white font-bold rounded focus:outline-none focus:shadow-outline p-2 m-1'
  const inactiveUpvoated = 'btn btn-md btn-outline btn-success text-white font-bold rounded focus:outline-none focus:shadow-outline p-2 m-1'
  const activeDownvoated = 'btn btn-md bg-red-500 hover:bg-red-700 text-white font-bold rounded focus:outline-none focus:shadow-outline p-2 m-1'
  const inactiveDownvoated = 'btn btn-md btn-outline btn-error text-white font-bold rounded focus:outline-none focus:shadow-outline p-2 m-1'

  const [upvoated, setUpvoated] = useState(false);
  const [downvoated, setDownvoated] = useState(false);
  const [activeButtons, setActiveButtons] = useState([inactiveUpvoated, inactiveDownvoated]);
  const [extraActions, setExtraActions] = useState(false);

  async function handleUpvote() {
    if (upvoated) {
      setUpvoated(false);
      setActiveButtons([inactiveUpvoated, inactiveDownvoated]);
      await postActions("none", props.post.id);
    } else {
      setUpvoated(true);
      setDownvoated(false);
      setActiveButtons([activeUpvoated, inactiveDownvoated]);
      await postActions("upvote", props.post.id);
    }
  }

  async function handleDownvote() {
    if (downvoated) {
      setDownvoated(false);
      setActiveButtons([inactiveUpvoated, inactiveDownvoated]);
      await postActions("none", props.post.id);
    } else {
      setDownvoated(true);
      setUpvoated(false);
      setActiveButtons([inactiveUpvoated, activeDownvoated]);
      await postActions("downvote", props.post.id);
    }
  }

  const upvoteClass = `btn ${activeButtons[0]}`;
  const downvoteClass = `btn ${activeButtons[1]}`;

  return (
    <div className="flex flex-col p-1 max-w-xs">
      <h1 className="p-2 text-md text-white font-semibold justify-center">{props.post.score}</h1>
      {
        props.post.archived ?
          <>
            <button className="btn btn-outline btn-secondary p-2 m-1" >📁</button>
          </> :
          !props.post.locked ?
            <>
              <button className={upvoteClass} onClick={handleUpvote}>⬆️</button>
              <button className={downvoteClass} onClick={handleDownvote}>⬇️</button>
            </> :
            <>
              <button className="btn btn-outline btn-warning p-2 m-1" >🔒</button>
            </>
      }
      <button className="btn btn-outline btn-primary rounded focus:shadow-outline p-4 m-1" onClick={() => setExtraActions(!extraActions)}>{extraActions ? "⛔" : "⚙"}</button>
      {extraActions && <ExtraActions link={props.post.permalink} id={props.post.id} isSaved={props.post.saved} />}
    </div>)
}

interface Props {
  id: string,
  score: number,
  archived: boolean,
  locked: boolean,
  permalink: string,
  saved: boolean,
}
//type refers to if we are trying to interact with a post or with a comment or else.