import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function useStoreParams() {
  const router = useRouter();

  const [subreddit, setSubreddit] = useState(() => {
    const subParam = router.query.subreddit;
    if (Array.isArray(subParam)) {
      return subParam[0];
    }
    return subParam || null;
  });

  const [selector, setSelector] = useState(() => {
    const selectorParam = router.query.s;
    if (Array.isArray(selectorParam)) {
      return selectorParam[0];
    }
    return selectorParam || null;
  });

  const [timeframe, setTimeframe] = useState(() => {
    const timeParam = router.query.t;
    if (Array.isArray(timeParam)) {
      return timeParam[0];
    }
    return timeParam || null;
  });

  useEffect(() => {
    setSubreddit(() => {
      const subParam = router.query.subreddit;
      if (Array.isArray(subParam)) {
        return subParam[0];
      }
      return subParam || null;
    });
  }, [router.query.subreddit]);

  useEffect(() => {
    setSelector(() => {
      const selectorParam = router.query.s;
      if (Array.isArray(selectorParam)) {
        return selectorParam[0];
      }
      return selectorParam || null;
    });
  }, [router.query.s]);

  useEffect(() => {
    setTimeframe(() => {
      const timeParam = router.query.t;
      if (Array.isArray(timeParam)) {
        return timeParam[0];
      }
      return timeParam || null;
    });
  }, [router.query.t]);

  return { subreddit, selector, timeframe };
}
