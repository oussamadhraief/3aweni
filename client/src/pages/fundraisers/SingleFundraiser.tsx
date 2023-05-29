import axios from "../../utils/axiosConfig";
import { useEffect, useRef, useState } from "react";
import { IconContext } from "react-icons";
import { MdIosShare, MdOutlineDateRange } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { donation, fundraiserInt } from "../../utils/interfaces";
import { AiFillWarning } from "react-icons/ai";
import useAuthContext from "../../hooks/useAuthContext";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { categories } from "../../utils/categoriesData";
import { HiOutlineTag } from "react-icons/hi";
import ContactModal from "../../components/ContactModal";
import DonationsModal from "../../components/DonationsModal";
import { calculateTimeAgo } from "../../utils/convertTimeToRelative";
import { GoLocation } from "react-icons/go";
import WordsOfSupportSection from "../../components/WordsOfSupportSection";
import clipboardCopy from "clipboard-copy";

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
  const [Show, setShow] = useState<boolean>(false);
  const [ShowMain, setShowMain] = useState({ type: "image", index: 0 });
  const [CollectedAmount, setCollectedAmount] = useState<number>(0);
  const [TotalDonations, setTotalDonations] = useState<string>("0");
  const [TopDonation, setTopDonation] = useState<donation>({
    _id: "",
    user: null,
    fundraiser: null,
    amount: 0,
    tip: 0,
    incognito: false,
    message: "",
    createdAt: null,
    updatedAt: null,
  });
  const [MostRecentDonation, setMostRecentDonation] = useState<donation>({
    _id: "",
    user: null,
    fundraiser: null,
    amount: 0,
    tip: 0,
    incognito: false,
    message: "",
    createdAt: null,
    updatedAt: null,
  });
  const [FirstDonation, setFirstDonation] = useState<donation>({
    _id: "",
    user: null,
    fundraiser: null,
    amount: 0,
    tip: 0,
    incognito: false,
    message: "",
    createdAt: null,
    updatedAt: null,
  });

  useEffect(() => {
    if (id) {
      axios.get(`/api/single-fundraiser/${id}`, {}).then((response) => {
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

        setCollectedAmount(collectedAmount);
        const formattedTotalDonation = formatNumber(totalDonations);
        setTotalDonations(formattedTotalDonation);
        setTopDonation(topDonation);
        setMostRecentDonation(mostRecentDonation);
        setFirstDonation(firstDonation);
        setFundraiser(fundraiser);
      });
    }
  }, []);

  const formatNumber = (num: number) => {
    const suffixes = ["", "k", "M", "B", "T"];
    const suffixNum = Math.floor(("" + num).length / 3);
    let shortValue: any = parseFloat(
      (suffixNum !== 0 ? num / Math.pow(1000, suffixNum) : num).toPrecision(2)
    );
    if (shortValue % 1 !== 0) {
      shortValue = shortValue.toFixed(1);
    }
    return shortValue + suffixes[suffixNum];
  };

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

  const copyToClipboard = () => {
    const baseURL = process.env.REACT_APP_API_URL || "http://localhost:3000/";
    clipboardCopy(`${baseURL}fundraisers/${Fundraiser._id}`);
  };

  return (
    <main className="relative mt-[94px] pb-10  flex flex-col items-center justify-center">
      <section className="w-full h-fit min-h-fit max-w-7xl mx-auto text-gray-600 px-5 fundraiser-container">
        {user?._id === Fundraiser.user?._id && WarningOpen && (
          <div className="fixed bottom-0 left-0 bg-lighter_blue/80 w-full flex justify-between items-center py-3 px-10 text-secondary z-50">
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
                  Vous êtes le propriétaire de ce 3aweni
                </p>
                <p className="text-xs text-gray-600 flex flex-nowrap items-center gap-2">
                  Vous devez ajouter une image principale pour rendre votre
                  3aweni visible aux utilisateur
                </p>
              </div>
            </div>
            <Link
              to={`/dashboard/fundraisers/${Fundraiser._id}`}
              className="text-sm text-secondary border border-secondary px-2 py-1 rounded"
            >
              Vous pouvez le modifier <span className="underline">ici</span>
            </Link>
          </div>
        )}
        <h1 className="text-3xl font-semibold text-gray-800 grid-fundraiser-title my-5">
          {Fundraiser.title}
        </h1>
        <div className="aspect-[7/4] flex items-center justify-center grid-fundraiser-image">
          {ShowMain.type == "image" && (
            <img
              className="w-full max-h-full max-w-full rounded-md object-cover object-center "
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
              className="w-full max-h-full max-w-full rounded-md object-cover object-center "
              src={`https://res.cloudinary.com/dhwfr0ywo/image/upload/${
                Fundraiser.secondaryImages[ShowMain.index]
              }`}
              alt="content"
            />
          )}
          {ShowMain.type == "secondaryVideos" && (
            <video
              className="relative w-full rounded-md overflow-hidden"
              src={`https://res.cloudinary.com/dhwfr0ywo/video/upload/${
                Fundraiser.secondaryVideos[ShowMain.index]
              }`}
              controls
              autoPlay
              muted
              disablePictureInPicture
            ></video>
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
                  className="relative max-w-[224px] h-32 rounded-md overflow-hidden flex items-center justify-center shrink-0"
                  onClick={() =>
                    setShowMain({ type: "secondaryVideos", index: index })
                  }
                >
                  <img
                    className="object-cover object-center max-w-full max-h-full self-center rounded-md"
                    src={`https://res.cloudinary.com/dhwfr0ywo/video/upload/${item}.jpg`}
                    alt="content"
                  />
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

        <div className="mt-5 mb-2 text-sm flex items-center flex-wrap gap-1 grid-fundraiser-date-category">
          <MdOutlineDateRange />
          <p>créé il y a {calculateTimeAgo(Fundraiser.createdAt)} </p>
          <p className="rounded-full w-[5px] h-[5px] border border-zinc-500 mx-1.5"></p>
          <HiOutlineTag />
          <Link to={`/discover/${Fundraiser.category}`} className="underline">
            {
              categories.find(
                (category) => category.value === Fundraiser.category
              )?.label
            }
          </Link>

          <p className="rounded-full w-[5px] h-[5px] border border-zinc-500 mx-1.5"></p>
          <GoLocation />
          <p>{Fundraiser.state}, Tunisie.</p>
        </div>

        <div className="grid-fundraiser-money flex flex-col items-start gap-1 lg:hidden">
          <p className="text-zinc-700 font-thin text-xs">
            <strong className="text-black font-semibold text-lg">
              {CollectedAmount.toFixed(2)} DT
            </strong>
            &nbsp;collectés men asl {parseFloat(Fundraiser.goal).toFixed(2)} DT
          </p>
          <progress
            max="100"
            value={
              Fundraiser.goal
                ? (CollectedAmount / parseFloat(Fundraiser.goal)) * 100
                : 0
            }
            className="w-full h-2 my-1 overflow-hidden rounded bg-emerald-500/10 [&::-webkit-progress-bar]:bg-emerald-500/10 [&::-webkit-progress-value]:bg-emerald-500 [&::-moz-progress-bar]:bg-emerald-500"
          />
          <p className="text-zinc-500 font-thin text-xs">
            {TotalDonations} dons
          </p>
        </div>

        {(TopDonation && MostRecentDonation && FirstDonation) ? <div className="flex flex-col items-start lg:hidden grid-fundraiser-special mt-5">
          <h3>Les dons reçus</h3>
          {TopDonation && <div className="rounded-2xl bg-white p-4">
            <div className="flex-row gap-4 flex justify-start items-center">
              <div className="flex-shrink-0">
                <a href="#" className="relative block">
                  <img
                    alt="profil"
                    src={
                      TopDonation?.user?.image
                        ? `https://res.cloudinary.com/dhwfr0ywo/image/upload/${TopDonation?.user?.image}`
                        : "/profile.png"
                    }
                    className="mx-auto object-cover rounded-full h-9 w-9 "
                  />
                </a>
              </div>
              <div className=" flex flex-col">
                <span className="text-sm font-medium text-gray-700">
                  {TopDonation?.user?.name}
                </span>
                <div className="text-xs flex flex-nowrap items-center">
                  <p className=" font-bold">
                    {TopDonation?.amount.toFixed(2)} TND &nbsp;
                  </p>{" "}
                  - &nbsp;
                  <button className="hover:underline text-black">
                    plus gros don
                  </button>
                </div>
              </div>
            </div>
          </div>}
          <hr />

          {MostRecentDonation && <div className="rounded-2xl bg-white p-4">
            <div className="flex-row gap-4 flex justify-start items-center">
              <div className="flex-shrink-0">
                <a href="#" className="relative block">
                  <img
                    alt="profil"
                    src={
                      MostRecentDonation?.user?.image
                        ? `https://res.cloudinary.com/dhwfr0ywo/image/upload/${MostRecentDonation?.user?.image}`
                        : "/profile.png"
                    }
                    className="mx-auto object-cover rounded-full h-9 w-9 "
                  />
                </a>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">
                  {MostRecentDonation?.user?.name}
                </span>
                <div className="text-xs flex flex-nowrap items-center">
                  <p className=" font-bold">
                    {MostRecentDonation?.amount.toFixed(2)} TND &nbsp;
                  </p>{" "}
                  - &nbsp;
                  <button className="hover:underline text-black">
                    dernier don
                  </button>
                </div>
              </div>
            </div>
          </div>}

          <hr />

          {FirstDonation && <div className="rounded-2xl bg-white p-4">
            <div className="flex-row gap-4 flex justify-start items-center">
              <div className="flex-shrink-0">
                <a href="#" className="relative block">
                  <img
                    alt="profil"
                    src={
                      FirstDonation?.user?.image
                        ? `https://res.cloudinary.com/dhwfr0ywo/image/upload/${FirstDonation?.user?.image}`
                        : "/profile.png"
                    }
                    className="mx-auto object-cover rounded-full h-9 w-9 "
                  />
                </a>
              </div>
              <div className=" flex flex-col">
                <span className="text-sm font-medium text-gray-700">
                  {FirstDonation?.user?.name}
                </span>
                <div className="text-xs flex flex-nowrap items-center">
                  <p className=" font-bold">
                    {FirstDonation?.amount.toFixed(2)} TND &nbsp;
                  </p>{" "}
                  - &nbsp;
                  <button className="hover:underline text-black">
                    plus ancien don
                  </button>
                </div>
              </div>
            </div>
          </div>}

          <button
            className="text-secondary px-1.5 border border-secondary hover:bg-secondary hover:text-white w-fit self-center py-0.5 rounded-lg text-xs"
            onClick={() => setShow(true)}
          >
            Voir tous
          </button>
        </div>
        :
        <div className="flex flex-col items-start lg:hidden grid-fundraiser-special mt-5 text-sm">Pas de dons reçus</div>}

        <div className="w-full px-0 sm:px-8 pt-4 pb-3 flex justify-between items-center flex-nowrap space-x-2 sm:space-x-6 border-y border-secondary/50 grid-fundraiser-organizer">
          <div className="flex space-x-4 items-center">
            <div className="flex-shrink-0 w-12 h-12 sm:h-12 sm:w-12 sm:mb-0">
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
            <div className="flex flex-col justify-center">
              <h2 className="text-sm font-semibold text-secondary">
                {Fundraiser.user?.name}
              </h2>
              <p className="text-xs text-zinc-600">Organisateur</p>
            </div>
          </div>
          <button
            className="border rounded px-2 py-0.5 border-secondary text-secondary self-center hover:text-white hover:bg-secondary"
            onClick={() => setOpen(true)}
          >
            Contacter
          </button>
        </div>

        <p className="my-5 text-sm grid-fundraiser-description break-words">
          {Fundraiser.description
            ? Fundraiser.description
            : "Pas de description"}
        </p>

        <div className="sticky lg:relative bottom-0 bg-white pb-2 flex gap-3 items-center grid-fundraiser-buttons before:absolute before:block before:lg:hidden before:bottom-full before:left-0 before:bg-gradient-to-t before:from-white before:to-white/50 before:w-full before:h-5">
          <Link
            to={`/donate/${Fundraiser._id}`}
            className="w-full text-white py-2.5 rounded-xl my-0 lg:my-3 flex flex-nowrap items-center gap-2 justify-center bg-secondary shadow-modern  shadow-secondary/30 hover:shadow-xxxl hover:shadow-secondary/30 transition-all"
          >
            Donate
          </Link>
          <button
            className="h-fit border border-secondary text-secondary hover:text-white hover:bg-secondary w-full py-[9px] rounded-xl flex justify-center items-center flex-nowrap gap-1"
            onClick={copyToClipboard}
          >
            <IconContext.Provider value={{ className: "h-4 w-4 mb-0.5" }}>
              <MdIosShare />
            </IconContext.Provider>
            <span>Partager</span>
          </button>
        </div>

        <WordsOfSupportSection />

        <div className="relative grid-fundraiser-sidebar hidden lg:flex flex-col items-end">
          <div className="sticky card w-fit bg-base-100 shadow-form rounded-lg px-4 top-24 self-end">
            <div className="w-80 py-8 flex flex-col">
              <p className="text-zinc-700 font-thin text-xs">
                <strong className="text-black font-semibold text-lg">
                  {CollectedAmount.toFixed(2)} DT
                </strong>
                &nbsp;collectés men asl {parseFloat(Fundraiser.goal).toFixed(2)}{" "}
                DT
              </p>
              <progress
                max="100"
                value={
                  Fundraiser.goal
                    ? (CollectedAmount / parseFloat(Fundraiser.goal)) * 100
                    : 0
                }
                className="w-full h-1.5 my-1 overflow-hidden rounded bg-emerald-500/10 [&::-webkit-progress-bar]:bg-emerald-500/10 [&::-webkit-progress-value]:bg-emerald-500 [&::-moz-progress-bar]:bg-emerald-500"
              />
              <p className="text-zinc-500 font-thin text-xs">
                {TotalDonations} dons
              </p>

              {!(TopDonation && MostRecentDonation && FirstDonation) && <p className="text-sm my-5">Pas de dons reçus</p>}
              {TopDonation && <div className="rounded-2xl bg-white p-4">
                <div className="flex-row gap-4 flex justify-start items-center">
                  <div className="flex-shrink-0">
                    <a href="#" className="relative block">
                      <img
                        alt="profil"
                        src={
                          TopDonation?.user?.image
                            ? `https://res.cloudinary.com/dhwfr0ywo/image/upload/${TopDonation?.user?.image}`
                            : "/profile.png"
                        }
                        className="mx-auto object-cover rounded-full h-9 w-9 "
                      />
                    </a>
                  </div>
                  <div className=" flex flex-col">
                    <span className="text-sm font-medium text-gray-700">
                      {TopDonation?.user?.name}
                    </span>
                    <div className="text-xs flex flex-nowrap items-center">
                      <p className=" font-bold">
                        {TopDonation?.amount.toFixed(2)} TND &nbsp;
                      </p>{" "}
                      - &nbsp;
                      <button className="hover:underline text-black">
                        plus gros don
                      </button>
                    </div>
                  </div>
                </div>
              </div>}

              {(MostRecentDonation || FirstDonation) && <hr />}

              {MostRecentDonation && <div className="rounded-2xl bg-white p-4">
                <div className="flex-row gap-4 flex justify-start items-center">
                  <div className="flex-shrink-0">
                    <a href="#" className="relative block">
                      <img
                        alt="profil"
                        src={
                          MostRecentDonation?.user?.image
                            ? `https://res.cloudinary.com/dhwfr0ywo/image/upload/${MostRecentDonation?.user?.image}`
                            : "/profile.png"
                        }
                        className="mx-auto object-cover rounded-full h-9 w-9 "
                      />
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-700">
                      {MostRecentDonation?.user?.name}
                    </span>
                    <div className="text-xs flex flex-nowrap items-center">
                      <p className=" font-bold">
                        {MostRecentDonation?.amount.toFixed(2)} TND &nbsp;
                      </p>{" "}
                      - &nbsp;
                      <button className="hover:underline text-black">
                        dernier don
                      </button>
                    </div>
                  </div>
                </div>
              </div>}

              {FirstDonation && <hr /> }

              {FirstDonation && <div className="rounded-2xl bg-white p-4">
                <div className="flex-row gap-4 flex justify-start items-center">
                  <div className="flex-shrink-0">
                    <a href="#" className="relative block">
                      <img
                        alt="profil"
                        src={
                          FirstDonation?.user?.image
                            ? `https://res.cloudinary.com/dhwfr0ywo/image/upload/${FirstDonation?.user?.image}`
                            : "/profile.png"
                        }
                        className="mx-auto object-cover rounded-full h-9 w-9 "
                      />
                    </a>
                  </div>
                  <div className=" flex flex-col">
                    <span className="text-sm font-medium text-gray-700">
                      {FirstDonation?.user?.name}
                    </span>
                    <div className="text-xs flex flex-nowrap items-center">
                      <p className=" font-bold">
                        {FirstDonation?.amount.toFixed(2)} TND &nbsp;
                      </p>{" "}
                      - &nbsp;
                      <button className="hover:underline text-black">
                        plus ancien don
                      </button>
                    </div>
                  </div>
                </div>
              </div>}

              {(TopDonation && MostRecentDonation && FirstDonation) && <button
                className="text-secondary px-1.5 border border-secondary hover:bg-secondary hover:text-white w-fit self-center py-0.5 rounded-lg text-xs"
                onClick={() => setShow(true)}
              >
                Voir tous
              </button>}

              <Link
                to={`/donate/${Fundraiser._id}`}
                className="w-full text-white py-2.5 rounded-2xl my-3 flex flex-nowrap items-center gap-2 justify-center bg-secondary shadow-modern  shadow-secondary/30 hover:shadow-xxxl hover:shadow-secondary/30 transition-all"
              >
                Donate
              </Link>
              <button
                className="h-9 border border-secondary text-secondary hover:text-white hover:bg-secondary w-full py-1.5 rounded-xl flex justify-center items-center flex-nowrap gap-1"
                onClick={copyToClipboard}
              >
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
      <DonationsModal
        open={Show}
        onClose={() => setShow(false)}
        totalDonations={TotalDonations}
      />
    </main>
  );
}
