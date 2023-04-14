// CommentsDisplay.tsx
import { useState } from 'react';
import CommentText from './commentText';
import CommentsSideButtons from './commentsSideButtons';
import Comment from './commentInterface';

interface Props {
  comments: Comment[];
}

export default function CommentsDisplay({ comments }: Props) {
  return (
    <div>
      {comments.map((comment) => (
        <CommentDisplay key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

interface CommentDisplayProps {
  comment: Comment;
}

function CommentDisplay({ comment }: CommentDisplayProps) {
  const [subCommentsLoaded, setSubCommentsLoaded] = useState(false);

  const handleClick = () => {
    setSubCommentsLoaded(!subCommentsLoaded);
  };

  return (
    <>
      <div key={comment.id} className="my-2 shadow-md flex bd-solid">
        <CommentsSideButtons id={comment.id} score={comment.score} />
        <div className="p-4" key={comment.id}>
          <p className="text-xs">
            u/{comment.author} at {comment.created.toString()}
          </p>
          <CommentText comment={comment.body} />
          <div className='py-4'>
            {comment.replies.length > 0 && (
              <button onClick={handleClick} className='btn btn-s'>
                {subCommentsLoaded ? 'Hide Replies' : 'Show Replies'}
              </button>
            )}
            {subCommentsLoaded && <CommentsDisplay comments={comment.replies} />}
          </div>
        </div>
      </div>
    </>
  );
}
