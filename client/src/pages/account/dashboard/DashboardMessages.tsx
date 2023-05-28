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
            setCount(Math.ceil(count /12 ));
            setTotal(count)
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
    <main className="dashboard-main-section flex flex-col justify-between bg-gray-100  overflow-hidden  p-5">
          <h3>Total: {Total}</h3>
      <div className="h-full overflow-y-auto gap-5 grid grid-cols-4 grid-rows-[112px]">
        {Messages.map((item, index) => (
          <button
            className={`col-span-1 relative h-28 flex items-center p-6 rounded-lg shadow cursor-pointer text-sm ${
              item.seen
                ? "bg-white"
                : " bg-lighter_blue after:absolute after:top-2 after:right-2 after:w-2 after:h-2 after:rounded-full after:bg-secondary"
            }`}
            onClick={() => {
              setOpen(true);
              setMessageToReadIndex(index);
            }}
          >
            <img
              alt="team"
              className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
              src={
                item.senderId?.image
                  ? `https://res.cloudinary.com/dhwfr0ywo/image/upload/${item.senderId?.image}`
                  : "/profile.png"
              }
            />
            <div className="flex-grow">
              <h2 className="text-gray-900 title-font font-medium">
                {item.name}
              </h2>
              <p className="text-gray-500">{item.email}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center bg-transparent xs:flex-row xs:justify-between">
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
