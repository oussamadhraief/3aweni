import { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";
import { donation } from "../utils/interfaces";

export default function useDonationsFetch(
  id: string | undefined,
  pageNumber: number
) {
  const [Donations, setDonations] = useState<donation[]>([]);
  const [Loading, setLoading] = useState(true);
  const [HasMore, setHasMore] = useState(true);

  useEffect(() => {
    setLoading(true);

    axios
      .get(`/api/fundraiser-donations/${id}`, { params: { page: pageNumber } })
      .then((res) => {
        setDonations((prev) =>
          [...prev, ...res.data.donations].filter(
            (obj: donation, index: number, self: donation[]) =>
              index === self.findIndex((item) => item._id === obj._id)
          )
        );
        setHasMore(res.data.donations.length > 0);
        setLoading(false);
      });
  }, [pageNumber]);

  return { Loading, Donations, HasMore };
}
