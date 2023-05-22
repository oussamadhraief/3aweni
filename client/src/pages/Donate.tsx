import axios from "../utils/axiosConfig";
import { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { IconContext } from "react-icons";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fundraiserInt } from "../utils/interfaces";

interface donation { 
  amount: string;
  tip: string;
  incognito: boolean;
  message: string;
}

export default function Donate() {
  const { id } = useParams();

  const [Fundraiser, setFundraiser] = useState<fundraiserInt>({
    _id: "",
    category: "",
    state: "",
    zipCode: 0,
    type: "",
    description: "",
    goal: "",
    user: null,
    image: null,
    title: "",
    secondaryImages: [],
    secondaryVideos: [],
    createdAt: null,
    updatedAt: null,
  });
  const [Loading, setLoading] = useState<boolean>(true);
  const [Donation, setDonation] = useState<donation>({ 
    amount: '',
    tip: '',
    incognito: false,
    message: "" 
  });
  const [Show, setShow] = useState(false);

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/fundraiser/${id}`, {
          withCredentials: true,
        })
        .then((response) => {
          const {
            data: { fundraiser },
          } = response;

          setFundraiser(fundraiser);
          setLoading(false);
        });
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    try {
      const res = await axios.post(`/api/konnect-gateway/${id}`, {
        ...Donation,
        amount: parseFloat(Donation.amount),
        tip: Show ? parseFloat(Donation.tip) :  0,
        incognito: Donation.incognito ? '1' : '0'
      });

      const {
        data: {
          response: { payUrl },
        },
      } = res;
      window.location.href = payUrl;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="mt-[94px] flex justify-center items-center px-3 py-14 md:p-14 bg-beige">
      <form className="w-full h-full sm:w-[500px] flex flex-col items-start bg-white text-sm p-8 rounded-xl" onSubmit={handleSubmit}>
        <Link
          to={`/fundraisers/${id}`}
          className="p-1.5 rounded-md border border-zinc-400 mb-8 hover:bg-zinc-100"
        >
          &#10094; Retourner vers le 3aweni
        </Link>
        <div className="flex items-start gap-2">
          {Fundraiser.image && (
            <div className="w-32 rounded-md overflow-hidden">
              <img
                src={`https://res.cloudinary.com/dhwfr0ywo/image/upload/${Fundraiser.image}`}
                alt=""
                className="object-cover object-center w-full"
              />
            </div>
          )}
          <div className="flex flex-col">
            <p className="text-xs">
              Vous allez supporter <strong>{Fundraiser.title}</strong>{" "}
            </p>
            <p className="text-xs">
              Votre don bénéficiera à <strong>{Fundraiser.user?.name}</strong>
            </p>
          </div>
        </div>
        <div className="w-full my-5">
          <label htmlFor="goal" className="text-base">
            Saisissez votre don
          </label>
          <label className="input-group">
            <CurrencyInput
              id="goal"
              name="goal"
              placeholder="1,000,000"
              defaultValue={""}
              decimalsLimit={2}
              maxLength={7}
              allowNegativeValue={false}
              value={Donation.amount}
              onValueChange={(value) => {
                const newValue = value as string;

                setDonation({
                  ...Donation,
                  amount: newValue
                });
              }}
              className="w-full outline-none border h-10 px-1 border-secondary placeholder:text-sm placeholder:text-zinc-400"
            />
            <span className="bg-secondary text-white"> TND</span>
          </label>
        </div>

        {!Show && (
          <>
            <p className="text-zinc-60 mt-5">
              Les sevices de 3aweni sont gratuits. Un simple don peut nous aider
              à améliorer nos services
            </p>
            <button
              type="button"
              className="font-bold underline mt-1 mb-5 text-secondary"
              onClick={() => setShow(true)}
            >
              Faire un don à l'équipe 3aweni
            </button>
          </>
        )}
        <div
          className={`w-full ${
            Show ? "max-h-[500px] opacity-1 mt-7" : "max-h-0 opacity-0"
          } transition-all duration-500`}
        >
          <label htmlFor="goal" className="text-sm">
            Saisissez votre don à l'équipe 3aweni
          </label>
          <label className="input-group">
            <CurrencyInput
              id="goal"
              name="goal"
              placeholder="1,000,000"
              defaultValue={""}
              decimalsLimit={2}
              maxLength={7}
              allowNegativeValue={false}
              value={Donation.tip}
              onValueChange={(value) => {
                const newValue = value as string;

                setDonation({
                  ...Donation,
                  tip: newValue
                });
              }}
              className="w-full outline-none border h-10 px-1 border-secondary placeholder:text-sm placeholder:text-zinc-400"
            />
            <span className="bg-secondary text-white"> TND</span>
          </label>
        </div>
        {Show && (
          <button
            type="button"
            className="underline mt-1 mb-8"
            onClick={() => setShow(false)}
          >
            Je ne veux plus faire de don à 3aweni
          </button>
        )}
        <label className="w-full  my-5">
          Que voulez vous dire à {Fundraiser.user?.name}
          <textarea
            name="message"
            cols={50}
            rows={5}
            value={Donation.message}
            onChange={(e) => setDonation({ ...Donation, message: e.target.value })}
            className="w-full h-32 outline-none border border-[#ccc] rounded-md"
          ></textarea>
        </label>
        <div className="w-full flex items-center justify-start gap-1 my-5">
          <label className="w-fit flex gap-1 items-center text-sm">
            <input type="checkbox" name="incognito" checked={Donation.incognito} onChange={(e) => setDonation({...Donation, incognito: e.target.checked }) } />
            Ne pas afficher mon nom
          </label>
          <span>
            <IconContext.Provider
              value={{ className: "text-secondary text-base" }}
            >
              <AiOutlineInfoCircle />
            </IconContext.Provider>
          </span>
        </div>
        <div className="w-full border px-3 py-5 rounded-xl border-zinc-300">
          <h3 className="font-bold">Votre don</h3>
          <div className="w-full flex justify-between items-center mt-3">
            <p>Votre don</p>
            {Donation.amount ? <p>{parseFloat(Donation.amount).toFixed(2)} TND</p> :  <p>{(0).toFixed(2)} TND</p> }
          </div>
          <div className="w-full flex justify-between items-center mt-3">
            <p>Don pour l'équipe 3aweni</p>
            {Donation.tip ? <p>{parseFloat(Donation.tip).toFixed(2)} TND</p> :  <p>{(0).toFixed(2)} TND</p> }
          </div>
          <div className="w-full flex justify-between items-center mt-3 pt-3 border-t border-zinc-400">
            <p>Total à payer</p>
            {Donation.amount ? Donation.tip ? <p className="text-base">{(parseFloat(Donation.amount) + parseFloat(Donation.tip)).toFixed(2)} TND</p> : <p>{parseFloat(Donation.amount).toFixed(2)} TND</p> :  <p>{(0).toFixed(2)} TND</p> }
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-secondary hover:bg-primary text-white transition ease-in duration-200 text-center text-sm uppercase rounded-lg mt-8"
        >
          Payer
        </button>
        <p className="text-zinc-600 mt-5">En cliquant sur payer, vous acceptez <Link to='/' className="underline">les conditions</Link>  de 3aweni.</p>
        <p className="text-zinc-600">En savoir plus sur <Link to='/' className="underline">les prix et les frais</Link>.</p>
      </form>
    </main>
  );
}
