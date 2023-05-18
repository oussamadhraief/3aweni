import axios from "../../../utils/axiosConfig";
import { useEffect, useRef, useState } from "react";
import { IconContext } from "react-icons";
import { RiDeleteBinLine } from "react-icons/ri";
import UserImageModal from "../../../components/UserImageModal";
import { userInt } from "../../../utils/interfaces";
import useAuthContext from "../../../hooks/useAuthContext";
import useLoadingAuthContext from "../../../hooks/useLoadingAuthContext";
import getUser from "../../../hooks/getUser";

export default function DashboardSettings() {
  const { login } = useAuthContext()
    const { Loading } = useLoadingAuthContext()
    const { user } = useAuthContext()

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
  const [EditingImage, setEditingImage] = useState<boolean>(false);
  const [Show, setShow] = useState<boolean>(false);

  useEffect(() => {
    if (user) 
        setUserInformation(user);
    
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

  const handleUpdateUserImage = async (publicId: string ) => {
    try {
        await axios.patch('/api/user/image', {
            image: publicId
        },{
            withCredentials: true
        })
    } catch (error) {
        
    }
   
  }

  const handleImageUpload = async () => {
    try {
      const res = await axios.post(
        "/api/upload",
        {
          data: UserImage,
        },
        {
          withCredentials: true,
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
    
        await handleUpdateUserImage(res.data.imagePublicId)

        login({
          ...user!,
          image: res.data.imagePublicId
        })

      setUserInformation({
        ...UserInformation,
        image: res.data.imagePublicId,
      });
    } catch (error) {}
  };

  return (
    <section className="dashboard-main-section w-full bg-gray-100/50 flex justify-center items-center">
      <div className="container max-w-2xl mx-auto shadow-md md:w-3/4 rounded-b-lg overflow-hidden">
        <div className="p-4 border-t-2 border-gray-200 rounded-lg bg-gray-100/5 ">
          <div className="mx-auto md:w-full md:mx-0">
            <div className="relative w-full flex items-center space-x-4 transition-all">
              <div className="relative w-fit h-fit group rounded">
                <div className="relative w-fit h-fit group rounded">
                  <img
                    alt="profil"
                    src={
                      UserInformation.image
                        ? `https://res.cloudinary.com/dhwfr0ywo/image/upload/${UserInformation.image}`
                        : "/profile.png "
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
                  onClick={handleEditingImage}
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
          <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
            <h2 className="max-w-sm mx-auto md:w-1/3">Account</h2>
            <div className="max-w-sm mx-auto md:w-2/3">
              <div className=" relative ">
                <input
                  type="text"
                  id="user-info-email"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Email"
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0 rounded-b-lg">
            <h2 className="max-w-sm mx-auto md:w-1/3">Personal info</h2>
            <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
              <div>
                <div className=" relative ">
                  <input
                    type="text"
                    id="user-info-name"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Name"
                  />
                </div>
              </div>
              <div>
                <div className=" relative ">
                  <input
                    type="text"
                    id="user-info-phone"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Phone number"
                  />
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="items-center w-full p-8 text-gray-500 rounded-b-lg">
            <h2 className="w-full text-left">Mot de passe</h2>
            <div className=" relative ">
              <input
                type="text"
                id="user-info-password"
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Password"
              />
            </div>
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
