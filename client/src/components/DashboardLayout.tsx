import { useState, useEffect } from "react";
import { IconContext } from "react-icons";
import { BiDonateHeart, BiIdCard } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { TiMessage } from "react-icons/ti";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { BsArrowBarLeft } from "react-icons/bs";
import getUser from "../hooks/getUser";
import useAuthContext from "../hooks/useAuthContext";
import useLoadingAuthContext from "../hooks/useLoadingAuthContext";
import { AiOutlineSearch } from "react-icons/ai";
import { RiUserHeartLine } from "react-icons/ri";
import UserDropdownMenu from "./UserDropdownMenu";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import axios from "../utils/axiosConfig";
import { IoMdClose } from "react-icons/io";

export default function UserDashboard() {
  const location = useLocation();
  const { login, logout } = useAuthContext();
  const { setLoading } = useLoadingAuthContext();
  const [ShowSidebar, setShowSidebar] = useState<boolean>(true);
  const [NumberOfUnreadMessages, setNumberOfUnreadMessages] = useState(0);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    if (mql.matches) {
      setShowSidebar(false);
    }
    getUser({ login, logout, setLoading });
    axios.get("/api/unread-messages").then((res) => {
      const {
        data: { number },
      } = res;
      setNumberOfUnreadMessages(number);
    });
  }, [location]);

  return (
    <div className="flex w-screen h-screen flex-nowrap justify-start items-start overflow-hidden">
      <div
        className={`relative ${
          ShowSidebar ? "w-full h-screen md:w-72" : "h-0 md:h-screen md:w-0"
        } transition-all bg-white  shrink-0`}
      >
        <div
          className={`absolute left-0 md:top-0 ${
            ShowSidebar ? "top-0 md:left-0" : "-top-[100vh] md:-left-72"
          } transition-all duration-150 h-screen w-full md:w-72 min-w-[288px] max-w-full md:max-w-[288px] shadow-form`}
        >
          <Link to="/">
            <img className="h-12 mx-auto mt-5" src="/secondary_logo.png" />
          </Link>

          <nav className="mt-10 px-4 ">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "hover:text-primary flex items-center p-2 my-4 transition-colors duration-200  text-primary rounded-l-lg border-r-2 border-primary bg-primary/10 text-[15px]"
                  : "hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-4 transition-colors  duration-200  text-gray-600 rounded-lg text-[15px]"
              }
              to="/dashboard/stats"
            >
              <IconContext.Provider
                value={{ className: "w-5 h-5 text-gray-700" }}
              >
                <MdOutlineSpaceDashboard />
              </IconContext.Provider>
              <span className="mx-4 font-normal">Tableau de bord</span>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "hover:text-primary flex items-center p-2 my-4 transition-colors duration-200  text-primary rounded-l-lg border-r-2 border-primary bg-primary/10 text-[15px]"
                  : "hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-4 transition-colors  duration-200  text-gray-600 rounded-lg text-[15px]"
              }
              to="/dashboard/fundraisers"
            >
              <IconContext.Provider
                value={{ className: "w-5 h-5 text-gray-700" }}
              >
                <BiIdCard />
              </IconContext.Provider>
              <span className="mx-4 font-normal">Mes 3awenis</span>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "hover:text-primary flex items-center p-2 my-4 transition-colors duration-200  text-primary rounded-l-lg border-r-2 border-primary bg-primary/10 text-[15px]"
                  : "hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-4 transition-colors  duration-200  text-gray-600 rounded-lg text-[15px]"
              }
              to="/dashboard/received-donations?page=1"
            >
              <IconContext.Provider
                value={{ className: "w-5 h-5 text-gray-700" }}
              >
                <RiUserHeartLine />
              </IconContext.Provider>
              <span className="mx-4 font-normal">Dons reçus</span>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "hover:text-primary flex items-center p-2 my-4 transition-colors duration-200  text-primary rounded-l-lg border-r-2 border-primary bg-primary/10 text-[15px]"
                  : "hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-4 transition-colors  duration-200  text-gray-600 rounded-lg text-[15px]"
              }
              to="/dashboard/my-donations"
            >
              <IconContext.Provider
                value={{ className: "w-5 h-5 text-gray-700" }}
              >
                <BiDonateHeart />
              </IconContext.Provider>
              <span className="mx-4 font-normal">Mes dons</span>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "hover:text-primary flex items-center p-2 my-4 transition-colors duration-200  text-primary rounded-l-lg border-r-2 border-primary bg-primary/10 text-[15px]"
                  : "hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-4 transition-colors  duration-200  text-gray-600 rounded-lg text-[15px]"
              }
              to="/dashboard/messages"
            >
              <IconContext.Provider
                value={{ className: "w-5 h-5 text-gray-700" }}
              >
                <TiMessage />
              </IconContext.Provider>
              <span className="mx-4 font-normal">Messages reçus</span>
              {NumberOfUnreadMessages > 0 &&
                location.pathname != "/dashboard/messages" && (
                  <span className="flex-grow text-right">
                    <button
                      type="button"
                      className="w-5 h-5 text-[10px]  rounded-full text-white bg-red-500"
                    >
                      <span className="p-1">{NumberOfUnreadMessages}</span>
                    </button>
                  </span>
                )}
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "hover:text-primary flex items-center p-2 my-4 transition-colors duration-200  text-primary rounded-l-lg border-r-2 border-primary bg-primary/10 text-[15px]"
                  : "hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-4 transition-colors  duration-200  text-gray-600 rounded-lg text-[15px]"
              }
              to="/dashboard/settings"
            >
              <IconContext.Provider
                value={{ className: "w-4 h-4 text-gray-700" }}
              >
                <FiSettings />
              </IconContext.Provider>
              <span className="mx-4 font-normal">Paramètres</span>
            </NavLink>
          </nav>
        </div>
      </div>

      <div className="w-full flex flex-col flex-nowrap h-screen">
        <div className="w-full flex flex-nowrap justify-end px-5 relative bg-base-100 z-10 h-12 dashboard-navbar">
          <button
            className={`w-fit h-full absolute ${
              ShowSidebar ? "-left-10" : "left-5"
            } transition-all top-0`}
            onClick={() => setShowSidebar((prev) => !prev)}
          >
            {ShowSidebar ? (
              <>
                <IconContext.Provider
                  value={{ className: "w-0 h-0 md:w-5 md:h-5" }}
                >
                  <BsArrowBarLeft />
                </IconContext.Provider>
                <IconContext.Provider
                  value={{ className: "md:w-0 md:h-0 w-5 h-5" }}
                >
                  <IoMdClose />
                </IconContext.Provider>
              </>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            )}
          </button>
          <div className="self-end flex justify-between items-center">
            <form className="flex items-center flex-nowrap bg-gray-100 rounded-full overflow-hidden w-40 sm:w-72">
              <button className="py-1 px-2">
                <IconContext.Provider
                  value={{ className: "text-gray-500 w-5 h-5" }}
                >
                  <AiOutlineSearch />
                </IconContext.Provider>
              </button>

              <input
                type="text"
                placeholder="Search"
                className="h-8 bg-gray-100 placeholder:text-gray-500 outline-none text-sm"
              />
            </form>
            <UserDropdownMenu main={false} />
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
