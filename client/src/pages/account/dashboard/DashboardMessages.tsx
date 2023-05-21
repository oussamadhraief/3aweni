import axios from "../../../utils/axiosConfig";
import { useEffect, useState } from "react";
import { message } from "../../../utils/interfaces";

export default function DashboardMessages() {
  const [Messages, setMessages] = useState<message[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    axios
      .get("/api/received-messages/0",)
      .then((res) => {
        setMessages(res.data.messages);
      });
  }, []);

  return (
    <main className="dashboard-main-section flex flex-col justify-between bg-gray-100  overflow-hidden">
      <div className="h-full flex flex-wrap px-5 py-10 overflow-y-auto">
        {Messages.map((item) => (
          <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
            <div className="h-28 flex items-center border-gray-200 border p-4 rounded-lg bg-white">
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
            </div>
          </div>
        ))}
      </div>

      <div className="w-full h-20 self-end">content</div>
    </main>
  );
}
