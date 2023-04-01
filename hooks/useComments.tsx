import { useQuery } from "react-query";
import axios from "axios";

const fetchComment = async (postId: string) => {
  const instance = axios.create({});
  return await instance.post(`/api/get-comments`, { "postId": postId });
};

export default function useComments(id: string) {
  const { data, isLoading } = useQuery<any>(['comments', id], () => fetchComment(id));

  if (data != undefined) {
    return data;
  }
}
