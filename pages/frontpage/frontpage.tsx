import axios from 'axios';
import { useQuery, useQueryClient, QueryClientProvider } from 'react-query'
import { useRouter } from 'next/router';

//Components
import NavBar from '../../components/NavBar';
import Selector from '../../components/posts/selector';
import Post from '../../components/posts/post';


export default function Frontpage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const selector = (router.asPath).split("=")[1];
  const { data, isLoading } = useQuery<any>(['todos', selector], () => fetchFrontPage(selector));

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50">
        <div className="w-full max-w-md p-8 bg-black rounded-md shadow-lg">
            <progress className="progress progress-primary" value="100" max="100"></progress>
          <h1 className='font-bold text-xl text-center'>Loading!</h1>
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
            {data.data.posts.map((post) => (
              <Post id={post.id} author={post.author} subreddit={post.subreddit_name_prefixed} title={post.title} body={post.selftext}
                thumbnail={post.thumbnail} image={post.url} score={post.score} key={post.id} created={post.created} archived={post.archived} locked={post.locked}/>
            ))}
          </div>
        </div>
      </div>
    );

  }
}

const fetchFrontPage = async (selector: string) => {
  const instance = axios.create({});
  return await instance.post(`/api/get-frontpage`, { "selector": selector });
}