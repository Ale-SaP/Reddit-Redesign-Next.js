import Selector from "./posts/selector";
import {useRouter} from "next/router";

export default function NavBar() {
    const router = useRouter()
    
    const onHome = () => {
        router.push("/frontpage/")
    }

    return (
        <div className="navbar bg-base-100 fixed top-0 w-full z-50">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl" onClick={onHome}>Re-Reddit</a>
            </div>
            <div className="flex-1">
                <Selector />
            </div>
            <div className="flex-none">
                <button className="btn btn-square btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                </button>
            </div>
        </div>
    )
}