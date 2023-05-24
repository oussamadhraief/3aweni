import { useState, useEffect } from "react";
import { fundraiserInt } from "../utils/interfaces";
import axios from "../utils/axiosConfig";
import { Link } from "react-router-dom";

export default function SearchPageSuggestions({
  locationPermission,
  city,
}: {
  locationPermission: boolean | null;
  city: string | null;
}) {
  const [TabSelection, setTabSelection] = useState<boolean>(true);
  const [TrendingFundraisers, setTrendingFundraisers] = useState<
    fundraiserInt[]
  >([]);
  const [CloseFundraisers, setCloseFundraisers] = useState<fundraiserInt[]>([]);

  useEffect(() => {
    axios.get("/api/trending-fundraisers").then((res) => {
      const {
        data: { fundraisers },
      } = res;

      setTrendingFundraisers(fundraisers);
    });
  }, []);

  useEffect(() => {

    if (city)
      axios.post("/api/close-fundraisers", { city }).then((res) => {
        const {
          data: { fundraisers },
        } = res;

        setCloseFundraisers(fundraisers);
      });
  }, [city]);

  return (
    <div className="min-h-[500px] mb-7 mt-11 flex flex-col items-start w-full max-w-[1150px] z-10">
      <div
        className={
          TabSelection
            ? "mb-10 relative flex items-center justify-between w-52 after:absolute after:w-1/2 after:h-full after:top-0 after:left-0 after:bg-primary after:z-10 after:rounded-xl h-8"
            : "relative flex items-center justify-between w-52 after:absolute after:w-1/2 after:h-full after:top-0 after:left-1/2 after:bg-primary after:z-10 after:rounded-xl h-8 mb-10"
        }
      >
        <button
          className={
            TabSelection
              ? "w-1/2 z-20 text-white outline-none"
              : "w-1/2 z-20 text-black outline-none"
          }
          onClick={(e) => setTabSelection(true)}
        >
          Trending
        </button>

        <button
          className={
            TabSelection
              ? "w-1/2 z-20 text-black outline-none"
              : "w-1/2 z-20 text-white outline-none"
          }
          onClick={(e) => setTabSelection(false)}
        >
          Near you
        </button>
      </div>
      {TabSelection ? (
        <div className="w-full grid grid-cols-4 grid-rows-2 gap-5 overflow-visible fade-in-bottom">
          {TrendingFundraisers.length ? (
            TrendingFundraisers.map((item, index) => {
              if (index == 0)
                return (
                  <Link
                    key={item._id}
                    to={`/fundraisers/${item._id}`}
                    className="flex flex-col items-start rounded-xl bg-white col-span-full md:col-span-2 row-span-2"
                  >
                    <img
                      src={
                        item.image
                          ? `https://res.cloudinary.com/dhwfr0ywo/image/upload/${item.image}`
                          : "/3aweni_placeholder.png"
                      }
                      alt=""
                      className="h-full rounded-xl object-cover"
                    />
                    <p className="text-primary text-xs my-1 px-2">
                      {item.state}, Tunisia
                    </p>
                    <p className="font-semibold text-black text-sm px-2 leading-6 line-clamp-1">
                      {item.title}
                    </p>
                  </Link>
                );

              return (
                <Link
                  key={item._id}
                  to={`/fundraisers/${item._id}`}
                  className="flex flex-col items-start rounded-xl bg-white row-span-1"
                >
                  <img
                    src={
                      item.image
                        ? `https://res.cloudinary.com/dhwfr0ywo/image/upload/${item.image}`
                        : "/3aweni_placeholder.png"
                    }
                    alt=""
                    className="h-full rounded-xl object-cover"
                  />
                  <p className="text-primary text-xs my-1 px-2">
                    {item.state}, Tunisia
                  </p>
                  <p className="font-semibold text-black text-sm px-2 leading-6 line-clamp-1">
                    {item.title}
                  </p>
                </Link>
              );
            })
          ) : (
            <p className="col-span-full text-center">
              Pas de 3awenis dans cette catégorie
            </p>
          )}{" "}
        </div>
      ) : null}

      {!TabSelection && (
        <div className="w-full grid grid-cols-4 gap-5 overflow-visible fade-in-bottom">
          {locationPermission === false ? (
            <div className="col-span-full">
              L'autorisation de localisation est refusée. Veuillez activer
              l'accès à la localisation dans paramètres de votre navigateur.
            </div>
          ) : CloseFundraisers.length ? (
            CloseFundraisers.map((item, index) => {
              if (index == 0)
                return (
                  <Link
                    key={item._id}
                    to={`/fundraisers/${item._id}`}
                    className="flex flex-col items-start rounded-xl bg-white col-span-full md:col-span-2 row-span-2"
                  >
                    <img
                      src={
                        item.image
                          ? `https://res.cloudinary.com/dhwfr0ywo/image/upload/${item.image}`
                          : "/3aweni_placeholder.png"
                      }
                      alt=""
                      className="h-full rounded-xl object-cover"
                    />
                    <p className="text-primary text-xs my-1 px-2">
                      {city}, Tunisia
                    </p>
                    <p className="font-semibold text-black text-sm px-2 leading-6 line-clamp-1">
                      {item.title}
                    </p>
                  </Link>
                );

              return (
                <Link
                  key={item._id}
                  to={`/fundraisers/${item._id}`}
                  className="flex flex-col items-start rounded-xl bg-white row-span-1"
                >
                  <img
                    src={
                      item.image
                        ? `https://res.cloudinary.com/dhwfr0ywo/image/upload/${item.image}`
                        : "/3aweni_placeholder.png"
                    }
                    alt=""
                    className="h-full rounded-xl object-cover"
                  />
                  <p className="text-primary text-xs my-1 px-2">
                    {city}, Tunisia
                  </p>
                  <p className="font-semibold text-black text-sm px-2 leading-6 line-clamp-1">
                    {item.title}
                  </p>
                </Link>
              );
            })
          ) : (
            <p className="col-span-full text-center">
              Pas de 3awenis dans cette catégorie
            </p>
          )}
        </div>
      )}
    </div>
  );
}
