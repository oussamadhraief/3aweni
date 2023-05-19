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
import UserDonations from "../../../components/UserDonations";
import { IconContext } from "react-icons";
import { BiMessageSquare } from "react-icons/bi";
import { message } from "../../../utils/interfaces";

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
      text: "Nouvelles 3awenis créées durant les derniers 28 jours",
    },
  },
};

export default function DashboardStats() {
  var dateoptions = { year: "numeric", month: "long", day: "numeric" };
  const another: any = new Date(new Date().getTime());
  const thisWeek: any = new Date(another - 7 * 24 * 60 * 60 * 1000);
  const WeekThree: any = new Date(thisWeek - 7 * 24 * 60 * 60 * 1000);
  const WeekTwo: any = new Date(WeekThree - 7 * 24 * 60 * 60 * 1000);
  const WeekOne: any = new Date(WeekTwo - 7 * 24 * 60 * 60 * 1000);

  const [ChartData, setChartData] = useState([]);
  const [TotalDonations, setTotalDonations] = useState<number>(0);
  const [TotalFundraisers, setTotalFundraisers] = useState<number>(0);
  const [TotalMoneySent, setTotalMoneySent] = useState<number>(0);
  const [TotalMoneyReceived, setTotalMoneyReceived] = useState<number>(0);
  const [Messages, setMessages] = useState<message[]>();

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
        label: "Nouvelles 3awenis créées",
        data: ChartData,
        borderColor: "#F46752",
        backgroundColor: "#F46752",
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
          messages
        },
      } = response;

      setTotalDonations(totalDonations);
      setTotalFundraisers(totalFundraisers);
      setTotalMoneySent(totalMoneySent);
      setTotalMoneyReceived(totalMoneyReceived);
      setMessages(messages)
      setChartData(data);
    });
  }, []);

  return (
    <main className="text-gray-600 bg-gray-50 dashboard-main-section flex justify-center items-start overflow-auto">
      <div className="w-full max-w-[1480px] grid grid-cols-6 p-10 overflow-y-auto gap-y-10">

      <div className="col-span-3 shadow bg-white rounded-2xl h-fit min-h-full p-4 flex items-center justify-center  ">
        <Line options={options} data={data} />
      </div>
      <div className="col-span-3 h-full min-h-[400px] flex justify-center items-start">
        <div className="w-8/12 min-h-full h-full p-4 bg-white shadow rounded-2xl">
          <div className="flex gap-1 items-center">
            <IconContext.Provider value={{ className: "text-2xl" }}>
              <BiMessageSquare />
            </IconContext.Provider>
            <p className="font-bold text-black text-md">Messages</p>
          </div>
          <ul>
            {Messages?.map(item => 
            <li className="flex items-center my-6 space-x-2">
              <a href="#" className="relative block">
                <img
                  alt="profil"
                  src={item.senderId?.image ? `https://res.cloudinary.com/dhwfr0ywo/image/upload/${item.senderId?.image}` :  "/profile.png"}
                  className="mx-auto object-cover rounded-full h-10 w-10 "
                />
              </a>
              <div className="flex flex-col">
                <span className="ml-2 text-sm font-semibold text-gray-900">
                  {item.senderId?.name}
                </span>
                <span className="ml-2 text-sm text-gray-400">
                  {item.senderId?.email}
                </span>
              </div>
            </li>
            )}
          </ul>
        </div>
      </div>

      <div className="col-span-full flex justify-center">
        <div className="w-full stats shadow h-fit">
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Total money received</div>
              <div className="stat-value text-2xl text-zinc-700">{TotalMoneyReceived}</div>
              <div className="stat-desc">Jan 1st - Feb 1st</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-yellow-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Total fundraisers created</div>
              <div className="stat-value text-2xl text-zinc-700">{TotalFundraisers}</div>
              <div className="stat-desc">Jan 1st - Feb 1st</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-pink-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Total donations received</div>
              <div className="stat-value text-2xl text-zinc-700">{TotalDonations}</div>
              <div className="stat-desc">↗︎ 400 (22%)</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-violet-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Total money spent</div>
              <div className="stat-value text-2xl text-zinc-700">{TotalMoneySent}</div>
              <div className="stat-desc">↘︎ 90 (14%)</div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-full">
        <UserDonations ShowAll={false} />
      </div>
      </div>

    </main>
  );
}
