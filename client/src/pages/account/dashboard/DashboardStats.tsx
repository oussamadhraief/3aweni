import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "../../../utils/axiosConfig";
import { IconContext } from "react-icons";
import { BiDonateHeart, BiMessageSquare } from "react-icons/bi";
import { donation, message } from "../../../utils/interfaces";
import { calculateTimeAgo } from "../../../utils/convertTimeToRelative";
import { Link } from "react-router-dom";
import { RiProfileLine, RiSendPlaneLine } from "react-icons/ri";
import { MdOutlineAttachMoney } from "react-icons/md";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
    title: {
      display: true,
      text: "Total des fonds reçus durant les derniers 28 jours",
    },
  },
};

export default function DashboardStats() {
  var dateoptions = { day: "2-digit", month: "2-digit" };
  const another: any = new Date(new Date().getTime());
  const thisWeek: any = new Date(another - 7 * 24 * 60 * 60 * 1000);
  const WeekThree: any = new Date(thisWeek - 7 * 24 * 60 * 60 * 1000);
  const WeekTwo: any = new Date(WeekThree - 7 * 24 * 60 * 60 * 1000);
  const WeekOne: any = new Date(WeekTwo - 7 * 24 * 60 * 60 * 1000);

  const [Donations, setDonations] = useState<donation[]>([]);
  const [ChartData, setChartData] = useState([]);
  const [TotalDonations, setTotalDonations] = useState<number>(0);
  const [TotalFundraisers, setTotalFundraisers] = useState<number>(0);
  const [TotalMoneySent, setTotalMoneySent] = useState<number>(0);
  const [TotalMoneyReceived, setTotalMoneyReceived] = useState<number>(0);
  const [Messages, setMessages] = useState<message[]>();
  const [Loading, setLoading] = useState<boolean>(true);

  const data = {
    labels: [
      WeekOne.toLocaleDateString("fr-FR", dateoptions),
      WeekTwo.toLocaleDateString("fr-FR", dateoptions),
      WeekThree.toLocaleDateString("fr-FR", dateoptions),
      thisWeek.toLocaleDateString("fr-FR", dateoptions),
      another.toLocaleDateString("fr-FR", dateoptions),
    ],
    datasets: [
      {
        label: "Total des fonds reçus",
        data: ChartData,
        borderColor: "#22D3EE",
        backgroundColor: "#22D3EE",
      },
    ],
  };

  useEffect(() => {
    axios.get("/api/user-stats").then((response) => {
      const {
        data: {
          data,
          totalDonations,
          totalFundraisers,
          totalMoneySent,
          totalMoneyReceived,
          messages,
          lastFiveDonationsReceived,
        },
      } = response;

      setTotalDonations(totalDonations);
      setTotalFundraisers(totalFundraisers);
      setTotalMoneySent(totalMoneySent);
      setTotalMoneyReceived(totalMoneyReceived);
      setMessages(messages);
      setChartData(data);
      setLoading(false);
      setDonations(lastFiveDonationsReceived);
    });
  }, []);

  if (Loading) return null;

  return (
    <main className="text-gray-600 bg-gray-50 dashboard-main-section flex justify-center items-start overflow-y-auto overflow-x-hidden">
      <div className="w-full max-w-[1480px] grid grid-cols-6 px-3 py-8 md:px-5 md:py-10 overflow-y-auto overflow-x-hidden gap-y-10">
          
          <div className="min-w-full lg:min-w-[505px] lg:max-w-[850px] aspect-video flex-grow shadow bg-white rounded-2xl h-fit min-h-[400px] md:p-4 hidden sm:flex items-center justify-center ">
            <Line options={options} data={data} />
          </div>
          <div className="w-96 xl:w-[300px] 2xl:w-[410px] aspect-square min-w-[300px] h-full min-h-[400px] flex justify-center items-start">
            <div className="w-full ml-5 min-h-full h-full p-4 bg-white shadow rounded-2xl">
              <div className="w-full justify-between flex gap-1 items-center">
                <div className="flex items-center gap-1">
                  
                <IconContext.Provider value={{ className: "text-2xl" }}>
                  <BiMessageSquare />
                </IconContext.Provider>
                <p className="font-bold text-black text-md">Messages</p>
                </div>
                <Link to='/dashboard/messages' className="text-sm underline text-gray-700">Voir tous</Link>
              </div>
              <ul>
                {Messages?.map((item) => (
                  <li className="flex items-center my-6 space-x-2">
                    <a href="#" className="relative block">
                      <img
                        alt="profil"
                        src={
                          item.senderId?.image
                            ? `https://res.cloudinary.com/dhwfr0ywo/image/upload/${item.senderId?.image}`
                            : "/profile.png"
                        }
                        className="mx-auto object-cover rounded-full h-10 w-10 "
                      />
                    </a>
                    <div className="flex flex-col">
                      <span className="ml-2 text-sm font-semibold text-gray-900">
                        {item.senderId?.name}
                      </span>
                      <span className="ml-2 text-xs text-gray-400">
                        {item.senderId?.email}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-span-full flex flex-wrap justify-evenly gap-5">

        <div className="max-w-[330px] min-w-[260px] w-1/4 min-w-52 bg-white p-5 inline-grid grid-cols-1 shadow rounded-lg">
            <div className="stat-figure mt-2 text-yellow-500">
            <IconContext.Provider value={{ className: 'w-6 h-6 text-blue-500'}}>
                <RiProfileLine />
              </IconContext.Provider>
            </div>
            <div className="stat-title">Total des 3awenis créés</div>
            <div className="stat-value mt-2 text-2xl text-zinc-700">
              {TotalFundraisers}
            </div>
          </div>
          

          <div className="max-w-[330px] min-w-[260px] w-1/4 min-w-52 bg-white p-5 inline-grid grid-cols-1 shadow rounded-lg">
            <div className="stat-figure mt-2 text-pink-500">
              
              <IconContext.Provider value={{ className: 'w-6 h-6 text-violet-500'}}>
                <BiDonateHeart />
              </IconContext.Provider>
            </div>
            <div className="stat-title">Total des dons reçus</div>
            <div className="stat-value mt-2 text-2xl text-zinc-700">
              {TotalDonations}
            </div>
          </div>

          <div className="max-w-[330px] min-w-[260px] w-1/4 min-w-52 bg-white p-5 inline-grid grid-cols-1 shadow rounded-lg">
            <div className="stat-figure mt-2 text-secondary">
            <IconContext.Provider value={{ className: 'w-6 h-6 text-emerald-500'}}>
                <MdOutlineAttachMoney />
              </IconContext.Provider>
            </div>
            <div className="stat-title">Montant total reçu</div>
            <div className="stat-value mt-2 text-2xl text-zinc-700">
              {TotalMoneyReceived}
            </div>
          </div>


          <div className="max-w-[330px] min-w-[260px] w-1/4 min-w-52 bg-white p-5 inline-grid grid-cols-1 shadow rounded-lg">
            <div className="stat-figure mt-2 text-violet-500">
              <IconContext.Provider value={{ className: 'w-6 h-6 text-primary'}}>
                <RiSendPlaneLine />
              </IconContext.Provider>
            </div>
            <div className="stat-title">Total des fonds envoyés</div>
            <div className="stat-value mt-2 text-2xl text-zinc-700">
              {TotalMoneySent}
            </div>
          </div>
        </div>

        <div className="col-span-full">
          <div className="py-8">
            <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
              <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        bénéficiaire
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        donateur/donatrice
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        Montant
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        Message
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Donations.map((item) => (
                      <tr>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                        <Link
                      to={`/fundraisers/${item.fundraiser?._id}`}
                      className="relative w-fit min-w-fit grid grid-cols-[128px,auto] items-center gap-2 break-words"
                    >
                      <img
                        alt="profil"
                        src={
                          item.fundraiser?.image
                            ? `https://res.cloudinary.com/dhwfr0ywo/image/upload/${item.fundraiser?.image}`
                            : "/3aweni_placeholder.png"
                        }
                        className="mx-auto object-cover w-32 min-w-[128px] col-span-1 rounded-lg"
                      />
                      <strong className="text-xs text-zinc-700 col-span-1">
                        {item.fundraiser?.title}
                      </strong>
                    </Link>
                        </td>

                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p className="whitespace-nowrap">{item.user?.name}</p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p className="whitespace-nowrap">{item.amount.toLocaleString()} TND</p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap max-w-sm">
                            {item.message}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p className="text-gray-900 whitespace-nowrap">
                            {calculateTimeAgo(item.createdAt)}
                          </p>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td
                        colSpan={5}
                        className="px-5 py-5 text-sm text-center bg-white border-b border-gray-200"
                      >
                        <Link
                          to="/dashboard/received-donations?page=1"
                          className="text-zinc-700 font-bold hover:underline text-sm self-end"
                        >
                          Voir tous
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
    </main>
  );
}
