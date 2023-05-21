import axios from "../utils/axiosConfig";
import { userInt } from "../utils/interfaces";

const getUser = ({
  login,
  logout,
  setLoading,
}: {
  login: (user: userInt) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}) => {
  setLoading(true);

  const token = localStorage.getItem("jwt");
  
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }

  axios
    .get("/api/user")
    .then((res) => {
      const {
        data: { user },
      } = res;
      console.log(user);

      if (user) {
        login(user);
      }

      setLoading(false);
    })
    .catch((error) => {
      console.log(error);

      logout();
      setLoading(false);
    });
};

export default getUser;
