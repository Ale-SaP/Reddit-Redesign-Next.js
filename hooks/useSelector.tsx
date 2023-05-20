import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useRouter } from "next/router";

//Main imports
import PostInterface from "../components/posts/postInterface";
import { fetchSubreddit, fetchFrontPage } from "./fetchFunctions";
import isValidCombination from "./useSelectorLogic";

const returnFirstElement = (element: string | string[]) => {
  const subParam = Array.isArray(element) ? element[0] : element;
  return subParam
}
const defaultSelector = "Hot";
const defaultTimeframe = "day";

const useSubreddit = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { subreddit, s, t } = router.query;

  //Storing the subreddit
  const [selSubreddit, setSubreddit] = useState(returnFirstElement(subreddit));

  const selectorParam = returnFirstElement(s);
  const timeParam = returnFirstElement(t);
  const [combination, setCombination] = useState(isValidCombination(selectorParam, timeParam));

  //Reload the query when the router changes
  useEffect(() => {
    console.log("reloading query")
    queryClient.refetchQueries();

    setSubreddit(returnFirstElement(subreddit))
    const selectorParam = returnFirstElement(s)
    const timeParam = returnFirstElement(t)
    setCombination(isValidCombination(selectorParam, timeParam))

    //All this logic only to redirect the user if the params are not valid
    if (selectorParam != combination[0] || timeParam != combination[1]) {
      let queryParams;
      if (selectorParam != combination[0]) { 
        queryParams = { s: defaultSelector, t: defaultTimeframe }; 
      }
      else {
        queryParams = { s: combination[0], t: defaultTimeframe };
      }

      if (selSubreddit !== undefined) {
        queryParams.subreddit = selSubreddit;
        router.replace(`/r/${selSubreddit}?s=${defaultSelector}&t=${defaultTimeframe}`);

      } else {
        router.push({
          pathname: router.pathname,
          query: queryParams,
        });
      }
    }
  }
    , [router.query]);

  //Fetch the data
  const { data, isError, isLoading } = useQuery<PostInterface[]>([selSubreddit, combination], () => {
    //If the subreddit is set, fetch the subreddit, else fetch the frontpage
    if (selSubreddit) {
      return fetchSubreddit(selSubreddit, combination[0], combination[1]);
    } else {
      return fetchFrontPage(combination[0], combination[1]);
    }
  });

  return { data, isError, isLoading };
}

export default useSubreddit;