import { useQuery } from "react-query";
import axios from "axios";

const fetchComment = async (postId: string) => {
    const instance = axios.create({});
    return await instance.post(`/api/get-comments`, { "postId": postId });
};

export default function Comments(props: Parameters) {
    const { data, isLoading } = useQuery<any>(['comments', props.id], () => fetchComment(props.id));

    if (isLoading) {
        return (
            <h1>Loading!</h1>
        )
    }

    if (data) {
        return (
            <div>
                {data.data.comments.comments.length > 0 ? (
                    data.data.comments.comments.map((comment) => {
                        const date = new Date(comment.created * 1000);
                        return (
                            <div className="p-4">
                                <p className="text-xs">
                                    u/{comment.author} at {date.toDateString()}
                                </p>
                                <h1 className="text-s">{comment.body}</h1>
                            </div>
                        );
                    })
                ) : (
                    <div className="p-4">
                    <p className="text-s">No comments yet!</p>
                    </ div>
                )}
            </div>
        );
    }
}

interface Parameters {
    id: string,
}