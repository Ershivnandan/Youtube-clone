import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getSearchPageVideos } from "../../Store/Reducers/getSearchPageVideos";
import { changeSearchTerm } from "../../features/youtube/youtubeSlice";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { FaMicrophone } from "react-icons/fa";
import { RiVideoAddLine } from "react-icons/ri";
import { BsBell } from "react-icons/bs";

const Navbar = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(changeSearchTerm(searchQuery));
    dispatch(getSearchPageVideos(false));
  };

  const [countryCode, setCountryCode] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      const country = await getUserCountry();
      setCountryCode(country);
    };

    fetchCountry();
  }, []);

  return (
    <div className="flex justify-between items-center opacity-95 sticky px-10 h-14 z-10">
      {/* 1st div */}
      <div className="flex gap-8 items-center text-2xl">
        <div>
          <RxHamburgerMenu />
        </div>
        <div className="flex gap-2 items-center justify-center">
          <img className="w-24 h-24" src="/Youtube.svg" alt="YT" />
          <sup className="text-xs">{countryCode}</sup>
        </div>
      </div>
      {/* 2nd div */}
      <div className="flex items-center justify-center gap-5 py-2">
        <form onSubmit={handleSearch}>
          <div className="flex items-center px-4 pr-0 border border-zinc-500 border-solid rounded-full">
            <div className="flex gap-2 items-center pr-5 rounded-full">
              <input
                type="text"
                placeholder="Search"
                className="w-96 bg-transparent focus:outline-none border-none text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="px-4 h-10 w-16 flex items-center bg-zinc-800 rounded-r-full border-l-white border-solid border-l"
            >
              <CiSearch className="flex items-center text-2xl" />
            </button>
          </div>
        </form>
        <div className="text-xl p-3 bg-zinc-800 rounded-full">
          <FaMicrophone />
        </div>
      </div>
      {/* 3rd div */}
      <div className="flex items-center text-xl gap-10">
        <RiVideoAddLine />
        <div className="relative">
          <BsBell />
          <sup className="absolute bottom-2 left-[0.7rem] text-xs bg-red-600 rounded-full px-[0.2rem]">
            10
          </sup>
        </div>
        <img
          src="https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
          alt="profile"
          className="rounded-full w-7 h-7"
        />
      </div>
    </div>
  );
};

export default Navbar;

async function getUserCountry() {
  try {
    const response = await fetch("https://ipapi.co/json/");
    if (!response.ok) {
      throw new Error("Failed to fetch country information");
    }
    const data = await response.json();
    return data.country_code;
  } catch (error) {
    console.error("Error fetching country information:", error);
    return "Unknown";
  }
}
