import axios from "../../../utils/axiosConfig";
import { useEffect, useState } from "react";
import { message } from "../../../utils/interfaces";
import MessageModal from "../../../components/MessageModal";

export default function DashboardMessages() {
  const [Messages, setMessages] = useState<message[]>([]);
  const [MessageToReadIndex, setMessageToReadIndex] = useState(0)
  const [Open, setOpen] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    axios.get("/api/received-messages/0").then((res) => {
      setMessages(res.data.messages);
    });
  }, []);

  const updateMessage = () => {
    let messages = [...Messages]
    let message = {
      ...Messages[MessageToReadIndex],
      seen: true
    }
    messages[MessageToReadIndex] = message
    setMessages(messages)
  }

  return (
    <main className="dashboard-main-section flex flex-col justify-between bg-gray-100  overflow-hidden">
      <div className="h-full px-5 py-10 overflow-y-auto gap-5 grid grid-cols-4 grid-rows-[112px]">
        {Messages.map((item,index) => (
            <button className={`col-span-1 relative h-28 flex items-center p-6 rounded-lg shadow cursor-pointer text-sm ${item.seen ? 'bg-white' : " bg-lighter_blue after:absolute after:top-2 after:right-2 after:w-2 after:h-2 after:rounded-full after:bg-secondary"}`} onClick={() => {
              setOpen(true)
              setMessageToReadIndex(index)
              }}>
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

      <div className="w-full h-20 self-end">content</div>
      <MessageModal open={Open} onClose={() => setOpen(false)} message={Messages[MessageToReadIndex]} updateMessage={() => updateMessage()} />
    </main>
  );
}
