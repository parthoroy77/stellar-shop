import { AiOutlineLoading } from "react-icons/ai";

const Loader = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-2 text-center text-gray-500">
      <AiOutlineLoading size={30} className="animate-spin" />
      <span>Hold you breath</span>
    </div>
  );
};

export default Loader;
