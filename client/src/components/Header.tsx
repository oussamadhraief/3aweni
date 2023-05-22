import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

import useLoadingAuthContext from "../hooks/useLoadingAuthContext";
import UserDropdownMenu from "./UserDropdownMenu";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IconContext } from "react-icons";

export default function Header() {
  const { user } = useAuthContext();
  const { Loading } = useLoadingAuthContext();

  const [Show, setShow] = useState(false);

  return (
    <header className="header" id="header">
      <div className="relative header__container w-full max-w-[1480px] flex justify-between items-center flex-nowrap ">
        <div className="flex">
          <Link className="header__logo" to="/">
            <img
              className="header__icon"
              src="/secondary_logo.png"
              alt="logo"
            />
          </Link>
          <Navbar Show={Show} setShow={setShow} />
        </div>
        <div className="flex items-center">
          {Loading ? (
            <div className="mx-auto rounded-md w-fit">
              <div className="flex flex-row items-center justify-center h-full gap-5 animate-pulse">
                <div className="h-5 bg-gray-200 rounded-md w-28"></div>

                <div className="w-8 h-8 bg-gray-200 rounded-full "></div>
              </div>
            </div>
          ) : user ? (
            <UserDropdownMenu main={true} />
          ) : (
            <>
              <Link className={`header__link hidden md:block`} to="/login">
                Se connecter
              </Link>
              <Link className="header__button g-button" to="/register">
                S'inscrire
              </Link>
            </>
          )}
          <button
            className="header__trigger inherit md:hidden"
            id="header-trigger"
            onClick={() => setShow((prev) => !prev)}
          >
            {Show ? (
              <IconContext.Provider value={{ className: "h-6 w-6 text-black" }}>
                <IoMdClose />
              </IconContext.Provider>
            ) : (
              <img
                className="header__icon"
                src="https://raw.githubusercontent.com/ricardoolivaalonso/GetBello/main/public/img/menu.svg"
                alt="menu"
              />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
