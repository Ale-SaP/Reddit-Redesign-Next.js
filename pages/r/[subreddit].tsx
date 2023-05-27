import { useQuery, useQueryClient, QueryClientProvider } from 'react-query'

//Components
import Post from "../../components/posts/post";
import NavBar from "../../components/NavBar";
import SelectorSquare from "../../components/SelectorSquare";

//Utils
import PostInterface from '../../components/posts/postInterface';
import useSelector from "../../hooks/useSelector";
import { fetchSubreddit } from "../../hooks/fetchFunctions";
import ErrorMessage from '../../components/ErrorPage';

export default function Subreddit() {
  const { selector, timeframe, subreddit } = useSelector()
  const { data, isError, isLoading } = useQuery<PostInterface[]>([selector, timeframe], () => {
    //If the subreddit is set, fetch the subreddit, else fetch the frontpage
    return fetchSubreddit(subreddit, selector, timeframe);
  });

  if (isLoading) {
    return (
      <div>
        <NavBar />
        <div className="py-20 bg-gray-900 flex flex-col items-center justify-top h-screen w-screen">
          <div className='max-w-screen-md bg-slate-900'>
            <SelectorSquare />
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

  if (data[0]) {
    return (
      <div className=''>
        <NavBar />
        <div className="py-20 bg-gray-900 flex flex-col items-center justify-center">
          <div className='max-w-screen-md bg-slate-900'>
            <SelectorSquare />
            {data.map((post) => (
              <Post post={post} key={post.id} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}