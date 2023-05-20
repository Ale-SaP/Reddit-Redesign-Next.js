import axios from 'axios';
import { useQuery, useQueryClient, QueryClientProvider } from 'react-query'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

//Components
import NavBar from '../../components/NavBar';
import Post from '../../components/posts/post';
import PostInterface from '../../components/posts/postInterface';
import SelectorSquare from '../../components/SelectorSquare';
import useSubreddit from '../../hooks/useSelector';

export default function Frontpage() {
  const {isLoading, data} = useSubreddit()

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

const fetchFrontPage = async (selector: string, timeFilter: string): Promise<PostInterface[]> => {
  const instance = axios.create({});
  const data = await instance.post(`/api/get-frontpage`, { "selector": selector, "timeFilter": timeFilter });
  return data.data.posts
}