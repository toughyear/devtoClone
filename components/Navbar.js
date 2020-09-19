import Link from "next/link";
import { BsChat, BsBell } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";

export default function Navbar() {
  return (
    <div className="flex justify-between text-xl py-4 px-48  sticky top-0 bg-white bg-opacity-75">
      <div className="flex w-1/2">
        <Link href="/">
          <button className="bg-black text-white text-xl font-bold px-4 py-2 rounded-md mr-6">
            DEV.Clone
          </button>
        </Link>
        <input
          type="text"
          name="search"
          className="p-2 placeholder-gray-800 bg-gray-100 border-gray-700 border-opacity-50 border rounded-md w-full max-w-md"
          placeholder="search..."
        />
      </div>
      <div className="flex items-end">
        <Link href="/">
          <button className="bg-indigo-700 text-white text-xl font-semibold px-4 py-2 rounded-md mr-6">
            Write a post
          </button>
        </Link>
        <BsChat className="text-3xl my-auto mr-5 cursor-pointer hover:text-indigo-700" />
        <BsBell className="text-3xl my-auto  mr-5  cursor-pointer hover:text-indigo-700" />
        <AiOutlineUser className="text-3xl my-auto  cursor-pointer hover:text-indigo-700" />
      </div>
    </div>
  );
}
