import React, { useState } from 'react';
import axios from 'axios';

interface ExtraActionsProps {
  link: string;
  isSaved: boolean;
  id: string;
  type: string,
}

async function postActions(action, id, type) {
  const instance = axios.create();
  if (type === "post")
    return await instance.post("/api/posts-actions", {"action": action, "postId": id });
  else if (type === "comment")
  return await instance.post("/api/comments-actions", {"action": action, "postId": id});
}

export default function ExtraActions(props: ExtraActionsProps) {
  const [saved, setSaved] = useState(props.isSaved);

  async function handleSave() {
    if (saved) {
      await postActions("unsave", props.id, props.type);
      setSaved(false);
    } else {
      await postActions("save", props.id, props.type);
      setSaved(true);
    }
  }

  //open props.link on other tab when clicked

  return (
    <>
      <button onClick={handleSave} className={saved ? 'btn btn-sm btn-secondary p-2 m-1' : 'btn btn-sm btn-outline btn-primary p-2 m-1'}>{saved ? 'Saved' : 'Save 💾'}</button>
      <button onClick={() => navigator.clipboard.writeText(props.link)} className='btn btn-sm btn-outline btn-secondary p-2 m-1'>📋</button>
    </>
  );
}
