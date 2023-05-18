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
import axios from "axios";

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
        borderColor: "#007188",
        backgroundColor: "#007188",
      },
    ],
  };

  useEffect(() => {
    axios.get("/api/chart-fundraisers").then((response) => {
      const {
        data: {
          data,
          totalDonations,
          totalFundraisers,
          totalMoneySent,
          totalMoneyReceived,
        },
      } = response;
      
      setTotalDonations(totalDonations)
      setTotalFundraisers(totalFundraisers)
      setTotalMoneySent(totalMoneySent)
      setTotalMoneyReceived(totalMoneyReceived)

      setChartData(data);
    });
  }, []);

  return (
    <main className="text-gray-600 bg-gray-50 dashboard-main-section grid grid-cols-6 p-10">
      <div className="col-span-3 shadow bg-white rounded-2xl h-fit p-4">
        <Line options={options} data={data} />
      </div>
      <div className="col-span-3 flex justify-center items-start">
        <div className="w-8/12 p-4 bg-white shadow rounded-2xl">
          <p className="font-bold text-black text-md">Messages</p>
          <ul>
            <li className="flex items-center my-6 space-x-2">
              <a href="#" className="relative block">
                <img
                  alt="profil"
                  src="/images/person/1.jpg"
                  className="mx-auto object-cover rounded-full h-10 w-10 "
                />
              </a>
              <div className="flex flex-col">
                <span className="ml-2 text-sm font-semibold text-gray-900">
                  Charlie Rabiller
                </span>
                <span className="ml-2 text-sm text-gray-400">
                  Hey John ! Do you read the NextJS doc ?
                </span>
              </div>
            </li>
            <li className="flex items-center my-6 space-x-2">
              <a href="#" className="relative block">
                <img
                  alt="profil"
                  src="/images/person/5.jpg"
                  className="mx-auto object-cover rounded-full h-10 w-10 "
                />
              </a>
              <div className="flex flex-col">
                <span className="ml-2 text-sm font-semibold text-gray-900">
                  Marie Lou
                </span>
                <span className="ml-2 text-sm text-gray-400">
                  No I think the dog is better...
                </span>
              </div>
            </li>
            <li className="flex items-center my-6 space-x-2">
              <a href="#" className="relative block">
                <img
                  alt="profil"
                  src="/images/person/6.jpg"
                  className="mx-auto object-cover rounded-full h-10 w-10 "
                />
              </a>
              <div className="flex flex-col">
                <span className="ml-2 text-sm font-semibold text-gray-900">
                  Ivan Buck
                </span>
                <span className="ml-2 text-sm text-gray-400">
                  Seriously ? haha Bob is not a child !
                </span>
              </div>
            </li>
            <li className="flex items-center my-6 space-x-2">
              <a href="#" className="relative block">
                <img
                  alt="profil"
                  src="/images/person/7.jpg"
                  className="mx-auto object-cover rounded-full h-10 w-10 "
                />
              </a>
              <div className="flex flex-col">
                <span className="ml-2 text-sm font-semibold text-gray-900">
                  Marina Farga
                </span>
                <span className="ml-2 text-sm text-gray-400">
                  Do you need that design ?
                </span>
              </div>
            </li>
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
              <div className="stat-value">{TotalMoneyReceived}</div>
              <div className="stat-desc">Jan 1st - Feb 1st</div>
            </div>

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
              <div className="stat-title">Total fundraisers created</div>
              <div className="stat-value">{TotalFundraisers}</div>
              <div className="stat-desc">Jan 1st - Feb 1st</div>
            </div>

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
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Total donations received</div>
              <div className="stat-value">{TotalDonations}</div>
              <div className="stat-desc">↗︎ 400 (22%)</div>
            </div>

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
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Total money spent</div>
              <div className="stat-value">{TotalMoneySent}</div>
              <div className="stat-desc">↘︎ 90 (14%)</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
