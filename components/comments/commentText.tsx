import { useState } from 'react';

const CommentText = (props: { comment: string }) => {
  const [shortComment, setComment] = useState(() => {
    if (props.comment.length > 200) {
      return props.comment.slice(0, 200) + "...";
    } else {
      return props.comment;
    }
  });

  const [buttonText, setBT] = useState("Show More");

  const onClick = () => {
    if (shortComment.length < props.comment.length) {
      setComment(props.comment);
      setBT("Show Less");
    } else {
      setComment(props.comment.slice(0, 200) + "...");
      setBT("Show More");
    }
  };

  return (
    <>
      {props.comment.length > 0 &&
        <div>
          <h1>{shortComment}
            {props.comment.length > 200 &&
              <button onClick={onClick} className="px-2 text-slate-200 ">{buttonText}</button>}
          </h1>
        </div>
      }
    </>
  );
};

export default CommentText;