import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useRouter } from "next/router";

//Main imports
import isValidCombination from "./useSelectorLogic";

const returnFirstElement = (element: string | string[]) => {
  const subParam = Array.isArray(element) ? element[0] : element;
  return subParam
}

const useSelector = () => {
  const router = useRouter();
  const { subreddit, s, t } = router.query;

  //Storing the subreddit
  const [selSubreddit, setSubreddit] = useState(returnFirstElement(subreddit));

  const selectorParam = returnFirstElement(s);
  const timeParam = returnFirstElement(t);
  //UseSelectorLogic takes care of checking if the combination is valid
  const [combination, setCombination] = useState(isValidCombination(selectorParam, timeParam));

  useEffect( () => {
    setSubreddit(returnFirstElement(subreddit));

    const selectorParam = returnFirstElement(s);
    const timeParam = returnFirstElement(t);
    setCombination(isValidCombination(selectorParam, timeParam));

  }, [router.query])

  if (selSubreddit) { return {"subreddit": selSubreddit, "selector": combination[0], "timeframe": combination[1]} }
  else {return {"selector": combination[0], "timeframe": combination[1]}}
}

export default useSelector;