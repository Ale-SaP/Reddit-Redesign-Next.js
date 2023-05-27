import { useState } from "react";
import { useRouter } from "next/router";

const returnFirstElement = (element: string | string[]) => {
  const subParam = Array.isArray(element) ? element[0] : element;
  return subParam
}

const Selector = () => {
  const router = useRouter();
  const { subreddit, s, t } = router.query;

  const [selCategory, setCategory] = useState(returnFirstElement(s) || "Hot");

  const [timeFilter, setTimeFilter] = useState(returnFirstElement(t) || (selCategory === "Hot" || selCategory === "New" ? "today" : "week"))

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);

    if (newCategory === "Hot" || newCategory === "New") {
      setTimeFilter("today");
    }

    const queryParams = { s: newCategory, t: timeFilter};

    if (subreddit !== undefined) {
      router.push({
        pathname: router.pathname,
        query: { subreddit, ...queryParams },
      });
      
    } else {
      router.push({
        pathname: router.pathname,
        query: queryParams,
      });
    }
  };

  const handleTimeFilterChange = (e) => {
    const newTimeFilter = e.target.value;
    setTimeFilter(newTimeFilter);

    const queryParams = { s: selCategory, t: newTimeFilter};

    if (subreddit !== undefined) {
      router.push({
        pathname: router.pathname,
        query: { subreddit, ...queryParams },
      });
    } else {
      router.push({
        pathname: "/frontpage/",
        query: queryParams,
      });
    }
  };

  return (
    <div className="flex space-x-4">
      <div>
        <label htmlFor="selector">Category:</label>
        <select id="selector" value={selCategory} onChange={handleCategoryChange}
          className="select select-primary w-full max-w-xs m-2">
          <option value="Hot">Hot</option>
          <option value="New">New</option>
          <option value="Top">Top</option>
        </select>
      </div>
      <div>
        <label htmlFor="timeFilter">Time:</label>
        <select id="timeFilter" value={timeFilter} onChange={handleTimeFilterChange}
          className="select select-primary w-full max-w-xs m-2">
          {selCategory === "Hot" || selCategory === "New" ? (
            <>
              <option value="hour">Past Hour</option>
              <option value="day">Past Day</option>
            </>
          ) : (
            <>
              <option value="hour">Past Hour</option>
              <option value="day">Past Day</option>
              <option value="week">Past Week</option>
              <option value="month">Past Month</option>
              <option value="year">Past Year</option>
              <option value="all">All Time</option>
            </>
          )}
        </select>
      </div>
    </div>
  );
};


export default Selector;
