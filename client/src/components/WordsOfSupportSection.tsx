import React, { useCallback, useRef, useState } from "react";
import { donation } from "../utils/interfaces";
import { calculateTimeAgo } from "../utils/convertTimeToRelative";
import { useParams } from "react-router-dom";
import useWordsOfSupportFetch from "../hooks/useWordsOfSupportFetch";

export default function WordsOfSupportSection() {
  const observer = useRef<IntersectionObserver | null>(null);
  const { id } = useParams<{ id: string }>();

  const [pageNumber, setPageNumber] = useState(0);

  const { Loading, Donations, HasMore } = useWordsOfSupportFetch(
    id,
    pageNumber
  );

  console.log(Donations);
  

  return (
    <div className="grid-fundraiser-donations flex flex-col gap-12">
      {Donations.length > 0 && <h3 className="text-lg font-bold mt-5">Des mots du cœur</h3>}
      {Donations.length > 0 &&
      Donations.map((item, index) =>  (
          <div className="h-fit flex items-start gap-3 text-sm">
            <a href="#" className="relative block shrink-0">
              <img
                alt="profil"
                src={
                  item?.user?.image
                    ? `https://res.cloudinary.com/dhwfr0ywo/image/upload/${item?.user?.image}`
                    : "/profile.png"
                }
                className="mx-auto object-cover rounded-full h-12 w-12 "
              />
            </a>
            <div className="flex flex-col">
              <strong>{item.user?.name}</strong>
              <div className="flex items-center gap-2 flex-nowrap text-xs">
                <p>{item.amount.toFixed(2)} TND</p>-
                <p>{calculateTimeAgo(item.createdAt)}</p>
              </div>
              <p className="mt-1 break-words w-10/12">{item.message}</p>
            </div>
          </div>
        
      ))}
      {Loading && (
        <div className="w-6 h-6 min-h-6 min-w-[24px] mx-auto rounded-full border-y-2 border-l-2 border-r border-r-white border-y-secondary border-l-secondary animate-spin mb-2"></div>
      )}
      {HasMore && <button className="w-20 text-sm whitespace-nowrap h-7 px-2 mx-auto border border-secondary text-secondary rounded-md hover:bg-secondary hover:text-white" onClick={() => setPageNumber((prevPageNumber) => prevPageNumber + 1)}>Voir plus</button>}
    </div>
  );
}
