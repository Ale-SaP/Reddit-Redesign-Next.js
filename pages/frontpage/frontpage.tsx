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
    return <h1>Loading!</h1>
  }

  if (data) {
    return (
      <>
        <NavBar />
        <div className="flex flex-col items-center justify-center">
          <Selector />
          {data.data.posts.map((post) => (
            <Post id={post.id} author={post.author} subreddit={post.subreddit_name_prefixed} title={post.title} body={post.selftext} 
            thumbnail={post.thumbnail} image={post.url} score={post.score} key={post.id}/>
          ))}
        </div>
      </>
    );

  }
}

const fetchFrontPage = async (selector: string) => {
  const instance = axios.create({});
  return await instance.post(`/api/get-frontpage`, { "selector": selector });
}