import { useEffect, useState } from "react";
import "./navbar.css";
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
  const [countryCode, setCountryCode] = useState("");

  useEffect(() => {
    const fetchCountry = async () => {
      const country = await getUserCountry();
      setCountryCode(country);
    };

    fetchCountry();
  }, []);
  return (
    <div className="flex justify-between items-center bg-[#212121] opacity-95 sticky px-14 h-14">
      <div className="flex gap-8 items-center text-2xl text-white">
        <div>
          <RxHamburgerMenu />
        </div>
        <div className="flex gap-2 items-center justify-center">
          <img className="w-24 h-24" src="/Youtube.svg" alt="YT" />
          <sup className="text-xs">{countryCode}</sup>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

async function getUserCountry() {
    try {
      const response = await fetch('https://ipapi.co/json/');
      if (!response.ok) {
        throw new Error('Failed to fetch country information');
      }
      const data = await response.json();
      return data.country_code;
    } catch (error) {
      console.error('Error fetching country information:', error);
      return 'Unknown';
    }
  }
