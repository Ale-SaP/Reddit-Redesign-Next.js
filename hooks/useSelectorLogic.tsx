import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Selector = "Hot" | "New" | "Top"
type Timeframe = "hour" | "day" | "week" | "month" | "year" | "all"

const defaultSelector = "Hot";
const defaultTimeframe = "day";

const isValidSelector = (selector: string): selector is Selector =>
  selector === "Hot" || selector === "New" || selector === "Top";

const isValidTimeframe = (timeframe: string): timeframe is Timeframe =>
  timeframe === "hour" ||
  timeframe === "day" ||
  timeframe === "week" ||
  timeframe === "month" ||
  timeframe === "year" ||
  timeframe === "all";

const useQueryParams = () => {
  const router = useRouter();
  const [selector, setSelector] = useState(defaultSelector);
  const [timeframe, setTimeframe] = useState(defaultTimeframe);

  useEffect(() => {
    const { s, t } = router.query;
    let newSelector: Selector = defaultSelector;
    let newTimeframe: Timeframe = defaultTimeframe;

    if (typeof s === "string" && isValidSelector(s)) {
      newSelector = s;
      if (s === "Hot" || s === "New") {
        newTimeframe = defaultTimeframe;
      }
    }

    if (typeof t === "string" && isValidTimeframe(t)) {
      newTimeframe = t;
      if (newSelector === "Hot" && t === "all") {
        newTimeframe = defaultTimeframe;
      }
    }

    // If the query params are not valid, redirect to default values
    if (!isValidSelector(newSelector) || !isValidTimeframe(newTimeframe)) {
      router.push(`/?s=${defaultSelector}&t=${defaultTimeframe}`);
      newSelector = defaultSelector;
      newTimeframe = defaultTimeframe;
    }

    // Silently correct any incorrect query params
    if (router.query.s !== newSelector || router.query.t !== newTimeframe) {
      router.replace(`/?s=${newSelector}&t=${newTimeframe}`, undefined, {
        shallow: true,
      });
    }

    setSelector(newSelector);
    setTimeframe(newTimeframe);
  }, [router.query]);

  return { selector, timeframe };
};
