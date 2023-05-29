import axios from "../../utils/axiosConfig";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fundraiserInt } from "../../utils/interfaces";
import { calculateTimeAgo } from "../../utils/convertTimeToRelative";

interface fundraisersFullInt extends fundraiserInt {
  collectedAmount: number;
  lastDonationCreatedAt: Date | null;
}

export default function CategoryFundraisers() {
  const { category } = useParams();

  const [Fundraisers, setFundraisers] = useState<fundraisersFullInt[]>([]);
  const [Loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`/api/fundraisers/category/${category}`).then((res) => {
      setFundraisers(res.data.fundraisers);
      setLoading(false)
    });
  }, []);

  return (
    <main className="relative mt-[94px] py-24 flex flex-col items-center">
      <div className="w-full max-w-sm sm:max-w-6xl grid grid-cols-2 items-center md:grid-cols-3 lg:grid-cols-4 gap-5 px-5">
        {Fundraisers.length ? (
          Fundraisers.map((item) => (
            <Link
              to={`/fundraisers/${item._id}`}
              className="shadow-form pb-2 rounded bg-white max-w-[280px] col-span-2 sm:col-span-1 mb-10"
            >
              <div className="w-full overflow-hidden">
                <img
                  src={
                    item.image
                      ? `https://res.cloudinary.com/dhwfr0ywo/image/upload/${item.image}`
                      : "/3aweni_placeholder.png"
                  }
                  alt=""
                  className="rounded-t w-full hover:scale-110 transition-all"
                />
              </div>
              <p className="text-primary text-xs my-1 px-4 h-4">
                {item.state}, Tunisie
              </p>
              <p className="font-semibold text-black text-sm px-2 leading-6 line-clamp-1 h-6">
                {item.title}
              </p>
              <p className="h-14 line-clamp-2 leading-7 w-full text-sm px-2 break-words">
                {item.description ? item.description : "Pas de description"}
              </p>
              <p className="text-zinc-500 font-thin text-xs mt-10 px-2 h-4">
                {item.lastDonationCreatedAt &&
                  `Dernier don il y a ${calculateTimeAgo(
                    item.lastDonationCreatedAt
                  )}`}
              </p>
              <progress
                max="100"
                value={
                  item.goal
                    ? (item.collectedAmount / parseFloat(item.goal)) * 100
                    : 0
                }
                className="w-[96%] ml-[2%] h-1.5 overflow-hidden rounded bg-emerald-500/10 [&::-webkit-progress-bar]:bg-emerald-500/10 [&::-webkit-progress-value]:bg-emerald-500 [&::-moz-progress-bar]:bg-emerald-500"
              />
              <p className="text-zinc-500 font-thin text-xs mt-2 px-2 h-4">
                {" "}
                <strong className="text-black font-bold">
                  {item.collectedAmount.toFixed(2)} DT
                </strong>{" "}
                collectés sur {parseFloat(item.goal).toFixed(2)}DT
              </p>
            </Link>
          ))
        ) : 
        Loading ? <>
        <div className="pb-2 rounded max-w-[280px] col-span-2 sm:col-span-1 mb-10 aspect-square bg-gray-300 animate-pulse"></div>
        <div className="pb-2 rounded max-w-[280px] col-span-2 sm:col-span-1 mb-10 aspect-square bg-gray-300 animate-pulse"></div>
        <div className="pb-2 rounded max-w-[280px] col-span-2 sm:col-span-1 mb-10 aspect-square bg-gray-300 animate-pulse"></div>
        <div className="pb-2 rounded max-w-[280px] col-span-2 sm:col-span-1 mb-10 aspect-square bg-gray-300 animate-pulse"></div>
        <div className="pb-2 rounded max-w-[280px] col-span-2 sm:col-span-1 mb-10 aspect-square bg-gray-300 animate-pulse"></div>
        <div className="pb-2 rounded max-w-[280px] col-span-2 sm:col-span-1 mb-10 aspect-square bg-gray-300 animate-pulse"></div>
        <div className="pb-2 rounded max-w-[280px] col-span-2 sm:col-span-1 mb-10 aspect-square bg-gray-300 animate-pulse"></div>
        <div className="pb-2 rounded max-w-[280px] col-span-2 sm:col-span-1 mb-10 aspect-square bg-gray-300 animate-pulse"></div>

        </> :
          <p className="col-span-full text-center">
            Pas de 3awenis dans cette catégorie
          </p>
        }
      </div>
    </main>
  );
}
