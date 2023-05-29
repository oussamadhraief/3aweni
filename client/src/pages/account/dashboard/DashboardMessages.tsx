import axios from "../../../utils/axiosConfig";
import { useEffect, useState } from "react";
import { donation, message } from "../../../utils/interfaces";
import MessageModal from "../../../components/MessageModal";
import Pagination from "../../../components/Pagination";
import { useLocation, useNavigate } from "react-router-dom";
import queryString, { ParsedQuery } from "query-string";

export default function DashboardMessages() {
  const navigate = useNavigate();
  const location = useLocation();

  const [Total, setTotal] = useState(0);
  const [Count, setCount] = useState(0);
  const [PageNumber, setPageNumber] = useState<number | null>(null);
  const [Messages, setMessages] = useState<message[]>([]);
  const [MessageToReadIndex, setMessageToReadIndex] = useState(0);
  const [Open, setOpen] = useState(false);

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
    axios.get("/0").then((res) => {
      setMessages(res.data.messages);
    });
  }, []);

  const updateMessage = () => {
    let messages = [...Messages];
    let message = {
      ...Messages[MessageToReadIndex],
      seen: true,
    };
    messages[MessageToReadIndex] = message;
    setMessages(messages);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios
          .get("/api/received-messages", { params: { page: PageNumber } })
          .then((res) => {
            const { messages, count } = res.data;
            setMessages(messages);
            setCount(Math.ceil(count / 12));
            setTotal(count);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (PageNumber) fetchData();
  }, [PageNumber]);

  const handlePageChange = (page: number) => {
    navigate(`/dashboard/messages?page=${page}`);
  };

  return (
    <main className="dashboard-main-section flex flex-col justify-between bg-gray-100 overflow-y-auto overflow-x-hidden px-3 pb-2 pt-10 sm:p-5">
      <h3>Total: {Total}</h3>
      <div className="h-full w-full overflow-y-auto overflow-x-hidden flex justify-center items-center flex-wrap">
        {Messages.map((item, index) => (
          <button
            className={`w-full sm:1/2 md:w-[30%] xl:w-[23%] min-w-[250px] max-w-[350px] mx-2.5 mb-5 col-span-1 row-span-1 relative h-fit flex flex-col items-start p-4 rounded-lg shadow overflow-hidden cursor-pointer text-sm ${
              item.seen
                ? "bg-white"
                : " bg-lighter_blue after:absolute after:top-2 after:right-2 after:w-2 after:h-2 after:rounded-full after:bg-secondary"
            }`}
            onClick={() => {
              setOpen(true);
              setMessageToReadIndex(index);
            }}
          >
            <div className="w-full flex gap-1 items-center border-b border-secondary/30 pb-1 overflow-hidden">
              <img
                alt="team"
                className="w-10 h-10 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full"
                src={
                  item.senderId?.image
                    ? `https://res.cloudinary.com/dhwfr0ywo/image/upload/${item.senderId?.image}`
                    : "/profile.png"
                }
              />
              <div className="flex-grow flex flex-col items-start justify-start">
                <h2 className="text-gray-900 title-font font-medium">
                  {item.name}
                </h2>
                <p className="text-gray-500 text-xs h-7 line-clamp-1 leading-7 w-full break-words max-w-full text-left">
                  {item.email}
                </p>
              </div>
            </div>
            <p className="h-14 line-clamp-2 leading-7 w-full text-sm px-2 break-words text-left">{item.message}</p>
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center bg-transparent xs:flex-row xs:justify-between pt-2">
        <Pagination
          Count={Count}
          PageNumber={PageNumber as number}
          handlePageChange={handlePageChange}
        />
      </div>
      <MessageModal
        open={Open}
        onClose={() => setOpen(false)}
        message={Messages[MessageToReadIndex]}
        updateMessage={() => updateMessage()}
      />
    </main>
  );
}
