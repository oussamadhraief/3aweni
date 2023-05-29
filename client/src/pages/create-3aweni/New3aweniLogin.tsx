import axios from "../../utils/axiosConfig";
import { FormEvent, useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";

interface FormState {
  category: string;
  state: string;
  zipCode: number;
  type: string;
  title: string;
  goal: string;
  email: string;
  password: string;
}

export default function New3aweniRegister() {

  const { login } = useAuthContext()
  const navigate = useNavigate()

  const [Form, setForm] = useState<FormState>({
    category: "",
    state: "",
    type: "",
    title: "",
    goal: "",
    zipCode: 0,
    email: "",
    password: "",
  });

  useEffect(() => {
    const session3aweni = sessionStorage.getItem("create3aweni");
    if (session3aweni) {
      const res = JSON.parse(session3aweni);

      if (
        res.category &&
        res.state &&
        res.zipCode &&
        res.type &&
        res.title &&
        res.goal
      ) {
        setForm({
          ...Form,
          category: res.category,
          state: res.state,
          zipCode: parseInt(res.zipCode),
          type: res.type,
          title: res.title,
          goal: res.goal,
        });
      } else {
        navigate("/create/category");
      }
    } else {
      navigate("/create/category");
    }
  }, []);

  const handleChange = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;

    setForm({
      ...Form,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      axios
        .post(
          "/api/user/login",
          {
            email: Form.email,
            password: Form.password,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          const {
            data: { user, token },
          } = res;

          localStorage.setItem("jwt", token);
          
          login(user);
          const goal = parseFloat(Form.goal);
          axios
          .post(
            "/api/create-fundraiser",
            {
              ...Form,
              goal,
            },
            {
              headers: {
                "Authorization": `Bearer ${token}`
              }
            })
          .then((response) => {
            localStorage.removeItem('create3aweni')
  
            const {
              data: { fundraiser },
            } = response;
  
            navigate(`/fundraisers/${fundraiser._id}`);
          })
          .catch((error) => {
            console.log(error);
          });
        });
    } catch (error) {}
  };

  return (
    <main className="relative w-fit h-fit min-w-[100vw] min-h-screen overflow-visible flex flex-nowrap items-start bg-beige">
      <Link to="/" className="w-10 md:w-14 absolute left-10 top-10 z-50">
        <img src="/icon.png" alt="" />
      </Link>

      <form
        onSubmit={handleSubmit}
        className="w-fit h-fit min-w-[100vw] min-h-screen overflow-hidden items-start relative flex flex-wrap md:flex-nowrap shrink-0"
      >
        <aside className="w-full md:w-1/4 lg:w-1/3 h-fit min-h-fit md:min-h-screen px-5  bg-beige create-aside-background relative flex justify-center">
          <h1 className="mt-40 mb-24 text-sm lg:text-base">
            <strong>Etape 4: </strong> Connectez vous à votre compte.
          </h1>
        </aside>

        <div className="w-full md:w-3/4 lg:w-2/3 h-fit min-h-screen md:min-h-screen bg-white z-10 rounded-t-[46px] md:rounded-tl-[46px] md:rounded-tr-none shadow-modern px-5 py-14 md:px-10  md:pb-10 overflow-auto md:pt-32 flex items-center flex-col justify-between">
        <div className="w-full sm:w-4/6 lg:w-3/6 min-w-full sm:min-w-[350px] flex flex-col items-center justify-center mt-10">
            <label htmlFor="email" className="text-gray-700 w-fit self-start">
              Adresse Email:
            </label>

            <input
              type="text"
              className="peer block w-full h-10 bg-transparent border  border-[#ccc] px-1 rounded outline-none z-0 focus:border-primary valid:border-primary text-sm"
              name="email"
              id="email"
              required
              value={Form.email}
              onChange={handleChange}
            />

            <div className="relative w-full flex justify-between items-center mt-8">
              <label htmlFor="password" className="text-gray-700">
                Mot de passe:
              </label>
              <Link
                to="/password-reset"
                className="hover:underline text-gray-600 hover:text-gray-800 text-sm"
              >
                Mot de passe oublié ?
              </Link>
            </div>
            <input
              type="password"
              className="peer block w-full h-10 bg-transparent border  border-[#ccc] px-1 rounded outline-none z-0 focus:border-primary valid:border-primary mb-8"
              name="password"
              id="password"
              required
              value={Form.password}
              onChange={handleChange}
            />

            <p>
              Vous n'êtes pas déjà inscrit ?{" "}
              <Link to="/create/register" className="underline text-primary">
                S'inscrire
              </Link>
            </p>
          </div>

          <div className="w-full flex flex-col gap-5">
            <p className="justify-self-end self-start text-gray-700 text-[13px]">
              By continuing, you agree to the 3aweni{" "}
              <Link to="terms" className="underline">
                terms
              </Link>{" "}
              and{" "}
              <Link to="privacy" className="underline">
                privacy notice
              </Link>
              .
            </p>

            <div className="w-full flex justify-between items-center">
              <Link to="/create/goal" className="font-medium h-6 w-6">
                <IconContext.Provider
                  value={{ className: " text-gray-700 h-6 w-6" }}
                >
                  <HiOutlineArrowNarrowLeft />
                </IconContext.Provider>
              </Link>

              <button
                type="submit"
                className="w-fit h-fit px-6 py-3 bg-primary rounded shadow-form text-white flex items-center font-medium gap-1 self-end"
              >
                {" "}
                Créer mon 3aweni{" "}
              </button>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
