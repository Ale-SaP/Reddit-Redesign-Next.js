import { useState } from "react";

const CommentReplies = (Comments: <any>) => {
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [commentsButton, setCommentsButton] = useState("Show Comments");

  const handleClick = () => {
    setCommentsLoaded(!commentsLoaded);
    setCommentsButton(commentsLoaded ? "Show Comments" : "Hide Comments");
  };

  return (
    <>
    <button onClick={handleClick}>{commentsButton}</button>
      {commentsLoaded && (
        <div>
          {Comments.map((comment) => (
            <div key={comment.id}>
              {/* Display comment information */}
              <h3>{comment.author}</h3>
              <p>{comment.date.toString()}</p>
              <p>{comment.body}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
 export default CommentReplies