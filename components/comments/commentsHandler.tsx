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
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: Unable to load comments</div>;
  }

  if (data) {
    return (
    <CommentsDisplay comments={data["comments"]} />
  ); }
}
