import axios from "axios";
import { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { useNavigate, useParams } from "react-router-dom";

export default function Donate() {

  const { id } = useParams();
  const navigate = useNavigate()

  const [Donation, setDonation] = useState<string>("")

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
        axios.post(
            `/api/create-donation/${id}`,
            {
              donation: Donation,
            },
            {
              withCredentials: true,
            }
          )
        
          navigate(`/fundraisers/${id}`)
        
    } catch (error) {
        
    }
    
  };

  return (
    <main className="mt-[94px] flex justify-center items-center pt-32 pb-52">
      <div className="flex flex-col w-full min-w-[400px] max-w-[460px] px-4 py-8 bg-white rounded-lg shadow sm:px-6 md:px-8 lg:px-10">
        <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-[21px]">
          Connectez-vous à votre compte
        </div>
        <div className="mt-8">
          <form onSubmit={handleSubmit}>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="goal" className="text-sm">
                Objectif
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
                  value={Donation}
                  onValueChange={(value) => {
                    const newValue = value as string;

                    setDonation(newValue);
                  }}
                  className="w-full outline-none border h-10 px-1 border-[#ccc] placeholder:text-sm placeholder:text-zinc-400"
                />
                <span> TND</span>
              </label>
            </div>
            <div className="flex w-full mt-8">
              <button
                type="submit"
                className="py-2 px-4 bg-primary hover:bg-secondary text-white w-full transition ease-in duration-200 text-center text-sm uppercase shadow-md rounded-lg "
              >
                Payer
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
