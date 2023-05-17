import axios from "axios";
import { useEffect, useState } from "react";
import ReactDom from "react-dom";
import { IconContext } from "react-icons";
import { IoMdClose } from "react-icons/io";

interface Props {
  open: boolean;
  onClose: () => void;
  handleImageUpload: () => void;
  Base64URL: string | null;
}

export default function UserImageModal({ open, onClose, Base64URL, handleImageUpload }: Props) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleClick = () => {
    handleImageUpload()
    onClose()
  }

  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div
        className="w-screen fixed top-0 left-0 h-screen bg-zinc-600/70 z-[9999]"
        onClick={onClose}
      ></div>
      <div className="w-full max-w-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-fit bg-white shadow-xl flex flex-nowrap flex-col items-center justify-center gap-5 rounded-xl z-[9999] px-5 py-8">
        <button className="absolute top-1 right-2">
          <IconContext.Provider value={{ className: 'h-5 w-5 text-gray-800'}}>
              <IoMdClose />
            </IconContext.Provider>
        </button>
        <h3>Etes vous sur de enregistrer cette image ?</h3>
        <div className="relative w-fit h-fit group rounded">
          <img
            alt="profil"
            src={Base64URL || ""}
            className="mx-auto object-cover rounded-full h-28 w-28"
          />
        </div>
        <button className="bg-secondary px-3 py-1 text-white rounded-md text-sm transition-all hover:scale-105" onClick={handleClick}>Enregister</button>
      </div>
    </>,
    document.getElementById("user-image-modal")!
  );
}
