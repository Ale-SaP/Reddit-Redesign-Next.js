// CommentsHandler.tsx
import { useQuery } from "react-query";
import axios from "axios";
import CommentsDisplay from "./commentsDisplay";
import CommentInterface from './commentInterface';

interface Props {
  id: string;
}

async function fetchComment(postId: string): Promise<CommentInterface[]> {
  const response = await axios.post(`/api/get-comments`, { postId });
  return response.data;
}

export default function CommentsHandler(props: Props) {
  const { data, isLoading, isError } = useQuery(['comments', props.id], () => fetchComment(props.id));

  if (isLoading) {
    return (
      <div className="inset-0 flex justify-center items-center">
        <div className="w-full max-w-md p-8 rounded-md shadow-lg">
          <progress className="progress progress-primary" value="50" max="100"></progress>
          <h1 className='font-bold text-xl text-center'>Loading!</h1>
        </div>
      </div>)
  }

  if (isError) {
    return <div>Error: Unable to load comments</div>;
  }

  if (data["comments"].length) {
    console.log(data)
    return <CommentsDisplay comments={data["comments"]} />
  }
  else {
    return <h1 className="text-slate-200 p-2 m-1">No comments made yet!</h1>
  }
}
