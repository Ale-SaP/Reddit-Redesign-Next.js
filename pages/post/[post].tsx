import { useQuery } from "react-query";
import { useRouter } from "next/router";

//Components

import NavBar from "../../components/NavBar";
import Post from "../../components/posts/post";
import { fetchSinglePost } from "../../hooks/fetchFunctions";
import PostInterface from "../../components/posts/postInterface";
import SelectorSquare from "../../components/selector/SelectorSquare";
import ErrorMessage from "../../components/ErrorPage";

const PostDisplay = () => {
    const router = useRouter();
    const { post } = router.query;
    const { data, isError, isLoading } = useQuery<PostInterface>([post], () => {
        //If the subreddit is set, fetch the subreddit, else fetch the frontpage
        return fetchSinglePost(Array.isArray(post) ? post[0] : post);
    });

    if (isLoading) {
        return (
            <div>
                <NavBar />
                <div className="py-20 bg-gray-900 flex flex-col items-center justify-top h-screen w-screen">
                    <div className='max-w-screen-md bg-slate-900'>
                        <div>
                            <div className="p-8 bg-black rounded-md shadow-lg">
                                <progress className="progress progress-primary" value="100" max="100"></progress>
                                <h1 className='font-bold text-xl text-center'>Loading!</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <>
                <ErrorMessage errorMessage="Whoops! Something went wrong with the request or reddit. Try again later!" />
            </>
        )
    }

    if (data) {
        console.log(data)
        return (
            <div className=''>
                <NavBar />
                <div className="py-20 bg-gray-900 flex flex-col items-center justify-center h-max-screen w-screen">
                    <div className='max-w-screen-md bg-slate-900'>
                        <Post post={data} loadComments={true}/>
                    </div>
                </div>
            </div>
        );
    }
}
export default PostDisplay;