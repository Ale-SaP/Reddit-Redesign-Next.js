import React, { useState } from 'react';
import axios from 'axios';

interface ExtraActionsProps {
    link: string;
    isSaved: boolean;
    id: string;
  }  

async function postActions(action, id) {
  const instance = axios.create();
  return await instance.post("api/post-actions", {"action": action, "postId": id});
}

export default function ExtraActions(props: ExtraActionsProps) {
  const [saved, setSaved] = useState(props.isSaved);

  async function handleSave() {
    if (saved) {
      await postActions("unsave", props.id);
      setSaved(false);
    } else {
      await postActions("save", props.id);
      setSaved(true);
    }
  }

        //open props.link on other tab when clicked
  
  return (
    <>
        <button onClick={handleSave} className='btn btn-sm btn-outline btn-secondary p-2 m-1'>{saved ? '🚫💾' : '💾'}</button>
        <a href={props.link} target="_blank" rel="noreferrer"><button className='btn btn-sm btn-outline btn-secondary p-2 m-1'>Open</button></a>
        <button onClick={() => navigator.clipboard.writeText(props.link)} className='btn btn-sm btn-outline btn-secondary p-2 m-1'>📋</button>
    </>
  );
}
