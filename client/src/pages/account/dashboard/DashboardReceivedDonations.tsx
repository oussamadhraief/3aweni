import { useEffect, useState } from "react";
import axios from "../../../utils/axiosConfig";
import { donation } from "../../../utils/interfaces";
import { Link, useNavigate, useLocation } from "react-router-dom";
import queryString, { ParsedQuery } from "query-string";
import Pagination from "../../../components/Pagination";
import { calculateTimeAgo } from "../../../utils/convertTimeToRelative";

export default function DashboardReceivedDonations() {
  const navigate = useNavigate();
  const location = useLocation();

  const [Donations, setDonations] = useState<donation[]>([]);
  const [Count, setCount] = useState(0);
  const [Total, setTotal] = useState(0);
  const [PageNumber, setPageNumber] = useState<number | null>(null);

  useEffect(() => {
    const parsed = queryString.parse(location.search) as ParsedQuery<
      string | null
    >;
    const page = parseInt(parsed.page as string);

    if (!isNaN(page)) {
      setPageNumber(page);
    } else {
      setPageNumber(1);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios
          .get("/api/received-donations", { params: { page: PageNumber } })
          .then((res) => {
            const { donations, count } = res.data;

            setDonations(donations);
            setTotal(count);
            setCount(Math.ceil(count / 10));
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (PageNumber) fetchData();
  }, [PageNumber]);

  const handlePageChange = (page: number) => {
    navigate(`/dashboard/received-donations?page=${page}`);
  };

  return (
    <main className="dashboard-main-section w-full px-4 py-8 mx-auto overflow-y-auto overflow-x-hidden">
      <h3>Total: {Total}</h3>
      <div className="w-full overflow-hidden rounded-lg shadow  border-t border-zinc-100">
        <div className="w-full min-w-full overflow-x-auto grid grid-cols-1">
          <table className="min-w-full w-fit leading-normal table-auto">
            <thead className="w-fit min-w-full">
              <tr>
                <th
                  scope="col"
                  className="px-5 py-3 text-sm font-bold w-fit text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                >
                  bénéficiaire
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 text-sm font-bold w-fit text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                >
                  donateur/donatrice
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 text-sm font-bold w-fit text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                >
                  Montant
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 text-sm font-bold w-fit text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                >
                  Message
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 text-sm font-bold w-fit text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                >
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {Donations.map((item) => (
                <tr>
                  <td className="w-fit px-5 py-5 text-sm bg-white border-b border-gray-200">
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

                  <td className="px-5 py-5 text-sm text-center bg-white border-b border-gray-200 min-w-fit">
                    {item.user ? (
                      <div className="w-full flex items-center justify-center gap-2 min-w-fit">
                        <img
                          src={
                            item.user?.image
                              ? `https://res.cloudinary.com/dhwfr0ywo/image/upload/${item.user?.image}`
                              : "/profile.png"
                          }
                          alt=""
                          className="w-8 h-8 rounded-full object-cover "
                        />
                        <p className="w-fit whitespace-nowrap">
                          {item.user?.name}
                        </p>
                      </div>
                    ) : (
                      <p>Anonyme</p>
                    )}
                  </td>
                  <td className="px-5 py-5 text-sm text-center bg-white border-b border-gray-200 whitespace-nowrap">
                    <p>{item.amount.toLocaleString()} TND</p>
                  </td>
                  <td className="px-5 py-5 text-sm text-center bg-white border-b border-gray-200">
                    <p className="text-gray-900 whitespace-no-wrap max-w-sm">
                      {item.message}
                    </p>
                  </td>
                  <td className="px-5 py-5 text-sm text-center bg-white border-b border-gray-200">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {calculateTimeAgo(item.createdAt)}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col items-center px-5 py-5 bg-white xs:flex-row xs:justify-between">
          <Pagination
            Count={Count}
            PageNumber={PageNumber as number}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </main>
  );
}
