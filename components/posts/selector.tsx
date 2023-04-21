import { useState } from "react"
import { useRouter } from 'next/router'

export default function Selector() {
  const router = useRouter()
  const [selCategory, setCategory] = useState(() => {
    const { s } = router.query;
    const selectorParam = Array.isArray(s) ? s[0] : s;
    return selectorParam;
  });
  

  const onChange = (e) => {
    e.preventDefault()
    router.push("?s=" + e.target.value)
    setCategory(e.target.value)
  }

  return (
    <>
      <div className="">
        <select className="select select-primary w-full max-w-xs" defaultValue={selCategory} onChange={onChange}>
          <option disabled value={selCategory}>
            {selCategory}
          </option>
          <option value="Hot">Hot</option>
          <option value="New">New</option>
          <option value="Top">Top</option>
        </select>
      </div>
    </>
  );
}