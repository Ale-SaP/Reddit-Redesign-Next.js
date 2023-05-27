import Selector from "./Selector";
import SelectorSearchBar from "./SelectorSearchBar";

const SelectorSquare = () => {
  return (
    <div className="rounded overflow-hidden shadow-xl my-2 border-solid border border-slate-700">
      <div className="py-4 flex justify-center">
        <div className="px-2">
          <SelectorSearchBar /> 
          <Selector />

        </div>
      </div>
    </div>
  );
};

export default SelectorSquare;
