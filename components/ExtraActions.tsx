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

  return (
    <>
        <li><a onClick={handleSave}>{saved ? 'Unsave 🚫💾' : 'Save 💾'}</a></li>
        <li><a href={props.link} target="_blank" rel="noopener noreferrer">Open original ➡️</a></li>
        <li><a onClick={() => navigator.clipboard.writeText(props.link)}>Copy link 📋</a></li>
    </>
  );
}
