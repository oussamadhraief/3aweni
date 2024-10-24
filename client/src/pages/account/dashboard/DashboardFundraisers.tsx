import axios from "../../../utils/axiosConfig";
import { useEffect, useState } from "react";
import { fundraiserInt } from "../../../utils/interfaces";
import { Link } from "react-router-dom";
import UserFundraiser from "../../../components/UserFundraiser";

interface fundraisersFullInt extends fundraiserInt {
  collectedAmount: number;
  lastDonationCreatedAt: Date;
}

  export default function DashboardFundraisers() {

  const [Fundraisers, setFundraisers] = useState<fundraisersFullInt[]>([]);
  const [Loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get(`/api/user/fundraisers`).then((res) => {
        setFundraisers(res.data.fundraisers);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  if (Loading) return null;

  return (
    <main className="text-gray-600 bg-gray-50 dashboard-main-section overflow-y-auto">
      {Fundraisers.length ? (
        <div className="container px-5 py-14 mx-auto bg-transparent">
          <div className="flex flex-wrap gap-0 md:gap-[7.5%] xl:gap-[2.5%] -m-4 bg-transparent px-3">
            {Fundraisers.map((item) => (
              //component ???
              <UserFundraiser
                id={item._id}
                image={item.image}
                title={item.title}
                goal={item.goal}
                collectedAmount={item.collectedAmount}
                lastDonationCreatedAt={item.lastDonationCreatedAt}
              />
            ))}
          </div>
        </div>
      ) : (
        <h2 className="w-full text-center mt-5">
          Pas de 3aweni trouvés.{" "}
          <Link to="/create/category" className="underline text-primary">
            Créez-en un
          </Link>
        </h2>
      )}
    </main>
  );
}
