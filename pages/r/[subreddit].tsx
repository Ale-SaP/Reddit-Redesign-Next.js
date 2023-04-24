import { useRouter } from "next/router";
import axios from "axios";
import { useQuery } from "react-query";

//Components
import PostInterface from "../../components/posts/postInterface";
import Post from "../../components/posts/post";
import NavBar from "../../components/NavBar";
import SelectorSquare from "../../components/SelectorSquare";

const fetchSubreddit = async (subreddit: string, selector: string, timeframe: string): Promise<PostInterface[]> => {
  const instance = axios.create({});
  const data = await instance.post(`/api/get-subreddit`, { subreddit, "selector": selector, "timeFilter": timeframe });
  return data.data.posts
}

export default function Subreddit() {
  const router = useRouter();
  const { subreddit } = router.query;
  const { s, t } = router.query;
  const subredditParam = Array.isArray(subreddit) ? subreddit[0] : subreddit;
  const selectorParam = Array.isArray(s) ? s[0] : s;
  const timeframeParam = Array.isArray(t) ? t[0] : t;

  if (!subredditParam) {
    return (
      <>
        <h1>No subreddit specified</h1>
      </>
    )
  }

  const { data, isLoading, isError } = useQuery<PostInterface[]>(['todos', subredditParam, s, t], () => fetchSubreddit(subredditParam, selectorParam, timeframeParam));

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: could not load subreddit</div>
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
