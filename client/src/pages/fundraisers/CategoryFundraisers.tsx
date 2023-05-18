import axios from "../../utils/axiosConfig";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fundraiserInt } from "../../utils/interfaces";

export default function CategoryFundraisers() {
  const { category } = useParams();

  const [Fundraisers, setFundraisers] = useState<fundraiserInt[]>([]);

  useEffect(() => {
    axios.get(`/api/fundraisers/category/${category}`).then((res) => {
      setFundraisers(res.data.fundraisers);
    });
  }, []);

  return (
    <main className="relative mt-[94px] py-24 flex flex-col items-center">
      <div className="w-full max-w-6xl grid grid-cols-4 gap-5 px-5">
        {Fundraisers.length ? Fundraisers.map((item) => (
          <Link to={`/fundraisers/${item._id}`} className="shadow-form pb-2 rounded bg-white col-span-2 md:col-span-1 mb-10">
            <img src={item.image ? `https://res.cloudinary.com/dhwfr0ywo/image/upload/${item.image}` : "/3aweni_placeholder.png"} alt="" className="rounded-t" />
            <p className="text-primary text-xs my-1 px-4">
              {item.state}, Tunisia
            </p>
            <p className="font-semibold text-black text-sm px-2 leading-6 line-clamp-1">
              {item.title}
            </p>
            <p className="h-14 line-clamp-2 leading-7 w-full text-sm px-2">
              {item.description ? item.description : 'Pas de description'}
            </p>
            <p className="text-zinc-500 font-thin text-xs mt-10 px-2">
              Dernier don 2 min
            </p>
            <progress
              max="100"
              value="25"
              className="w-[96%] ml-[2%] h-2 overflow-hidden rounded bg-secondary/10 [&::-webkit-progress-bar]:bg-secondary/10 [&::-webkit-progress-value]:bg-secondary [&::-moz-progress-bar]:bg-secondary"
            />
            <p className="text-zinc-500 font-thin text-xs mt-2 px-2">
              {" "}
              <strong className="text-black font-bold">12.000DT</strong>{" "}
              collectés men asl {item.goal}DT
            </p>
          </Link>
        ))
        : <p className="col-span-full text-center">Pas de 3awenis dans cette catégorie</p>}
        
      </div>
    </main>
  );
}
