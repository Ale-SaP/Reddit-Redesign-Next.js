import { useState, useEffect } from "react";
import { useQuery, useQueryClient} from "react-query";
import { useRouter } from "next/router";
import axios from "axios";

// Define the interface for a Post
import PostInterface from "../components/posts/postInterface";

// Define the function to fetch data for a subreddit
const fetchSubreddit = async (subreddit: string, selector: string, timeframe: string): Promise<PostInterface[]> => {
  const instance = axios.create({});
  const data = await instance.post(`/api/get-subreddit`, { subreddit, "selector": selector, "timeFilter": timeframe });
  return data.data.posts
}

// Define the function to fetch data for the front page
const fetchFrontPage = async (selector: string, timeFilter: string): Promise<PostInterface[]> => {
    const instance = axios.create({});
    const data = await instance.post(`/api/get-frontpage`, { "selector": selector, "timeFilter": timeFilter });
    return data.data.posts
}

const useSubreddit = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const {subreddit, s, t } = router.query;

  //Storing the subreddit
  const [selSubreddit, setSubreddit] = useState(() => {
    const subParam = Array.isArray(subreddit) ? subreddit[0] : subreddit;
    return subParam || 'All'
  });

  //Storing the category
  const [selCategory, setCategory] = useState(() => {
    const selectorParam = Array.isArray(s) ? s[0] : s;
    return selectorParam || "Hot";
  });

  //Storing the time filter
  const [timeFilter, setTime] = useState(() => {
    const timeParam = Array.isArray(t) ? t[0] : t;
    if (selCategory === "New") { return "day" }
    return timeParam || "week";
  });

  //Reload the query when the router changes
  useEffect(() => {
    queryClient.refetchQueries();
    setCategory(() => {
      const selectorParam = Array.isArray(s) ? s[0] : s;
      return selectorParam || "Hot";
    })
    setTime(() => {
      const timeParam = Array.isArray(t) ? t[0] : t;
      if (selCategory === "New") { return "day" }
      return timeParam || "week";
    });
    setSubreddit(() => {
      const subParam = Array.isArray(subreddit) ? subreddit[0] : subreddit;
      return subParam
    })
    
  }, [router.asPath]);

  //Fetch the data
  const { data, isError, isLoading } = useQuery<PostInterface[]>([selSubreddit, selCategory, timeFilter], () => {
    //If the subreddit is set, fetch the subreddit, else fetch the frontpage
    if (selSubreddit) {
      return fetchSubreddit(selSubreddit, selCategory, timeFilter);
    } else {
      return fetchFrontPage(selCategory, timeFilter);
    }
  });

  return { data, isError, isLoading };
}

export default useSubreddit;
