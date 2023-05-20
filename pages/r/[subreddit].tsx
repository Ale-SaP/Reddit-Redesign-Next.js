//Components
import Post from "../../components/posts/post";
import NavBar from "../../components/NavBar";
import SelectorSquare from "../../components/SelectorSquare";
import useSubreddit from "../../hooks/useSelector";

export default function Subreddit() {
  const { data, isError, isLoading } = useSubreddit()

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: could not load subreddit</div>;
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