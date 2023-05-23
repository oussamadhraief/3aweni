import axios from "../utils/axiosConfig";
import { useEffect, useState } from "react";
import ReactDom from "react-dom";
import { message } from "../utils/interfaces";
import { IconContext } from "react-icons";
import { IoMdClose } from "react-icons/io";

interface Props {
  open: boolean;
  onClose: () => void;
  message: message;
  updateMessage: () => void;
}

export default function MessageModal({ open, onClose, message, updateMessage }: Props) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";

    if (open && !message.seen) {
      axios.patch(`/api/user-message/${message._id}`).then(() => updateMessage()).catch(error => console.log(error))
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div
        className="w-screen fixed top-0 left-0 h-screen bg-zinc-600/70 z-[9999]"
        onClick={onClose}
      ></div>
      <div className="w-full max-w-xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-fit bg-white shadow-xl flex flex-col flex-nowrap items-start justify-center gap-3 rounded-xl z-[9999] p-8">
        <button className="absolute top-1 right-2" onClick={onClose}>
          <IconContext.Provider value={{ className: "h-5 w-5 text-gray-800" }}>
            <IoMdClose />
          </IconContext.Provider>
        </button>
        <div className="w-full flex items-center">
          <img
            alt="team"
            className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
            src={
              message.senderId?.image
                ? `https://res.cloudinary.com/dhwfr0ywo/image/upload/${message.senderId?.image}`
                : "/profile.png"
            }
          />
          <div className="flex-grow">
            <h2 className="text-gray-900 title-font font-medium">
              {message.name}
            </h2>
            <p className="text-gray-500">{message.email}</p>
          </div>
        </div>
        <p className="mt-7 text-zinc-600">{message.message}</p>
      </div>
    </>,
    document.getElementById("contact-modal")!
  );
}
