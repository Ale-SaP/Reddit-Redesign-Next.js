import axios from 'axios';
import {
  useQuery,
  useQueryClient,
  QueryClientProvider,
} from 'react-query'

  export default function Frontpage() {
  // Access the client
  const queryClient = useQueryClient()

  // Queries
  const { data, isLoading } = useQuery<any>('todos', fetchFrontPage)


  if (isLoading) {
    return null
  }
  
  return (
    <>
      {data.data.posts.map((post) => (
        <div className="flex flex-col items-center justify-center" key={post.id}>
          <div className="w-full max-w-xl rounded overflow-hidden shadow-lg">
            <div className="px-6 py-4">
              <div className="font-light italic text-xl mb-1 text-gray-500">{post.subreddit_name_prefixed} - u/{post.author}</div>
              <h1 className="font-bold text-xl mb-2">{post.title}</h1>
              <div className="flex flex-row space-x-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Up</button>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Down</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >...</button>
              </div>
              <p className="text-gray-300 text-base mb-3 flex-grow">{post.selftext}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
  
  }

const fetchFrontPage = async () => {
  const instance = axios.create({});
  return await instance.get(`/api/cors`);
}