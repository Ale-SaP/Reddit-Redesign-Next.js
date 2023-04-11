import { useState } from 'react';

const CommentText = (props: {comment: string}) => {
  const [shortComment, setComment] = useState(() => {
    if (props.comment.length > 100) {
      return props.comment.slice(0, 100);
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
      setComment(props.comment.slice(0, 100));
      setBT("Show More");
    }
  };

  return (
    <>
      {props.comment.length > 0 &&
        <div>
          <h1>{shortComment}</h1>
          {props.comment.length > 100 &&
            <button onClick={onClick} className="btn btn-xs">{buttonText}</button>
          }
        </div>
      }
    </>
  );
};

export default CommentText;