import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SlMenu } from "react-icons/sl";
import { HiOutlineSearch } from "react-icons/hi";
import { VscChromeClose } from "react-icons/vsc";
import icon from "../assets/Tvpedia.svg";
import useFetch from "../Hooks/useFetch";



const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [Class, setClass] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearch, setshowSearch] = useState("");
  const [lastscrollY, setLastScrollY] = useState(0);
  const [query, setQuery] = useState("");
  const [num, setNum] = useState(0);
  const [clicks, setClicks] = useState(1);
  const inputRef = useRef(null);
  const openSearch = () => {
    // setshowSearch(true);
    setShowMobileMenu(false);
    setClicks(clicks + 1);
    setNum(1)
    setshowSearch(showSearch?false:true)
   
  };
  
  const openMenu = () => {
    setShowMobileMenu(true);
    setshowSearch(false);
  };
  const navigateTo = (type) => {
    
    navigate(`explore/${type}`);
    // setshowSearch(false);
    setShowMobileMenu(false);
  };
  const searchQueryHandler = (e) => {
    inputRef.current.focus();
    e.preventDefault();
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setshowSearch(false);
      }, 1000);
    }
  };
  let windowWidth;
  function handleScreenSizeChange() {
    windowWidth = window.innerWidth;
    if (windowWidth > 768) {
      setShowMobileMenu(false);
    } else {
      return;
    }
  }
  useEffect(() => {
    window.addEventListener("resize", handleScreenSizeChange);
    return () => {
      window.removeEventListener("resize", handleScreenSizeChange);
    };
  }, [windowWidth]);

  const top = ` backdrop-blur-[3.5px]  bg-[rgba(0,0,0,0.25)]`;
  const hide = "transform translate-y-[-60px]";
  const show = "bg-[rgb(10,10,14)]";

  const handleScroll = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastscrollY && !showMobileMenu) {
        setClass(hide);
      } else {
        setClass(show);
      }
    } else {
      setClass(top);
    }
    setLastScrollY(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastscrollY]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <header
      className={` w-full flex justify-between items-center h-[60px] px-[20px] fixed transform 
     translate-y-0 transition-all delay-[0.15s] ease-linear z-[2]    ${
        showMobileMenu ? " flex-col bg-[rgb(15,16,20)]" :  `${Class?`${Class}`:"backdrop-blur-[3.5px]  bg-[rgba(0,0,0,0.25)]"}`
      } `}
    >
      <div>
        <img
          onClick={() => {navigate("/")
          setShowMobileMenu(false)}}
          className={`w-[150px] cursor-pointer ${
            showMobileMenu ? "absolute top-[-45px] left-[20px]" : ""
          } `}
          src={icon}
        />
      </div>
      <ul
        id="drawer-top-example"
        className={`flex  items-center  text-[15px] min-[768px]:text-[18px] font-semibold text-white max-[768px]:hidden gap-[10px] min-[768px]:gap-[25px]  `}
      >
        <li className={`cursor-pointer  hover:text-gray-400`} onClick={() => navigateTo("movie")}>
          Movies
        </li>
        <li className={`cursor-pointer hover:text-gray-400 `} onClick={() => navigateTo("tv")}>
          TvSeries
        </li>
        <li className={`cursor-pointer hover:text-gray-400 `} onClick={() => navigate("/mylist")}>
          My List
        </li>
        <li className={`cursor-pointer hover:text-gray-400 `}>
          {<HiOutlineSearch onClick={openSearch} className="font-semibold" />}
        </li>
      </ul>

      <div
        className={` transition-[top] delay-[0.3s] ease-linear w-full fixed ${
          showMobileMenu ? "top-[60px] " : "top-[-150px]"
        } right-0 left-0 border-t-[0.3px] min-[768px]:hidden border-t-[rgba(255,255,255,0.8)]`}
      >
        <ul
          id="drawer-top-example"
          className={`flex flex-col items-center  text-[15px] min-[768px]:text-[18px] font-semibold text-white   bg-[rgba(15,16,20)] w-full divide-[rgba(255,255,255,0.8)] divide-y-[0.3px] `}
        >
          <li
            className={`cursor-pointer text-[20px] py-[10px] h-[50px] w-full flex justify-center items-center hover:text-gray-400`}
            onClick={() => navigateTo("movie")}
          >
            Movies
          </li>
          <li
            className={`cursor-pointer text-[20px] h-[50px] py-[10px]  w-full flex justify-center items-center hover:text-gray-400`}
            onClick={() => navigateTo("tv")}
          >
            TvSeries
          </li>
          <li className={`cursor-pointer text-[20px] h-[50px] py-[10px]  w-full flex justify-center items-center hover:text-gray-400 `} onClick={() =>{ navigate("/mylist"),setShowMobileMenu(false)} }>
          My List
        </li>
        </ul>
      </div>

      <div className="min-[768px]:hidden text-white flex items-center">
        <HiOutlineSearch
          onClick={openSearch}
          className="mr-[20px] absolute top-[22px] right-[50px]"
        />
        {showMobileMenu ? (
          <VscChromeClose
            onClick={() => setShowMobileMenu(false)}
            className={` ${
              showMobileMenu ? "absolute right-[20px] top-[20px] " : ""
            }`}
          />
        ) : (
          <SlMenu onClick={openMenu} className="" />
        )}
      </div>

      {showSearch && (
        <div className="w-full flex items-center justify-center absolute  right-0 top-[70px] max-w-[1370px] focus:outline-0 focus:ring-transparent focus:border-none px-[20px] ">
          <input
            className=" h-[35px] min-[768px]:h-[50px] max-w-[1200px]  w-full rounded-[35px] text-slate-700 focus:outline-0 focus:ring-inherit focus:border-inherit text-[14px] pl-[20px]"
            type="search"
            name=""
            id=""
            placeholder="Movies, shows and more..."
            onChange={(e) => setQuery(e.target.value)}
            onKeyUp={searchQueryHandler}
            ref={inputRef}
            autoFocus
          />
        </div>
      )}
    </header>
  );
};
export default Header;
