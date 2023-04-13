import { useQuery } from "react-query";
import axios from "axios";
import CommentText from "./commentText";
import CommentsSideButtons from "./commentsSideButtons";
import CommentReplies from "./commentReplies";

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
                        console.log(comment)
                        return (
                            <div key={comment.id} className="p-2 my-2 shadow-md flex">
                                <CommentsSideButtons id={comment.id} score={comment.score}/>
                                <div className="p-4" key={comment.id}>
                                    <p className="text-xs">
                                        u/{comment.author} at {date.toDateString()}, {date.getHours()}:{date.getMinutes()}
                                    </p>
                                    <CommentText comment={comment.body} />
                                </div>
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