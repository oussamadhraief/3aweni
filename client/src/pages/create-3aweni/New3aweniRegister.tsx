import axios from "../../utils/axiosConfig";
import { FormEvent, useState, useEffect } from "react";
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
  goal: string | undefined;
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirmation: string;
}

export default function New3aweniRegister() {
  const { login } = useAuthContext();

  const navigate = useNavigate();

  const [Form, setForm] = useState<FormState>({
    category: "",
    state: "",
    type: "",
    title: "",
    goal: undefined,
    zipCode: 0,
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    passwordConfirmation: "",
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
          "/api/create-fundraiser/register",
          {
            email: Form.email,
            password: Form.password,
            name: `${Form.lastName} ${Form.firstName}`,
            phone: Form.phone,
            category: Form.category,
            state: Form.state,
            zipCode: Form.zipCode,
            type: Form.type,
            goal: Form.goal,
            title: Form.title,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          localStorage.removeItem("create3aweni");

          const {
            data: { fundraiser },
          } = response;

          axios
            .post(
              "/api/user/login",
              {
                email: Form.email,
                password: Form.password,
              })
            .then((res) => {
              const {
                data: { user, token },
              } = res;

              localStorage.setItem("jwt", token);
              
              login(user);

              navigate(`/fundraisers/${fundraiser._id}`);
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
            <strong>Etape 4: </strong> Inscrivez vous sur la platforme 3aweni.
          </h1>
        </aside>

        <div className="w-full md:w-3/4 lg:w-2/3 h-fit min-h-screen md:min-h-screen bg-white z-10 rounded-t-[46px] md:rounded-tl-[46px] md:rounded-tr-none shadow-modern px-5 py-14 md:px-10  md:pb-10 overflow-auto md:pt-32 flex items-center flex-col justify-between">
          <div className="w-full sm:w-4/6 lg:w-3/6 min-w-full sm:min-w-[350px] flex flex-col items-center justify-center gap-8 mt-10">
            <p>
              Vous êtes déjà inscrit ?{" "}
              <Link to="/create/login" className="underline text-primary">
                Se connecter
              </Link>
            </p>

            <div className="flex w-full justify-between items-center gap-4">
              <div className="relative w-1/2">
                <input
                  type="text"
                  className="peer block w-full h-10 bg-transparent border rounded border-[#ccc] transition-all px-[15px] outline-none z-0 focus:border-primary valid:border-primary"
                  id="lastName"
                  name="lastName"
                  required
                  onChange={handleChange}
                  value={Form.lastName}
                />
                <label
                  htmlFor="lastName"
                  className="absolute peer-focus:text-xs peer-focus:-top-[7px] peer-focus:outline-none bg-white peer-focus:text-primary border-0 outline-none peer-valid:text-primary peer-valid:text-xs peer-valid:-top-[7px] peer-valid:outline-none cursor-text z-10 top-[11px] left-2 text-sm font-medium px-[2px] text-[rgb(80,80,80)] transition-all"
                >
                  Nom
                </label>
              </div>

              <div className="relative w-1/2">
                <input
                  type="text"
                  className="peer block w-full h-10 bg-transparent border rounded border-[#ccc] transition-all px-[15px] outline-none z-0 focus:border-primary valid:border-primary"
                  id="firstName"
                  name="firstName"
                  required
                  value={Form.firstName}
                  onChange={handleChange}
                />
                <label
                  htmlFor="firstName"
                  className="absolute peer-focus:text-xs peer-focus:-top-[7px] peer-focus:outline-none bg-white peer-focus:text-primary border-0 outline-none peer-valid:text-primary peer-valid:text-xs peer-valid:-top-[7px] peer-valid:outline-none cursor-text z-10 top-[11px] left-2 text-sm font-medium px-[2px] text-[rgb(80,80,80)] transition-all"
                >
                  Prénom
                </label>
              </div>
            </div>

            <div className="relative w-full">
              <input
                type="text"
                className="peer block w-full h-10 bg-transparent border rounded border-[#ccc] transition-all px-[15px] outline-none z-0 focus:border-primary valid:border-primary"
                id="phone"
                name="phone"
                required
                onChange={handleChange}
              />
              <label
                htmlFor="phone"
                className="absolute peer-focus:text-xs peer-focus:-top-[7px] peer-focus:outline-none bg-white peer-focus:text-primary border-0 outline-none peer-valid:text-primary peer-valid:text-xs peer-valid:-top-[7px] peer-valid:outline-none cursor-text z-10 top-[11px] left-2 text-sm font-medium px-[2px] text-[rgb(80,80,80)] transition-all"
              >
                Num. de tél (optionel)
              </label>
            </div>

            <div className="relative w-full">
              <input
                type="text"
                className="peer block w-full h-10 bg-transparent border rounded border-[#ccc] transition-all px-[15px] outline-none z-0 focus:border-primary valid:border-primary"
                id="email"
                name="email"
                required
                onChange={handleChange}
              />
              <label
                htmlFor="email"
                className="absolute peer-focus:text-xs peer-focus:-top-[7px] peer-focus:outline-none bg-white peer-focus:text-primary border-0 outline-none peer-valid:text-primary peer-valid:text-xs peer-valid:-top-[7px] peer-valid:outline-none cursor-text z-10 top-[11px] left-2 text-sm font-medium px-[2px] text-[rgb(80,80,80)] transition-all"
              >
                E-mail
              </label>
            </div>

            <div className="relative w-full">
              <input
                type="password"
                className="peer block w-full h-10 bg-transparent border rounded border-[#ccc] transition-all px-[15px] outline-none z-0 focus:border-primary valid:border-primary"
                id="password"
                name="password"
                required
                onChange={handleChange}
              />
              <label
                htmlFor="password"
                className="absolute peer-focus:text-xs peer-focus:-top-[7px] peer-focus:outline-none bg-white peer-focus:text-primary border-0 outline-none peer-valid:text-primary peer-valid:text-xs peer-valid:-top-[7px] peer-valid:outline-none cursor-text z-10 top-[11px] left-2 text-sm font-medium px-[2px] text-[rgb(80,80,80)] transition-all"
              >
                Mot de passe
              </label>
            </div>

            <div className="relative w-full">
              <input
                type="password"
                className="peer block w-full h-10 bg-transparent border rounded border-[#ccc] transition-all px-[15px] outline-none z-0 focus:border-primary valid:border-primary"
                id="password-confirm"
                name="password-confirm"
                required
                onChange={handleChange}
              />
              <label
                htmlFor="password-confirm"
                className="absolute peer-focus:text-xs peer-focus:-top-[7px] peer-focus:outline-none bg-white peer-focus:text-primary border-0 outline-none peer-valid:text-primary peer-valid:text-xs peer-valid:-top-[7px] peer-valid:outline-none cursor-text z-10 top-[11px] left-2 text-sm font-medium px-[2px] text-[rgb(80,80,80)] transition-all"
              >
                Confirmez le mot de passe
              </label>
            </div>
          </div>

          <div className="w-full">
            <p className="justify-self-end self-start text-gray-700 text-[13px] mb-5">
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
