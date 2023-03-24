import axios from 'axios';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'

// Create a client
const queryClient = new QueryClient()


const fetchTodoList = async () => {
  const instance = axios.create({});    
  return await instance.get(`/api/cors`);
}

function Todos() {
  // Access the client
  const queryClient = useQueryClient()

  // Queries
  const {data, isLoading} = useQuery<any>('todos', fetchTodoList)


  if (isLoading){
    return null
  }
  console.log(data)

  return (
    <div>
      <ul>
        {data.data.posts.map(posts => (
          <li key={posts.id}>{posts.title}</li>
        ))}
      </ul>
    </div>
  )
}


export default function Index() {

  // also status === 'success', but "else" logic works, too
  return (
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  )
}
