import axios from "../../../utils/axiosConfig";
import { FormEvent, useEffect, useRef, useState } from "react";
import { IconContext } from "react-icons";
import { RiDeleteBinLine } from "react-icons/ri";
import UserImageModal from "../../../components/UserImageModal";
import { userInt } from "../../../utils/interfaces";
import useAuthContext from "../../../hooks/useAuthContext";
import useLoadingAuthContext from "../../../hooks/useLoadingAuthContext";
import { FiCheck, FiEdit2 } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

interface userInfoInt {
  name: string;
  phone: string;
}
interface userPasswordInt {
  currentPassowrd: string;
  newPassword: string;
  newPasswordConfirmation: string;
}

export default function DashboardSettings() {
  const { login } = useAuthContext();
  const { Loading } = useLoadingAuthContext();
  const { user } = useAuthContext();

  const imageUploadInputRef = useRef<HTMLInputElement>(null);
  const progressBarRef = useRef<HTMLProgressElement>(null);

  const [UserInformation, setUserInformation] = useState<userInt>({
    _id: "",
    name: "",
    image: "",
    email: "",
    phone: "",
  });
  const [UserImage, setUserImage] = useState<string | null>(null);
  const [CurrentUserImage, setCurrentUserImage] = useState<string | null>(null);
  const [UserEmail, setUserEmail] = useState<string>("");
  const [UserInfo, setUserInfo] = useState<userInfoInt>({
    name: "",
    phone: "",
  });
  const [UserPassword, setUserPassword] = useState<userPasswordInt>({
    currentPassowrd: "",
    newPassword: "",
    newPasswordConfirmation: "",
  });
  const [EditingImage, setEditingImage] = useState<boolean>(false);
  const [EditingEmail, setEditingEmail] = useState<boolean>(false);
  const [EditingInfo, setEditingInfo] = useState<boolean>(false);
  const [EditingPassword, setEditingPassword] = useState<boolean>(false);
  const [Show, setShow] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setCurrentUserImage(user.image);
      setUserEmail(user.email);
      setUserInfo({ name: user.name, phone: user.phone });
    }
  }, [Loading]);

  const handleEditingImage = () => {
    setEditingImage((prev) => !prev);
  };

  function handleImageChange(e: React.FormEvent) {
    if (imageUploadInputRef.current)
      imageUploadInputRef.current.disabled = true;
    const target = e.target as HTMLInputElement;
    const files: FileList | null = target?.files;
    const reader = new FileReader();
    reader.onload = async function () {
      if (reader.result) {
        setUserImage(reader.result as string);
        setShow(true);
      }
      if (imageUploadInputRef.current)
        imageUploadInputRef.current.disabled = false;
    };
    if (files) reader.readAsDataURL(files[0]);
  }

  const handleUpdateUserImage = async (publicId: string) => {
    try {
      await axios.patch("/api/user/image", {
        image: publicId,
      });
    } catch (error) {}
  };

  const handleDeleteUserImage = () => {
    try {
      axios.delete("/api/user/image").then(() => {
        login({
          ...user!,
          image: "",
        });

        setCurrentUserImage("");
      })
    } catch (error) {
      console.log(error);
      
    }
  };

  const handleImageUpload = async () => {
    try {
      const res = await axios.post(
        "/api/upload",
        {
          data: UserImage,
        },
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted =
              (progressEvent.loaded / progressEvent.total!) * 100;

            progressBarRef.current?.setAttribute(
              "value",
              `${percentCompleted}`
            );

            if (percentCompleted == 100) {
              // add completed
            }
          },
        }
      );

      await handleUpdateUserImage(res.data.imagePublicId);

      login({
        ...user!,
        image: res.data.imagePublicId,
      });

      setCurrentUserImage(res.data.imagePublicId);
    } catch (error) {}
  };

  const handleSetEditingEmail = () => {
    if (user) {
      setUserEmail(user?.email);
    }
    setEditingEmail(true);
    setEditingInfo(false);
    setEditingPassword(false);
  };

  const handleSetEditingInfo = () => {
    if (user) {
      setUserInfo({
        name: user.name,
        phone: user.phone,
      });
    }
    setEditingEmail(false);
    setEditingInfo(true);
    setEditingPassword(false);
  };

  const handleSetEditingPassword = () => {
    setUserPassword({
      currentPassowrd: "",
      newPassword: "",
      newPasswordConfirmation: "",
    });
    setEditingEmail(false);
    setEditingInfo(false);
    setEditingPassword(true);
  };

  const handleChangeEmail = (e: FormEvent) => {
    e.preventDefault();
    axios.patch("/api/user/email", { email: UserEmail }).then(() => {
      setEditingEmail(false);
      login({
        ...user!,
        email: UserEmail,
      });
    });
  };

  const handleChangePersonalInfo = (e: FormEvent) => {
    e.preventDefault();
    axios
      .patch("/api/user/info", { name: UserInfo.name, phone: UserInfo.phone })
      .then(() => {
        setEditingInfo(false);
        login({
          ...user!,
          name: UserInfo.name,
          phone: UserInfo.phone,
        });
      });
  };

  const handleChangePassword = (e: FormEvent) => {
    e.preventDefault();
    axios
      .patch("/api/user/password", {
        currentPassword: UserPassword.currentPassowrd,
        newPassword: UserPassword.newPassword,
        newPasswordConfirmation: UserPassword.newPasswordConfirmation,
      })
      .then(() => {
        setEditingPassword(false);
        setUserPassword({
          currentPassowrd: "",
          newPassword: "",
          newPasswordConfirmation: "",
        });
      });
  };

  return (
    <section className="dashboard-main-section w-full bg-gray-100/50 flex justify-center items-center px-2 py-10 overflow-y-auto">
      <div className="container max-w-2xl mx-auto shadow-md w-full md:w-3/4 rounded-b-lg overflow-hidden">
        <div className="p-4 border-t border-gray-200 rounded-lg bg-gray-100/5 ">
          <div className="mx-auto md:w-full md:mx-0">
            <div className="relative w-full flex items-center space-x-4 transition-all">
              <div className="relative w-fit h-fit group rounded">
                <div className="relative w-fit h-fit group rounded">
                  <img
                    alt="profil"
                    src={
                      CurrentUserImage
                        ? `https://res.cloudinary.com/dhwfr0ywo/image/upload/${CurrentUserImage}`
                        : "/profile.png"
                    }
                    className="mx-auto object-cover rounded-full h-24 w-24"
                  />
                  {/* <div className="absolute inset-0 bg-white/60 flex items-end pb-5 justify-center flex-nowrap">
                                <progress ref={progressBarRef} value={0} max={100} className='uploadToCloudinaryProgressBar' ></progress>
                            </div> */}
                </div>
              </div>
              <div className="relative flex items-center gap-3">
                <label className="bg-gray-300 px-2 py-0.5 rounded text-black whitespace-nowrap text-sm">
                  Modifer l'image
                  <input
                    type="file"
                    className="sr-only"
                    name="image"
                    ref={imageUploadInputRef}
                    onChange={handleImageChange}
                  />
                </label>
                <button
                  type="button"
                  className="text-black whitespace-nowrap"
                  onClick={handleDeleteUserImage}
                >
                  <IconContext.Provider
                    value={{ className: "text-gray-700 w-5 h-5" }}
                  >
                    <RiDeleteBinLine />
                  </IconContext.Provider>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6 bg-white">
          <div className="items-center justify-between w-full px-6 py-4 space-y-4 text-gray-500 md:flex md:space-y-0">
            <h2 className="w-fit h-fit py-2 whitespace-nowrap">
              Adresse E-mail
            </h2>
            {EditingEmail ? (
              <form
                className="flex gap-2 items-end max-w-sm md:w-full"
                onSubmit={handleChangeEmail}
              >
                <input
                  type="email"
                  
                  className="w-full h-9 flex-1 appearance-none border-b border-[#bbb] p-1 bg-white text-gray-700 placeholder-zinc-400 shadow-sm text-sm focus:outline-none"
                  placeholder="Email"
                  name="email"
                  value={UserEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
                <button className="w-fit h-fit p-1 rounded-full bg-lighter_blue">
                  <IconContext.Provider
                    value={{ className: " text-secondary" }}
                  >
                    <FiCheck />
                  </IconContext.Provider>
                </button>
                <button
                  type="button"
                  className="w-fit h-fit p-1 rounded-full bg-[#eee]"
                  onClick={() => setEditingEmail(false)}
                >
                  <IconContext.Provider value={{ className: "" }}>
                    <IoMdClose />
                  </IconContext.Provider>
                </button>
              </form>
            ) : (
              <button
                className="w-fit h-fit p-1.5 rounded-full bg-[#eee]"
                onClick={handleSetEditingEmail}
              >
                <IconContext.Provider value={{ className: "" }}>
                  <FiEdit2 />
                </IconContext.Provider>
              </button>
            )}
          </div>
          <hr />
          <div className="items-start justify-between w-full px-6 py-4 space-y-4 text-gray-500 md:flex md:space-y-0">
            <h2 className="w-fit h-fit whitespace-nowrap">
              Informations personnelles
            </h2>
            {EditingInfo ? (
              <form
                className="flex gap-2 items-center max-w-sm md:w-full"
                onSubmit={handleChangePersonalInfo}
              >
                <div className="flex flex-col gap-5 w-full">
                  <input
                    type="text"
                    
                    className="w-full h-9 flex-1 appearance-none border-b border-[#bbb] p-1 bg-white text-gray-700 placeholder-zinc-400 shadow-sm text-sm focus:outline-none"
                    placeholder="Nom et prénom"
                    name="name"
                    value={UserInfo.name}
                    onChange={(e) =>
                      setUserInfo({
                        ...UserInfo,
                        name: e.target.value,
                      })
                    }
                  />
                  <input
                    type="number"
                    
                    className="w-full h-9 flex-1 appearance-none border-b border-[#bbb] p-1 bg-white text-gray-700 placeholder-zinc-400 shadow-sm text-sm focus:outline-none"
                    placeholder="Num. de tél"
                    name="phone"
                    value={UserInfo.phone}
                    onChange={(e) =>
                      setUserInfo({
                        ...UserInfo,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>
                <button className="w-fit h-fit p-1 rounded-full bg-lighter_blue">
                  <IconContext.Provider
                    value={{ className: " text-secondary" }}
                  >
                    <FiCheck />
                  </IconContext.Provider>
                </button>
                <button
                  className="w-fit h-fit p-1 rounded-full bg-[#eee]"
                  type="button"
                  onClick={() => setEditingInfo(false)}
                >
                  <IconContext.Provider value={{ className: "" }}>
                    <IoMdClose />
                  </IconContext.Provider>
                </button>
              </form>
            ) : (
              <button
                className="w-fit h-fit p-1.5 rounded-full bg-[#eee]"
                onClick={handleSetEditingInfo}
              >
                <IconContext.Provider value={{ className: "" }}>
                  <FiEdit2 />
                </IconContext.Provider>
              </button>
            )}
          </div>
          <hr />
          <div className="items-start justify-between w-full px-6 py-4 space-y-4 text-gray-500 md:flex md:space-y-0 pb-10">
            <h2 className="w-fit h-fit whitespace-nowrap">Mot de passe</h2>
            {EditingPassword ? (
              <form
                className="flex gap-2 items-center max-w-sm md:w-full"
                onSubmit={handleChangePassword}
              >
                <div className="flex flex-col gap-5 w-full">
                  <input
                    type="password"
                    
                    className="w-full h-9 flex-1 appearance-none border-b border-[#bbb] p-1 bg-white text-gray-700 placeholder-zinc-400 shadow-sm text-sm focus:outline-none"
                    placeholder="Ancien mot de passe"
                    name="currentPassowrd"
                    value={UserPassword.currentPassowrd}
                    onChange={(e) =>
                      setUserPassword({
                        ...UserPassword,
                        currentPassowrd: e.target.value,
                      })
                    }
                  />
                  <input
                    type="password"
                    
                    className="w-full h-9 flex-1 appearance-none border-b border-[#bbb] p-1 bg-white text-gray-700 placeholder-zinc-400 shadow-sm text-sm focus:outline-none"
                    placeholder="Nouveau mot de passe"
                    name="newPassword"
                    value={UserPassword.newPassword}
                    onChange={(e) =>
                      setUserPassword({
                        ...UserPassword,
                        newPassword: e.target.value,
                      })
                    }
                  />
                  <input
                    type="password"
                    
                    className="w-full h-9 flex-1 appearance-none border-b border-[#bbb] p-1 bg-white text-gray-700 placeholder-zinc-400 shadow-sm text-sm focus:outline-none"
                    placeholder="Confirmez le nouveau mot de passe"
                    name="newPasswordConfirmation"
                    value={UserPassword.newPasswordConfirmation}
                    onChange={(e) =>
                      setUserPassword({
                        ...UserPassword,
                        newPasswordConfirmation: e.target.value,
                      })
                    }
                  />
                </div>
                <button className="w-fit h-fit p-1 rounded-full bg-lighter_blue">
                  <IconContext.Provider
                    value={{ className: " text-secondary" }}
                  >
                    <FiCheck />
                  </IconContext.Provider>
                </button>
                <button
                  type="button"
                  className="w-fit h-fit p-1 rounded-full bg-[#eee]"
                  onClick={() => setEditingPassword(false)}
                >
                  <IconContext.Provider value={{ className: "" }}>
                    <IoMdClose />
                  </IconContext.Provider>
                </button>
              </form>
            ) : (
              <button
                className="w-fit h-fit p-1.5 rounded-full bg-[#eee]"
                onClick={handleSetEditingPassword}
              >
                <IconContext.Provider value={{ className: "" }}>
                  <FiEdit2 />
                </IconContext.Provider>
              </button>
            )}
          </div>
        </div>
      </div>

      <UserImageModal
        open={Show}
        onClose={() => setShow(false)}
        Base64URL={UserImage}
        handleImageUpload={handleImageUpload}
      />
    </section>
  );
}
