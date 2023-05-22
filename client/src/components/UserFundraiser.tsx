import React, { useState, useRef } from "react";
import { IconContext } from "react-icons";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Link } from "react-router-dom";
import useClickOutside from "./useClickOutside";

export default function UserFundraiser({
  id,
  image,
  title,
  goal,
}: {
  id: string;
  image: string | null;
  title: string;
  goal: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const [Show, setShow] = useState(false);

  useClickOutside(ref, () => setShow(false));

  const handleClick = () => {
    setShow((prev) => !prev);
  };

  return (
    <div
      ref={ref}
      onClick={(e) => e.stopPropagation}
      className="relative xl:w-[18%] md:w-[45%] pb-4 w-full bg-white rounded mb-10 shadow-form"
    >
      <div className="absolute top-1 right-1 text-zinc-700 bg-white z-10 rounded-md w-6 h-6">
        <button className="w-full h-full p-0.5" onClick={handleClick}>
          <IconContext.Provider value={{ className: "w-5 h-5" }}>
            <BiDotsVerticalRounded />
          </IconContext.Provider>
        </button>
        {Show && (
          <ul className="menu absolute right-0 top-[115%] bg-white shadow-form w-36 h-fit p-1.5 rounded">
            <li className="w-full flex">
              <Link
                to={`/fundraisers/${id}`}
                className="w-full py-2 px-3 text-sm"
              >
                Voir
              </Link>
            </li>
            <li className="w-full flex">
              <Link
                to={`/dashboard/fundraisers/${id}`}
                className="w-full py-2 px-3 text-sm"
              >
                Modifier
              </Link>
            </li>
            <li>
              <button className="text-red-500  py-2 px-3 text-sm">
                Supprimer
              </button>{" "}
            </li>
          </ul>
        )}
      </div>
      <div className="block relative w-full rounded-t overflow-hidden">
        <img
          alt="ecommerce"
          className="object-cover object-center w-full h-full block"
          src={
            image
              ? `https://res.cloudinary.com/dhwfr0ywo/image/upload/${image}`
              : "/3aweni_placeholder.png"
          }
        />
      </div>
      <div className="mt-4 px-4">
        <h2 className="text-gray-900 title-font text-lg font-medium">
          {title}
        </h2>
        <progress
          max="100"
          value="25"
          className="w-full h-1.5 mt-1 overflow-hidden rounded bg-secondary/10 [&::-webkit-progress-bar]:bg-secondary/10 [&::-webkit-progress-value]:bg-secondary [&::-moz-progress-bar]:bg-secondary"
        />
        <div>
          <span className="mt-1">00.00 TND</span>
          <span className="text-gray-500 text-xs tracking-widest title-font mb-1">
            {" "}
            de {goal}.00 TND collectés
          </span>
        </div>
      </div>
    </div>
  );
}
