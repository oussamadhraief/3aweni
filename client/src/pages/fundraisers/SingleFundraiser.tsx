import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { IconContext } from "react-icons";
import { MdIosShare } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { donation, fundraiserInt } from "../../utils/interfaces";
import { AiFillWarning } from "react-icons/ai";
import useAuthContext from "../../hooks/useAuthContext";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { categories } from "../../utils/categoriesData";
import { HiOutlineTag } from "react-icons/hi";
import ContactModal from "../../components/ContactModal";

export default function SingleFundraiser() {
  const carousel = useRef<HTMLDivElement>(null);
  const { id } = useParams();
  const { user } = useAuthContext();

  const [Fundraiser, setFundraiser] = useState<fundraiserInt>({
    _id: "",
    category: "",
    state: "",
    zipCode: 0,
    type: "",
    goal: "",
    user: null,
    description: "",
    image: null,
    title: "",
    secondaryImages: [],
    secondaryVideos: [],
    createdAt: null,
    updatedAt: null,
  });
  const [WarningOpen, setWarningOpen] = useState<boolean>(true);
  const [Open, setOpen] = useState<boolean>(false);
  const [ShowMain, setShowMain] = useState({ type: "image", index: 0 });
  const [CollectedAmount, setCollectedAmount] =
    useState<number>(0);
  const [Goal, setGoal] =
    useState<number>(0);
  const [TotalDonations, setTotalDonations] =
    useState<string>('0');
  const [TopDonation, setTopDonation] = useState<donation>({
    user: null,
    fundraiser: null,
    amount: 0,
    createdAt: null,
    updatedAt: null,
  });
  const [MostRecentDonation, setMostRecentDonation] =
    useState<donation>({
      user: null,
      fundraiser: null,
      amount: 0,
      createdAt: null,
      updatedAt: null,
    });
  const [FirstDonation, setFirstDonation] =
    useState<donation>({
      user: null,
      fundraiser: null,
      amount: 0,
      createdAt: null,
      updatedAt: null,
    })
    

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/single-fundraiser/${id}`, {
          withCredentials: true,
        })
        .then((response) => {
          const {
            data: {
              fundraiser,
              collectedAmount,
              totalDonations,
              topDonation,
              mostRecentDonation,
              firstDonation,
            },
          } = response;

          console.log(response.data);
          

          setCollectedAmount(collectedAmount);
          const formattedTotalDonation = formatNumber(totalDonations)
          setTotalDonations(formattedTotalDonation)
          setTopDonation(topDonation);
          setMostRecentDonation(mostRecentDonation);
          setFirstDonation(firstDonation);
          setFundraiser(fundraiser);
          setGoal(fundraiser.goal);
        });
    }
  }, []);

  const formatNumber = (num: number) => {
    const suffixes = ["", "k", "M", "B", "T"];
    const suffixNum = Math.floor(("" + num).length / 3);
    let shortValue: any = parseFloat((suffixNum !== 0 ? (num / Math.pow(1000, suffixNum)) : num).toPrecision(2));
    if (shortValue % 1 !== 0) {
      shortValue = shortValue.toFixed(1);
    }
    return shortValue + suffixes[suffixNum];
  }

  const handleScrollLeftCarousel = () => {
    carousel.current?.scroll(
      carousel.current?.scrollLeft - carousel.current?.offsetWidth,
      0
    );
  };

  const handleScrollRightCarousel = () => {
    carousel.current?.scroll(
      carousel.current?.scrollLeft + carousel.current?.offsetWidth,
      0
    );
  };

  function calculateTimeAgo(dateStr: Date | null) {
    const dateString = dateStr as Date;
    const dateCreated = new Date(dateString);
    const dateNow = new Date();
    const timeDiff = dateNow.getTime() - dateCreated.getTime();

    const millisecondsInMinute = 60000;
    const millisecondsInHour = millisecondsInMinute * 60;
    const millisecondsInDay = millisecondsInHour * 24;
    const millisecondsInWeek = millisecondsInDay * 7;
    const millisecondsInMonth = millisecondsInDay * 30;
    const millisecondsInYear = millisecondsInDay * 365;

    if (timeDiff < millisecondsInHour) {
      const diffInMinutes = Math.floor(timeDiff / millisecondsInMinute);
      return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"}`;
    } else if (timeDiff < millisecondsInDay) {
      const diffInHours = Math.floor(timeDiff / millisecondsInHour);
      return `${diffInHours} heure${diffInHours === 1 ? "" : "s"}`;
    } else if (timeDiff < millisecondsInWeek) {
      const diffInDays = Math.floor(timeDiff / millisecondsInDay);
      return `${diffInDays} jour${diffInDays === 1 ? "" : "s"}`;
    } else if (timeDiff < millisecondsInMonth) {
      const diffInWeeks = Math.floor(timeDiff / millisecondsInWeek);
      return `${diffInWeeks} semaine${diffInWeeks === 1 ? "" : "s"}`;
    } else if (timeDiff < millisecondsInYear) {
      const diffInMonths = Math.floor(timeDiff / millisecondsInMonth);
      return `${diffInMonths} mois${diffInMonths === 1 ? "" : "s"}`;
    } else {
      const diffInYears = Math.floor(timeDiff / millisecondsInYear);
      return `${diffInYears} années${diffInYears === 1 ? "" : "s"}`;
    }
  }

  return (
    <main className="relative mt-[94px] py-24  flex flex-col items-center justify-center">
      <section className="w-full h-fit min-h-fit max-w-7xl mx-auto text-gray-600 px-5 fundraiser-container">
        {user?._id === Fundraiser.user?._id && WarningOpen && (
          <div className="fixed bottom-0 left-0 bg-lighter_primary/80 w-full flex justify-between items-center py-3 px-10 text-primary z-50">
            <button
              className="absolute top-0 right-3 text-lg"
              onClick={() => setWarningOpen(false)}
            >
              x
            </button>
            <div className="flex items-center gap-3">
              <IconContext.Provider value={{ className: "w-7 h-7" }}>
                <AiFillWarning />
              </IconContext.Provider>
              <div>
                <p className="text-sm">
                  Vous êtes le propriétaire de ce 3aweni{" "}
                </p>
                <p className="text-xs text-gray-600 flex flex-nowrap items-center gap-2">
                  Vous devez ajouter une image principale pour rendre votre
                  3aweni visible aux utilisateur
                </p>
              </div>
            </div>
            <Link
              to={`/dashboard/fundraisers/${Fundraiser._id}`}
              className="text-sm text-primary border border-primary px-2 py-1 rounded"
            >
              Vous pouvez le modifier <span className="underline">ici</span>
            </Link>
          </div>
        )}
        <h1 className="text-2xl font-semibold text-gray-800 grid-fundraiser-title my-5">
          {Fundraiser.title}
        </h1>
        <div className="aspect-[7/4] flex items-center justify-center grid-fundraiser-image">
          {ShowMain.type == "image" && (
            <img
              className="w-full max-h-full max-w-full max rounded-md object-cover object-center "
              src={
                Fundraiser.image
                  ? `https://res.cloudinary.com/dhwfr0ywo/image/upload/${Fundraiser.image}`
                  : "/3aweni_placeholder.png"
              }
              alt="content"
            />
          )}
          {ShowMain.type == "secondaryImages" && (
            <img
              className="max-h-full max-w-full rounded-md object-cover object-center "
              src={`https://res.cloudinary.com/dhwfr0ywo/image/upload/${
                Fundraiser.secondaryImages[ShowMain.index]
              }`}
              alt="content"
            />
          )}
          {ShowMain.type == "secondaryVideos" && (
            <video
              className="relative w-full rounded-md overflow-hidden flex items-center justify-center"
              controls
              autoPlay
              muted
            >
              <source
                className="object-cover object-center max-h-full max-w-full rounded-md"
                src={`https://res.cloudinary.com/dhwfr0ywo/video/upload/${
                  Fundraiser.secondaryVideos[ShowMain.index]
                }`}
              />
            </video>
          )}
        </div>

        {Fundraiser.secondaryImages.length &&
        Fundraiser.secondaryVideos.length ? (
          <div className="relative flex items-center flex-nowrap grid-fundraiser-secondary">
            <button
              className="bg-white/70 hover:bg-white rounded-full p-0.5 absolute top-1/2 -translate-y-1/2 left-1 shrink-0 z-10 text-secondary"
              onClick={handleScrollLeftCarousel}
            >
              <IconContext.Provider value={{ className: "h-6 w-6" }}>
                <IoIosArrowBack />
              </IconContext.Provider>
            </button>
            <div
              ref={carousel}
              className="w-full max-w-full flex justify-start items-center flex-nowrap my-5 gap-5 overflow-x-auto hidden-scrollbar scroll-smooth"
            >
              <button
                className="relative max-w-[224px] h-32 rounded-md overflow-hidden flex items-center justify-center shrink-0"
                onClick={() => setShowMain({ type: "image", index: 0 })}
              >
                <img
                  className="object-cover object-center max-w-full max-h-full self-center rounded-md"
                  src={`https://res.cloudinary.com/dhwfr0ywo/image/upload/${Fundraiser.image}`}
                  alt="content"
                />
              </button>
              {Fundraiser.secondaryImages.map((item, index) => (
                <button
                  className="relative max-w-[224px] h-32 rounded-md overflow-hidden flex items-center justify-center shrink-0"
                  onClick={() =>
                    setShowMain({ type: "secondaryImages", index: index })
                  }
                >
                  <img
                    className="object-cover object-center max-w-full max-h-full self-center rounded-md"
                    src={`https://res.cloudinary.com/dhwfr0ywo/image/upload/${item}`}
                    alt="content"
                  />
                </button>
              ))}
              {Fundraiser.secondaryVideos.map((item, index) => (
                <button
                  className="w-fit h-fit rounded-md shrink-0"
                  onClick={() =>
                    setShowMain({ type: "secondaryVideos", index: index })
                  }
                >
                  <video className="relative max-w-[224px] h-32 rounded-md overflow-hidden flex items-center justify-center">
                    <source
                      className="object-cover object-center max-h-full max-w-full rounded-md"
                      src={`https://res.cloudinary.com/dhwfr0ywo/video/upload/${item}`}
                    />
                  </video>
                </button>
              ))}
            </div>
            <button
              className="bg-white/70 hover:bg-white rounded-full p-0.5 absolute top-1/2 -translate-y-1/2 right-1 z-10 text-secondary"
              onClick={handleScrollRightCarousel}
            >
              <IconContext.Provider value={{ className: "h-6 w-6" }}>
                <IoIosArrowForward />
              </IconContext.Provider>
            </button>
          </div>
        ) : null}

        <div className="mt-5 mb-2 text-sm flex items-center gap-1 grid-fundraiser-date-category">
          <p>créé il y a {calculateTimeAgo(Fundraiser.createdAt)} - </p>
          <HiOutlineTag />
          <Link to={`/discover/${Fundraiser.category}`} className="underline">
            {
              categories.find(
                (category) => category.value === Fundraiser.category
              )?.label
            }
          </Link>
        </div>

        <div className="w-full px-8 py-6 sm:flex justify-between sm:space-x-6 border-y border-secondary/50 grid-fundraiser-organizer">
          <div className="flex space-x-6">
            <div className="flex-shrink-0 w-16 mb-6 h-16 sm:h-16 sm:w-16 sm:mb-0">
              <img
                src={
                  Fundraiser.user?.image
                    ? `https://res.cloudinary.com/dhwfr0ywo/image/upload/${Fundraiser.user?.image}`
                    : `/profile.png`
                }
                alt=""
                className="object-cover object-center w-full h-full rounded-full"
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-secondary">
                {Fundraiser.user?.name}
              </h2>
              <p className="text-sm text-zinc-600">Organisateur</p>
            </div>
          </div>
          <button
            className="border rounded px-2 py-0.5 border-secondary text-secondary self-center"
            onClick={() => setOpen(true)}
          >
            Contacter
          </button>
        </div>

        <p className="my-5 text-sm grid-fundraiser-description">
          {Fundraiser.description}
        </p>

        <div className="flex gap-3 items-center grid-fundraiser-buttons">
          <Link
            to={`/donate/${Fundraiser._id}`}
            className="w-full text-white py-2.5 rounded-lg my-3 flex flex-nowrap items-center gap-2 justify-center shadow-form bg-secondary hover:-translate-y-1 transition-all"
          >
            Donate
          </Link>
          <button className="h-fit border border-secondary text-secondary hover:text-white hover:bg-secondary w-full py-[9px] rounded-lg flex justify-center items-center flex-nowrap gap-1">
            <IconContext.Provider value={{ className: "h-4 w-4 mb-0.5" }}>
              <MdIosShare />
            </IconContext.Provider>
            <span>Partager</span>
          </button>
        </div>

        <div className="relative grid-fundraiser-sidebar">
          <div className="sticky card w-fit bg-base-100 shadow-modern rounded-lg px-4 top-24 self-end">
            <div className="w-72 py-8 flex flex-col">
              <p className="text-zinc-700 font-thin text-xs">
                {" "}
                <strong className="text-black font-semibold text-lg">
                  {CollectedAmount}.00DT{" "}
                </strong>{" "}
                collectés men asl {Fundraiser.goal}.00DT
              </p>
              <progress
                max="100"
                value={Fundraiser.goal ?  (CollectedAmount / Goal) * 100 : 0}
                className="w-full h-2 my-1 overflow-hidden rounded bg-secondary/10 [&::-webkit-progress-bar]:bg-secondary/10 [&::-webkit-progress-value]:bg-secondary [&::-moz-progress-bar]:bg-secondary"
              />
              <p className="text-zinc-500 font-thin text-xs">{TotalDonations} dons</p>

              <div className="rounded-2xl bg-white p-4">
                <div className="flex-row gap-4 flex justify-start items-center">
                  <div className="flex-shrink-0">
                    <a href="#" className="relative block">
                      <img
                        alt="profil"
                        src={TopDonation?.user?.image ? `https://res.cloudinary.com/dhwfr0ywo/image/upload/${TopDonation?.user?.image}` : "/profile.png"}
                        className="mx-auto object-cover rounded-full h-9 w-9 "
                      />
                    </a>
                  </div>
                  <div className=" flex flex-col">
                    <span className="text-sm font-medium text-gray-700">
                      {TopDonation?.user?.name}
                    </span>
                    <div className="text-xs flex flex-nowrap items-center">
                      <p className=" font-bold">{TopDonation?.amount}  TND &nbsp;</p> - &nbsp;
                      <button className="hover:underline text-black">
                        plus gros don
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <hr />

              <div className="rounded-2xl bg-white p-4">
                <div className="flex-row gap-4 flex justify-start items-center">
                  <div className="flex-shrink-0">
                    <a href="#" className="relative block">
                      <img
                        alt="profil"
                        src={MostRecentDonation?.user?.image ? `https://res.cloudinary.com/dhwfr0ywo/image/upload/${MostRecentDonation?.user?.image}` : "/profile.png"}
                        className="mx-auto object-cover rounded-full h-9 w-9 "
                      />
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-700">
                      {MostRecentDonation?.user?.name}
                    </span>
                    <div className="text-xs flex flex-nowrap items-center">
                      <p className=" font-bold">{MostRecentDonation?.amount} TND &nbsp;</p> - &nbsp;
                      <button className="hover:underline text-black">
                        dernier don
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <hr />

              <div className="rounded-2xl bg-white p-4">
                <div className="flex-row gap-4 flex justify-start items-center">
                  <div className="flex-shrink-0">
                    <a href="#" className="relative block">
                      <img
                        alt="profil"
                        src={FirstDonation?.user?.image ? `https://res.cloudinary.com/dhwfr0ywo/image/upload/${FirstDonation?.user?.image}` : "/profile.png"}
                        className="mx-auto object-cover rounded-full h-9 w-9 "
                      />
                    </a>
                  </div>
                  <div className=" flex flex-col">
                    <span className="text-sm font-medium text-gray-700">
                    {FirstDonation?.user?.name}
                    </span>
                    <div className="text-xs flex flex-nowrap items-center">
                      <p className=" font-bold">{FirstDonation?.amount}  TND &nbsp;</p> - &nbsp;
                      <button className="hover:underline text-black">
                      plus ancien don
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <button className="text-gray-700 underline w-fit self-center py-1 rounded-lg text-sm">
                Voir tous
              </button>

              <Link
                to={`/donate/${Fundraiser._id}`}
                className="w-full text-white py-2.5 rounded-lg my-3 flex flex-nowrap items-center gap-2 justify-center shadow-form bg-secondary hover:-translate-y-1 transition-all"
              >
                Donate
              </Link>
              <button className="h-9 border border-secondary text-secondary hover:text-white hover:bg-secondary w-full py-1.5 rounded-lg flex justify-center items-center flex-nowrap gap-1">
                <IconContext.Provider value={{ className: "h-4 w-4 mb-0.5" }}>
                  <MdIosShare />
                </IconContext.Provider>
                <span>Partager</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      <ContactModal
        open={Open}
        onClose={() => setOpen(false)}
        name={Fundraiser.user?.name}
        id={Fundraiser.user?._id}
      />
    </main>
  );
}
