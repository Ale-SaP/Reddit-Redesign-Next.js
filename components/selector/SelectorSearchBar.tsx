import { useState } from 'react';
import { useRouter } from 'next/router';

const returnFirstElement = (element: string | string[]) => {
  const subParam = Array.isArray(element) ? element[0] : element;
  return subParam
}

const SelectorSearchBar = () => {
  const router = useRouter();
  const { subreddit, s, t } = router.query;

  const [searchQuery, setSearchQuery] = useState('' || returnFirstElement(subreddit));

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update the router query with the search query
    const sel = returnFirstElement(s) || "Hot";
    const time = returnFirstElement(t) || "day";
    router.push(`/r/${searchQuery}?s=${sel}&t=${time}`)
  };

  return (
    <div className="form-control pb-4">
      <form onSubmit={handleSubmit}>
        <label className="input-group">
          <span>r/</span>
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="All"
            className="input input-bordered select-primary"
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </label>
      </form>
    </div>
  );
};

export default SelectorSearchBar;
