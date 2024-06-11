import { AiOutlineLike } from "react-icons/ai";
import {
  MdHomeFilled,
  MdOutlineSubscriptions,
  MdOutlineVideoLibrary,
  MdOutlineWatchLater,
} from "react-icons/md";
import { RiHistoryLine } from "react-icons/ri";
import { SiYoutubeshorts } from "react-icons/si";

const Sidebar = () => {
  const menuItems = [
    { icon: <MdHomeFilled />, label: "Home" },
    { icon: <SiYoutubeshorts />, label: "Shorts" },
    { icon: <MdOutlineSubscriptions />, label: "Subscription" },
    { icon: <MdOutlineVideoLibrary />, label: "You" },
  ];

  const otherMenuItems = [
    { icon: <RiHistoryLine />, label: "History" },
    { icon: <MdOutlineWatchLater />, label: "Watch Later" },
    { icon: <AiOutlineLike />, label: "Like" },
  ];

  return (
    <div className="w-[10%] p-2 pr-5 overflow-auto pb-8 h-screen items-center">
      <ul className="flex flex-col border-b border-gray-700 ">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`pl-2 py-3 hover:bg-zinc-600 rounded-xl ${
              item.label === "Home" ? "bg-transparent" : " "
            }`}
          >
            <a href="" className="flex flex-col gap-1 items-center text-xl">
              {item.icon}
              <span className="text-[10px] overflow-clip">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
      <ul className="flex flex-col border-b-1 border-gray-800 ">
        {otherMenuItems.map((item, index) => (
          <li
            key={index}
            className={`pl-2 py-3 hover:bg-zinc-600 rounded-2xl ${
              item.label === "Home" ? "bg-transparent" : " "
            }`}
          >
            <a href="" className="flex flex-col gap-1 items-center text-xl">
              {item.icon}
              <span className="text-[10px] overflow-clip">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
