import PostInterface from "../components/posts/postInterface";
import axios from "axios";

// Define the function to fetch data for a subreddit
export const fetchSubreddit = async (subreddit: string, selector: string, timeframe: string): Promise<PostInterface[]> => {
    const instance = axios.create({});
    const data = await instance.post(`/api/get-subreddit`, { subreddit, "selector": selector, "timeFilter": timeframe });
    return data.data.posts
}

// Define the function to fetch data for the front page
export const fetchFrontPage = async (selector: string, timeFilter: string): Promise<PostInterface[]> => {
    const instance = axios.create({});
    const data = await instance.post(`/api/get-frontpage`, { "selector": selector, "timeFilter": timeFilter });
    return data.data.posts
}