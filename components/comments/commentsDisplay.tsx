import { useState } from 'react';
import CommentText from './commentText';
import CommentsSideButtons from './commentsSideButtons';

interface Comment {
  id: string;
  author: string;
  body: string;
  score: number;
  date: number;
  archived: boolean;
  saved: boolean;
  depth: number;
  replies: Comment[];
}

interface Props {
  comments: Comment[];
}

function CommentsDisplay(props: Props) {
  return (
    <div>
      {props.comments.map((comment) => {
        return <CommentDisplay key={comment.id} comment={comment} /> }
      )}
    </div>
  );
}

function CommentDisplay({ comment }: { comment: Comment }) {
  const [subCommentsLoaded, setSubCommentsLoaded] = useState(false);

  const handleClick = () => {
    setSubCommentsLoaded(!subCommentsLoaded);
  };

  const date = new Date(comment.date * 1000);

  return (
    <div className="flex">
      <CommentsSideButtons id={comment.id} score={comment.score} />
      <p className="text-gray-500 text-sm">
        u/{comment.author} at {new Date(comment.date).toDateString()},{' '}
        {new Date(comment.date).getHours()}:{new Date(comment.date).getMinutes()}
      </p>
      <CommentText comment={comment.body} />
      {comment.replies.length > 0 && (
        <button onClick={handleClick}>
          {subCommentsLoaded ? 'Hide Comments' : 'Show Comments'}
        </button>
      )}
      {subCommentsLoaded && <CommentsDisplay comments={comment.replies} />}
    </div>
  );
}
