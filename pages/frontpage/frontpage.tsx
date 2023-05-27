import { useQuery, useQueryClient, QueryClientProvider } from 'react-query'

//Components
import NavBar from '../../components/NavBar';
import Post from '../../components/posts/post';
import PostInterface from '../../components/posts/postInterface';
import SelectorSquare from '../../components/selector/SelectorSquare';
import useSelector from '../../hooks/useSelector';
import { fetchFrontPage } from '../../hooks/fetchFunctions';

export default function Frontpage() {
  const { selector, timeframe } = useSelector()
  const { data, isError, isLoading } = useQuery<PostInterface[]>([selector, timeframe], () => {
    //If the subreddit is set, fetch the subreddit, else fetch the frontpage
    return fetchFrontPage(selector, timeframe);
  });

  if (isLoading) {
    return (
      <div>
        <NavBar />
        <div className="py-20 bg-gray-900 flex flex-col items-center justify-top h-screen">
          <div className='max-w-screen-md bg-slate-900'>
            <SelectorSquare />
            <div>
              <div className="w-full max-w-md p-8 bg-black rounded-md shadow-lg">
                <progress className="progress progress-primary" value="100" max="100"></progress>
                <h1 className='font-bold text-xl text-center'>Loading!</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }

  if (data) {
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