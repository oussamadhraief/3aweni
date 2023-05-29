import useAuthContext from "../hooks/useAuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../utils/axiosConfig";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IconContext } from "react-icons";
import { useEffect, useState } from "react";

export default function UserDropdownMenu({ main }: { main: Boolean }) {

  const navigate = useNavigate();
  const location = useLocation()

  const { user, logout } = useAuthContext();

  const [NumberOfUnreadMessages, setNumberOfUnreadMessages] = useState(0)

  useEffect(() => {
    axios.get('/api/unread-messages').then((res) => {
      const { data: { number }} = res
      setNumberOfUnreadMessages(number)
    })
  },[location])

  const handleLogout = () => {
    logout();
    localStorage.removeItem("jwt");
    navigate("/login");
  };

  return (
    <>
      {/* <button className="relative w-fit h-fit px-5">
        <IconContext.Provider value={{ className: "w-6 h-6 text-gray-500" }}>
          <IoIosNotificationsOutline />
        </IconContext.Provider>
      </button> */}
      <div className="dropdown dropdown-bottom dropdown-end flex items-center gap-3">
        <label
          tabIndex={0}
          className="relative btn btn-ghost flex items-center gap-3 hover:bg-zinc-100 font-medium normal-case px-2 py-1"
        >
          {main && <p className="text-xs sm:text-sm font-bold sm:font-normal">{user?.name}</p>}
          <img
            src={
              user?.image
                ? `https://res.cloudinary.com/dhwfr0ywo/image/upload/${user?.image}`
                : "/profile.png"
            }
            alt=""
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full mx-auto object-cover"
          />
          {(NumberOfUnreadMessages > 0 && location.pathname != '/dashboard/messages') && <span className="absolute top-0 right-0">
                <button
                  type="button"
                  className="w-5 h-5 text-[10px] rounded-full text-white bg-red-500"
                >
                  <span className="p-1">{NumberOfUnreadMessages}</span>
                </button>
              </span>}
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu shadow-form rounded-lg w-56 px-3 py-1 bg-white text-sm z-50"
        >
          <li className="py-1 flex bg-white">
            <Link
              to={main ? "/dashboard/stats" : "/"}
              className="flex items-center gap-2 w-full text-center"
            >
              {main ? "Tableau de bord" : "Accueil"}
            </Link>
          </li>
          <li className="py-1 flex bg-white">
            <Link to="/dashboard/fundraisers">Mes 3aweni</Link>
          </li>
          <li className="py-1 flex bg-white">
            <Link to="/dashboard/received-donations?page=1">Dons reçus</Link>
          </li>
          <li className="py-1 flex bg-white">
            <Link to="/dashboard/my-donations">Mes dons</Link>
          </li>
          <li className="py-1 flex bg-white">
            <Link to="/dashboard/fundraisers">Messages reçus</Link>
          </li>
          <li className="py-1 flex bg-white">
            <Link to="/dashboard/settings">Paramètres</Link>
          </li>
          <li className="py-1 flex bg-white text-red-500">
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
    </>
  );
}
