// CommentsDisplay.tsx
import { useState } from 'react';
import CommentText from './commentText';
import CommentsButtons from './commentsButtons';
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
  const [hideComment, setHide] = useState(false)
  const [dateString] = useState(() => {
    const dateObj = new Date(comment.created * 1000);
    return `${dateObj.getHours()}:${dateObj.getMinutes().toString().padStart(2, '0')} - 
    ${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`
  });

  const handleClick = () => {
    setSubCommentsLoaded(!subCommentsLoaded);
  };

  const handleHide = () => {
    setHide(!hideComment)
  }

  return (
    <>
      <div key={comment.id} className="mt-2 drop-shadow-sm shadow-sm border-solid border border-slate-700">
        <div className="pl-4 my-4" key={comment.id}>
          <div className='flex'>
            <p className="text-xs">
              u/{comment.author} at {dateString}
            </p>
          </div>
          {!hideComment && <CommentText comment={comment.body} />}
          <div className='btn-group p-2'>
            <CommentsButtons id={comment.id} score={comment.score} locked={comment.locked} />
            <button onClick={handleHide} className='btn btn-sm btn-outline btn btn-error text-white font-bold rounded focus:outline-none focus:shadow-outline p-2 m-1'>X</button>
            {comment.replies.length > 0 && (
              <button onClick={handleClick} className='text-slate-200 p-2 m-1 btn btn-sm btn-ghost hover:bg-violet-900 ml-2'>
                {subCommentsLoaded ? 'Hide Replies' : 'Show Replies'}
              </button>
            )}
          </div>
          <div className='items-center'>
            {subCommentsLoaded && <CommentsDisplay comments={comment.replies} />}
          </div>
        </div>
      </div>
    </>
  );
}
