import useAuthContext from "../hooks/useAuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axiosConfig";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IconContext } from "react-icons";

export default function UserDropdownMenu({ main }: { main: Boolean }) {
  const navigate = useNavigate();

  const { user, logout } = useAuthContext();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("jwt");
    navigate("/login");
  };

  return (
    <>
      <button className="relative w-fit h-fit px-5">
        <IconContext.Provider value={{ className: "w-6 h-6 text-gray-500" }}>
          <IoIosNotificationsOutline />
        </IconContext.Provider>
      </button>
      <div className="dropdown dropdown-bottom dropdown-end flex items-center gap-3">
        <label
          tabIndex={0}
          className="btn btn-ghost flex items-center gap-3 hover:bg-zinc-100 font-medium normal-case px-2 py-1"
        >
          {main && <p>{user?.name}</p>}
          <img
            src={
              user?.image
                ? `https://res.cloudinary.com/dhwfr0ywo/image/upload/${user?.image}`
                : "/profile.png"
            }
            alt=""
            className="w-8 h-8 rounded-full mx-auto object-cover "
          />
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu shadow-form rounded-lg w-52 px-3 py-1 bg-white text-sm"
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
            <Link to="/dashboard/fundraisers">Dons reçus</Link>
          </li>
          <li className="py-1 flex bg-white">
            <Link to="/dashboard/fundraisers">Mes dons</Link>
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
