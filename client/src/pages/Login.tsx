import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axiosConfig";
import { FormEvent, useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import { MdAlternateEmail } from "react-icons/md";
import { IconContext } from "react-icons";

interface LoginFormInterface {
  email: string;
  password: string;
}

export default function () {
  const navigate = useNavigate();

  const { login } = useAuthContext();

  const [LoginForm, setLoginForm] = useState<LoginFormInterface>({
    email: "",
    password: "",
  });

  const handleChange = (event: FormEvent) => {
    const target = event.target as HTMLInputElement;
    setLoginForm({
      ...LoginForm,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        "/api/user/login",
        {
          email: LoginForm.email,
          password: LoginForm.password,
        },
        {}
      );

      const {
        data: { token, user },
      } = res;
      login(user); // Call the login function to set the user session
      localStorage.setItem("jwt", token); // Store the JWT token in localStorage
      navigate("/"); // Redirect to the home page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="mt-[94px] flex justify-center items-center py-14">
      <div className="flex flex-col w-11/12 sm:w-full min-w-fit sm:min-w-[400px] max-w-[460px] px-4 py-8 bg-white rounded-lg sm:px-6 md:px-8 lg:px-10">
        <div className="self-center mb-6 text-lg sm:text-xl font-light text-gray-600 sm:text-[21px]">
          Connectez-vous à votre compte
        </div>
        <div className="mt-8">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-2">
              <div className="flex relative ">
                <span className="rounded-l-md inline-flex  items-center px-2 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                  <IconContext.Provider
                    value={{ className: "w-[18px] h-[18px] text-[#6B7280]" }}
                  >
                    <MdAlternateEmail />
                  </IconContext.Provider>
                </span>
                <input
                  type="email"
                  name="email"
                  className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm h-10 outline-none"
                  required
                  value={LoginForm.email}
                  onChange={handleChange}
                  placeholder="Adresse E-mail"
                />
              </div>
            </div>
            <div className="flex flex-col mb-6">
              <div className="flex relative ">
                <span className="rounded-l-md inline-flex  items-center px-2 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    height="18"
                    width="18"
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-width="1.5"
                      stroke="#6B7280"
                      d="M18 11.0041C17.4166 9.91704 16.273 9.15775 14.9519 9.0993C13.477 9.03404 11.9788 9 10.329 9C8.67911 9 7.18091 9.03404 5.70604 9.0993C3.95328 9.17685 2.51295 10.4881 2.27882 12.1618C2.12602 13.2541 2 14.3734 2 15.5134C2 16.6534 2.12602 17.7727 2.27882 18.865C2.51295 20.5387 3.95328 21.8499 5.70604 21.9275C6.42013 21.9591 7.26041 21.9834 8 22"
                    ></path>
                    <path
                      stroke-linejoin="round"
                      stroke-linecap="round"
                      stroke-width="1.5"
                      stroke="#6B7280"
                      d="M6 9V6.5C6 4.01472 8.01472 2 10.5 2C12.9853 2 15 4.01472 15 6.5V9"
                    ></path>
                    <path
                      fill="#6B7280"
                      d="M21.2046 15.1045L20.6242 15.6956V15.6956L21.2046 15.1045ZM21.4196 16.4767C21.7461 16.7972 22.2706 16.7924 22.5911 16.466C22.9116 16.1395 22.9068 15.615 22.5804 15.2945L21.4196 16.4767ZM18.0228 15.1045L17.4424 14.5134V14.5134L18.0228 15.1045ZM18.2379 18.0387C18.5643 18.3593 19.0888 18.3545 19.4094 18.028C19.7299 17.7016 19.7251 17.1771 19.3987 16.8565L18.2379 18.0387ZM14.2603 20.7619C13.7039 21.3082 12.7957 21.3082 12.2394 20.7619L11.0786 21.9441C12.2794 23.1232 14.2202 23.1232 15.4211 21.9441L14.2603 20.7619ZM12.2394 20.7619C11.6914 20.2239 11.6914 19.358 12.2394 18.82L11.0786 17.6378C9.86927 18.8252 9.86927 20.7567 11.0786 21.9441L12.2394 20.7619ZM12.2394 18.82C12.7957 18.2737 13.7039 18.2737 14.2603 18.82L15.4211 17.6378C14.2202 16.4587 12.2794 16.4587 11.0786 17.6378L12.2394 18.82ZM14.2603 18.82C14.8082 19.358 14.8082 20.2239 14.2603 20.7619L15.4211 21.9441C16.6304 20.7567 16.6304 18.8252 15.4211 17.6378L14.2603 18.82ZM20.6242 15.6956L21.4196 16.4767L22.5804 15.2945L21.785 14.5134L20.6242 15.6956ZM15.4211 18.82L17.8078 16.4767L16.647 15.2944L14.2603 17.6377L15.4211 18.82ZM17.8078 16.4767L18.6032 15.6956L17.4424 14.5134L16.647 15.2945L17.8078 16.4767ZM16.647 16.4767L18.2379 18.0387L19.3987 16.8565L17.8078 15.2945L16.647 16.4767ZM21.785 14.5134C21.4266 14.1616 21.0998 13.8383 20.7993 13.6131C20.4791 13.3732 20.096 13.1716 19.6137 13.1716V14.8284C19.6145 14.8284 19.619 14.8273 19.6395 14.8357C19.6663 14.8466 19.7183 14.8735 19.806 14.9391C19.9969 15.0822 20.2326 15.3112 20.6242 15.6956L21.785 14.5134ZM18.6032 15.6956C18.9948 15.3112 19.2305 15.0822 19.4215 14.9391C19.5091 14.8735 19.5611 14.8466 19.5879 14.8357C19.6084 14.8273 19.6129 14.8284 19.6137 14.8284V13.1716C19.1314 13.1716 18.7483 13.3732 18.4281 13.6131C18.1276 13.8383 17.8008 14.1616 17.4424 14.5134L18.6032 15.6956Z"
                    ></path>
                  </svg>
                </span>
                <input
                  type="password"
                  name="password"
                  className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm h-10 outline-none"
                  placeholder="Mot de passe"
                  required
                  value={LoginForm.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex items-center mb-6 -mt-4">
              <div className="flex ml-auto">
                <a
                  href="#"
                  className="inline-flex text-xs font-thin text-gray-500 sm:text-sm hover:text-gray-700"
                >
                  Mot de passe oublié?
                </a>
              </div>
            </div>
            <div className="flex w-full">
              <button
                type="submit"
                className="py-2 px-4  bg-primary hover:bg-secondary text-white w-full transition ease-in duration-200 text-center text-sm uppercase shadow-md rounded-lg "
              >
                Se connecter
              </button>
            </div>
          </form>
        </div>
        <div className="flex items-center justify-center mt-6">
          <p className="text-sm">
            Vous n'êtes pas déjà inscrit ?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Créez un compte
            </Link>{" "}
          </p>
        </div>
      </div>
    </main>
  );
}
