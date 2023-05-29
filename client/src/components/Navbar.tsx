import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { useRef, useState } from "react";
import { categories } from "../utils/categoriesData";
import useClickOutside from "../hooks/useClickOutside";

export default function Navbar({
  Show,
  setShow,
}: {
  Show: boolean;
  setShow: (value: boolean) => void;
}) {
  const discover = useRef<HTMLLIElement>(null);

  const [Open, setOpen] = useState(false);

  useClickOutside(discover, () => setOpen(false));

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <nav className="flex flex-col items-center" id="main-menu">
      <ul
        className={`${
          Show
            ? "absolute top-full left-0 flex flex-col py-10 gap-8 w-full shadow-md"
            : "hidden"
        } main-menu__list md:relative md:top-0 md:shadow-none md:gap-0 md:py-4 bg-white justify-center md:flex items-center flex-col md:flex-row`}
      >
        <li className="dropdown dropdown-bottom dropdown-end flex items-center gap-3 relative group main-menu__item">
          <Link
            className={`header__link ${Show ? "block" : "hidden"} md:hidden`}
            to="/login"
            onClick={() => setShow(false)}
          >
            Se connecter
          </Link>
        </li>
        <li
          ref={discover}
          className="flex items-center gap-3 relative group main-menu__item"
        >
          <button
            className="flex items-center gap-3 cursor-pointer font-medium normal-case main-menu__link g-link text-[#5a6482]"
            onClick={handleClick}
          >
            Découvrir
            <IconContext.Provider
              value={{ className: " group-hover:text-secondary" }}
            >
              <IoIosArrowDown />
            </IconContext.Provider>
          </button>
          {Open && (
            <ul className="absolute top-8 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-0 menu shadow-form rounded-lg h-fit sm:h-[320px] flex flex-col items-center w-52 sm:w-[340px] flex-wrap py-1 bg-white text-sm z-50">
              {categories.map((item) => (
                <li>
                  <Link
                    to={`/discover/${item.value}`}
                    className="w-36 whitespace-nowrap text-[15px] rounded-xl"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
        <li className="main-menu__item">
          <Link
            to="/search"
            onClick={() => setShow(false)}
            className="flex items-center gap-1 main-menu__link g-link group"
          >
            Recherche
            <IconContext.Provider
              value={{ className: "text-lg group-hover:text-secondary" }}
            >
              <AiOutlineSearch />
            </IconContext.Provider>
          </Link>
        </li>
        <li className="main-menu__item">
          <Link
            className="main-menu__link g-link"
            to="#"
            onClick={() => setShow(false)}
          >
            Aide
          </Link>
        </li>
      </ul>
    </nav>
  );
}
