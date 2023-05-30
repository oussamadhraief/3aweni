import { useEffect, useState, useRef, useCallback } from "react";
import ReactDom from "react-dom";
import useDonationsFetch from "../hooks/useDonationsFetch";
import { calculateTimeAgo } from "../utils/convertTimeToRelative";
import { Link, useParams } from "react-router-dom";

interface Props {
  open: boolean;
  onClose: () => void;
  totalDonations: string;
}

export default function DonationsModal({
  open,
  onClose,
  totalDonations,
}: Props) {
  const observer = useRef<IntersectionObserver | null>(null);
  const { id } = useParams<{ id: string }>();

  const [pageNumber, setPageNumber] = useState(0);

  const { Loading, Donations, HasMore } = useDonationsFetch(id, pageNumber);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const lastDonationElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (Loading) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && HasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [Loading, HasMore]
  );

  console.log(Donations);

  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div
        className="w-screen fixed top-0 left-0 h-screen bg-zinc-600/70 z-[9999]"
        onClick={onClose}
      ></div>
      <div className="w-full max-w-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-fit overflow-y-auto bg-white shadow-xl flex flex-col flex-nowrap items-center justify-center gap-3 rounded-xl z-[9999] py-5">
        <h3 className="px-3 text-xl font-bold text-zinc-700">
          Tous les dons &#10088;{totalDonations}&#10089;
        </h3>
        <div className="w-full flex items-start flex-col h-96 overflow-y-auto gap-10 px-8 pb-2 flex-nowrap overflow-x-hidden">
          {Donations.length > 0 &&
            Donations.map((item, index) => {
              if (Donations.length === index + 1) {
                return (
                  <div
                    ref={lastDonationElementRef}
                    className="flex items-start gap-3 text-sm"
                    key={item._id}
                  >
                    <a href="#" className="relative block shrink-0">
                      <img
                        alt="profil"
                        src={
                          item?.user?.image
                            ? `https://res.cloudinary.com/dhwfr0ywo/image/upload/${item?.user?.image}`
                            : "/profile.png"
                        }
                        className="mx-auto object-cover rounded-full h-10 w-10 "
                      />
                    </a>
                    <div className="flex flex-col">
                      <strong>{item.user?.name}</strong>
                      <div className="flex items-center gap-2 flex-nowrap text-xs">
                        <p>{item.amount.toFixed(2)} TND</p>-
                        <p>{calculateTimeAgo(item.createdAt)}</p>
                      </div>
                      <p className="mt-1 break-words">{item.message}</p>
                    </div>
                  </div>
                );
              }

              return (
                <div className="flex items-start gap-3 text-sm" key={item._id}>
                  <a href="#" className="relative block shrink-0">
                    <img
                      alt="profil"
                      src={
                        item?.user?.image
                          ? `https://res.cloudinary.com/dhwfr0ywo/image/upload/${item?.user?.image}`
                          : "/profile.png"
                      }
                      className="mx-auto object-cover rounded-full h-10 w-10 "
                    />
                  </a>
                  <div className="flex flex-col">
                    <strong>{item.user?.name}</strong>
                    <div className="flex items-center gap-2 flex-nowrap text-xs">
                      <p>{item.amount.toFixed(2)} TND</p>-
                      <p>{calculateTimeAgo(item.createdAt)}</p>
                    </div>
                    <p className="mt-1 break-words">{item.message}</p>
                  </div>
                </div>
              );
            })}
          {Loading && (
            <div className="w-6 h-6 min-h-6 min-w-[24px] mx-auto rounded-full border-y-2 border-l-2 border-r border-r-white border-y-secondary border-l-secondary animate-spin mb-2"></div>
          )}
        </div>
        <Link
          to={`/donate/${id}`}
          className="w-11/12 text-white py-2.5 rounded-xl flex flex-nowrap items-center gap-2 justify-center bg-secondary hover:-translate-y-1 transition-all"
        >
          Faire un don
        </Link>
      </div>
    </>,
    document.getElementById("contact-modal")!
  );
}
