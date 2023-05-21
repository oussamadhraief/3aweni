import axios from "../utils/axiosConfig";
import { useEffect, useState } from "react";
import ReactDom from "react-dom";

interface Props {
  open: boolean;
  onClose: () => void;
  name: string | undefined;
  id: string | undefined;
}

interface ContactFormInt {
  name: string;
  email: string;
  message: string;
}

export default function ContactModal({ open, onClose, name, id }: Props) {
  const [Form, setForm] = useState<ContactFormInt>({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    axios.post(
      "/api/contact-user",
      {
        id,
        ...Form,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        
      }
    );
  };

  const handleChange = (event: React.FormEvent) => {
    const target = event.target as HTMLInputElement;

    setForm({
      ...Form,
      [target.name]: target.value,
    });
  };

  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div
        className="w-screen fixed top-0 left-0 h-screen bg-zinc-600/70 z-[9999]"
        onClick={onClose}
      ></div>
      <div className="w-full max-w-xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-fit bg-white shadow-xl flex flex-nowrap items-end justify-center gap-3 rounded-xl z-[9999]">
        <section className="p-6 w-full">
          <form
            onSubmit={handleSubmit}
            className="container w-full max-w-xl p-8 flex flex-col mx-auto space-y-6 rounded-md"
          >
            <h2 className="w-full text-3xl font-bold leading-tight text-center">
              Contactez {name}
            </h2>
            <div>
              <label htmlFor="name" className="block mb-1 ml-1">
                Nom et prénom
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Nom et prénom"
                required
                value={Form.name}
                onChange={handleChange}
                className="block w-full p-2 rounded focus:outline-none border border-zinc-400 placeholder:text-zinc-600 placeholder:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 ml-1">
                Adresse E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Adresse E-mail"
                required
                value={Form.email}
                onChange={handleChange}
                className="block w-full p-2 rounded focus:outline-none border border-zinc-400 placeholder:text-zinc-600 placeholder:text-sm"
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-1 ml-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Message.."
                value={Form.message}
                onChange={handleChange}
                className="block w-full h-32 resize-none p-2 rounded autoexpand focus:outline-none border border-zinc-400 placeholder:text-zinc-600 placeholder:text-sm"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2.5 rounded shadow focus:outline-none bg-secondary text-white uppercase text-sm"
              >
                envoyer
              </button>
            </div>
          </form>
        </section>
      </div>
    </>,
    document.getElementById("contact-modal")!
  );
}
