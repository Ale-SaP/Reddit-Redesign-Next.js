import Selector from "./Selector";

const SelectorSquare = () => {
  return (
    <div className="rounded overflow-hidden shadow-xl my-2 border-solid border border-slate-700">
      <div className="py-4 flex">
        <div className="px-2">
          <Selector />
        </div>
      </div>
    </div>
  );
};

export default SelectorSquare;
