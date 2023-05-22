import { IconContext } from "react-icons";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RiImageEditFill } from "react-icons/ri";
import { categories } from "../../../../utils/categoriesData";
import UploadPictureModal from "../../../../components/UploadImageModal";
import EditImageToUploadModal from "../../../../components/EditImageToUploadModal";
import axios from "../../../../utils/axiosConfig";
import { fundraiserInt } from "../../../../utils/interfaces";
import { states } from "../../../../utils/statesData";
import CurrencyInput from "react-currency-input-field";
import { FiUploadCloud } from "react-icons/fi";

export default function EditUserFundraiser() {
  const { id } = useParams();

  const navigate = useNavigate();

  const progressBarRef = useRef<HTMLProgressElement>(null);
  const imagesUploadInputRef = useRef<HTMLInputElement>(null);
  const videosUploadInputRef = useRef<HTMLInputElement>(null);

  const [EditingImage, setEditingImage] = useState<boolean>(false);
  const [UploadingSecondaryImages, setUploadingSecondaryImages] =
    useState<boolean>(false);
  const [Open, setOpen] = useState<boolean>(false);
  const [Show, setShow] = useState<boolean>(false);
  const [Loading, setLoading] = useState<boolean>(true);
  const [image, setImage] = useState<string>("");
  const [croppedImage, setCroppedImage] = useState("");
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

  const handleChange = (event: FormEvent) => {
    const target = event.target as HTMLInputElement;

    setFundraiser({
      ...Fundraiser,
      [target.name]: target.value,
    });
  };

  const handleDeleteCurrentImage = async (currentImage: string) => {
    // maybe send id of user ??????
    await axios.post(
      "/api/delete-image",
      {
        publicId: currentImage,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  const handleUpdateFundraiserImage = async (newImage: string) => {
    await axios.patch(
      `/api/fundraiser/image/${Fundraiser._id}`,
      {
        image: newImage,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  const handleUpdateFundraiserSecondaryImages = async (publicId: string) => {
    await axios.patch(
      `/api/fundraiser/secondary-images/${Fundraiser._id}`,
      {
        secondaryImages: [...Fundraiser.secondaryImages, publicId],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
  };

  const handleUpdateFundraiserSecondaryVideos = async (publicId: string) => {
    await axios.patch(
      `/api/fundraiser/secondary-videos/${Fundraiser._id}`,
      {
        secondaryVideos: [...Fundraiser.secondaryVideos, publicId],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
  };

  const handleImageUpload = async (Base64EncodedImage: string) => {
    const res = await axios.post(
      "/api/upload",
      {
        data: Base64EncodedImage,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        onUploadProgress: (progressEvent) => {
          // const percentCompleted = (progressEvent.loaded / progressEvent.total!) * 100
          // progressBarRef.current?.setAttribute('value',`${percentCompleted}`)
          // if(percentCompleted == 100) {
          //     add completed
          // }
        },
      }
    );

    return res?.data?.imagePublicId;
  };

  const handleMainImage = async (Base64EncodedImage: string) => {
    setEditingImage(true);

    const publicId = await handleImageUpload(Base64EncodedImage);

    if (Fundraiser.image)
      await Promise.all([
        handleDeleteCurrentImage(Fundraiser.image),
        handleUpdateFundraiserImage(publicId),
      ]);
    else await handleUpdateFundraiserImage(publicId);

    setFundraiser({
      ...Fundraiser,
      image: publicId,
    });
    setEditingImage(false);
  };

  function handleSecondaryImagesInput(e: React.FormEvent) {
    if (imagesUploadInputRef.current)
      imagesUploadInputRef.current.disabled = true;
    const target = e.target as HTMLInputElement;
    const files: FileList | null = target?.files;
    const reader = new FileReader();
    reader.onload = async function () {
      if (reader.result) handleUploadSecondaryImages(reader.result);
    };
    if (files) reader.readAsDataURL(files[0]);
  }

  const handleUploadSecondaryImages = async (Base64EncodedImage: any) => {
    const publicId = await handleImageUpload(Base64EncodedImage);
    await handleUpdateFundraiserSecondaryImages(publicId);

    setFundraiser((prev) => {
      return {
        ...prev,
        secondaryImages: [...prev.secondaryImages, publicId],
      };
    });
    if (imagesUploadInputRef.current)
      imagesUploadInputRef.current.disabled = false;
  };

  const handleVideoUpload = async (e: React.FormEvent) => {
    const formData = new FormData();
    const target = e.target as HTMLInputElement;

    if (target.files) formData.append("video", target.files[0]);

    const res = await axios.post("/api/upload-video", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    return res?.data?.videoPublicId;
  };
  const handleUploadSecondaryVideos = async (e: React.FormEvent) => {
    const publicId = await handleVideoUpload(e);
    await handleUpdateFundraiserSecondaryVideos(publicId);

    setFundraiser((prev) => {
      return {
        ...prev,
        secondaryVideos: [...prev.secondaryVideos, publicId],
      };
    });
    if (videosUploadInputRef.current)
      videosUploadInputRef.current.disabled = false;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const goal = parseFloat(Fundraiser.goal);

    axios.patch(`/api/fundraiser/${Fundraiser._id}`, {
      title: Fundraiser.title,
      goal: goal,
      category: Fundraiser.category,
      type: Fundraiser.type,
      state: Fundraiser.state,
      zipCode: Fundraiser.zipCode,
      description: Fundraiser.description,
    });
  };

  return (
    <main className="text-gray-600 bg-gray-100 dashboard-main-section overflow-x-auto">
      <section className="p-6">
        <button onClick={() => navigate("/dashboard/fundraisers")}>
          <IconContext.Provider value={{ className: " text-gray-700 h-6 w-6" }}>
            <HiOutlineArrowNarrowLeft />
          </IconContext.Provider>
        </button>
        <div className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid">
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="font-medium">Modifiez votre 3aweni</p>
              <p className="text-xs">
                Modifiez les informations relatives à votre funraiser (image,
                titre, description...)
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3"
            >
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="title" className="text-sm">
                  Titre
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Titre"
                  value={Fundraiser.title}
                  onChange={handleChange}
                  className="w-full rounded-md outline-none text-sm h-9 px-1"
                />
              </div>
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
                    value={Fundraiser.goal}
                    onValueChange={(value) => {
                      const newValue = value as string;
                      setFundraiser({
                        ...Fundraiser,
                        goal: newValue,
                      });
                    }}
                    className="w-full outline-none border-0 h-10 px-1 border-[#ccc] placeholder:text-sm placeholder:text-zinc-400"
                  />
                  <span> TND</span>
                </label>
              </div>

              <div className="col-span-full sm:col-span-3">
                <label htmlFor="category" className="text-sm">
                  Categorie
                </label>
                <select
                  onChange={handleChange}
                  id="category"
                  name="category"
                  placeholder="Categorie"
                  className="block w-full h-9 text-sm text-gray-900 rounded-lg outline-none"
                >
                  {categories.map((item) => (
                    <option
                      value={item.value}
                      selected={item.value === Fundraiser.category}
                    >
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="type" className="text-sm">
                  Type
                </label>
                <select
                  onChange={handleChange}
                  id="type"
                  name="type"
                  placeholder="Categorie"
                  className="block w-full h-9 text-sm text-gray-900 rounded-lg outline-none"
                >
                  <option value="Forme" selected={Fundraiser.type === "Forme"}>
                    Pour moi
                  </option>

                  <option
                    value="Forsomeone"
                    selected={Fundraiser.type === "Forsomeone"}
                  >
                    Pour quelqu'un d'autre
                  </option>
                </select>
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="state" className="text-sm">
                  State
                </label>
                <select
                  onChange={handleChange}
                  id="state"
                  name="state"
                  placeholder="State"
                  className="block w-full h-9 text-sm text-gray-900 rounded-lg outline-none"
                >
                  {states.map((item) => (
                    <option
                      value={item.value}
                      selected={item.value === Fundraiser.state}
                    >
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="zipCode" className="text-sm">
                  Code zip
                </label>
                <input
                  id="zipCode"
                  name="zipCode"
                  type="text"
                  placeholder="Code zip"
                  value={Fundraiser.zipCode}
                  onChange={handleChange}
                  className="w-full rounded-md outline-none text-sm h-9 px-1"
                />
              </div>
              <div className="col-span-full">
                <label htmlFor="description" className="text-sm">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Description"
                  value={Fundraiser.description}
                  onChange={handleChange}
                  className="w-full rounded-md outline-none text-sm h-40 p-1"
                ></textarea>
              </div>
              <div className="col-span-full flex justify-end">
                <button className="w-fit h-fit px-4 py-1.5 rounded bg-primary text-white hover:-translate-y-1 transition-all text-sm">
                  Sauvegarder
                </button>
              </div>
            </form>
          </fieldset>
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="font-medium">
                Ajoutez des images et des vidéos à votre 3aweni
              </p>
              <p className="text-xs">
                C'est optionnel, mais cela pourrait rendre votre 3aweni plus
                accessible
              </p>
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full grid grid-cols-6 gap-4">
                <div className="relative col-span-full sm:col-span-3 aspect-[7/4] rounded-md overflow-hidden">
                  {Loading ? (
                    <div className="w-full h-full bg-gray-300 animate-pulse"></div>
                  ) : (
                    <>
                      <img
                        className="object-cover object-center w-full"
                        src={
                          Fundraiser.image
                            ? `https://res.cloudinary.com/dhwfr0ywo/image/upload/${Fundraiser.image}`
                            : "/3aweni_placeholder.png"
                        }
                        alt="content"
                      />
                      {EditingImage && (
                        <div className="absolute inset-0 bg-white/60 flex items-end pb-5 justify-center flex-nowrap">
                          <progress
                            ref={progressBarRef}
                            value={0}
                            max={100}
                            className="w-[96%] ml-[2%] h-2 overflow-hidden rounded bg-secondary/10 [&::-webkit-progress-bar]:bg-secondary/10 [&::-webkit-progress-value]:bg-secondary [&::-moz-progress-bar]:bg-secondary"
                          ></progress>
                        </div>
                      )}
                      <button
                        className="absolute top-1 right-1 bg-white p-1 rounded-full shadow-modern"
                        type="button"
                        onClick={() => setOpen(true)}
                      >
                        <IconContext.Provider
                          value={{
                            className: " text-gray-700 h-[18px] w-[18px]",
                          }}
                        >
                          <RiImageEditFill />
                        </IconContext.Provider>
                      </button>
                    </>
                  )}
                </div>
              </div>
              <h3 className="col-span-full text-sm">
                Images supplémentaires &#10088;4 au maximum&#10089;
              </h3>
              <div className="col-span-full">
                <div className="w-fit flex flex-wrap items-center justify-start gap-3">
                  {Loading ? (
                    <>
                      <div className="w-40 h-40 bg-gray-300 animate-pulse"></div>
                      <div className="w-40 h-40 bg-gray-300 animate-pulse"></div>
                      <div className="w-40 h-40 bg-gray-300 animate-pulse"></div>
                      <div className="w-40 h-40 bg-gray-300 animate-pulse"></div>
                    </>
                  ) : (
                    <>
                      {Fundraiser.secondaryImages.map((item) => (
                        <div className="relative max-w-[288px] h-40 rounded overflow-hidden flex items-center justify-center">
                          <img
                            className="object-cover object-center max-w-full max-h-full self-center"
                            src={`https://res.cloudinary.com/dhwfr0ywo/image/upload/${item}`}
                            alt="content"
                          />
                        </div>
                      ))}
                    </>
                  )}
                  {Fundraiser.secondaryImages.length < 4 && (
                    <label className="relative w-24 h-40 text-3xl border border-secondary cursor-pointer rounded flex items-center justify-center">
                      <input
                        ref={imagesUploadInputRef}
                        type="file"
                        className="sr-only"
                        onChange={handleSecondaryImagesInput}
                      />
                      <IconContext.Provider
                        value={{ className: "text-secondary h-6 w-6" }}
                      >
                        <FiUploadCloud />
                      </IconContext.Provider>
                    </label>
                  )}
                </div>
              </div>
              <h3 className="col-span-full text-sm">
                Vidéos supplémentaires &#10088;2 au maximum&#10089;
              </h3>
              <div className="col-span-full">
                <div className="w-fit flex flex-wrap items-center justify-start gap-3">
                  {Loading ? (
                    <>
                      <div className="w-40 h-40 bg-gray-300 animate-pulse"></div>
                      <div className="w-40 h-40 bg-gray-300 animate-pulse"></div>
                      <div className="w-40 h-40 bg-gray-300 animate-pulse"></div>
                      <div className="w-40 h-40 bg-gray-300 animate-pulse"></div>
                    </>
                  ) : (
                    Fundraiser.secondaryVideos.map((item) => (
                      <video
                        controls
                        muted
                        loop
                        className="relative max-w-[288px] h-40 rounded overflow-hidden flex items-center justify-center"
                      >
                        <source
                          className="object-cover object-center max-h-full max-w-full"
                          src={`https://res.cloudinary.com/dhwfr0ywo/video/upload/${item}`}
                        />
                      </video>
                    ))
                  )}
                  {Fundraiser.secondaryVideos.length < 2 && (
                    <label className="relative w-24 h-40 text-3xl border border-secondary cursor-pointer rounded flex items-center justify-center">
                      <input
                        ref={videosUploadInputRef}
                        type="file"
                        accept="video/mp4"
                        className="sr-only"
                        onChange={handleUploadSecondaryVideos}
                      />
                      <IconContext.Provider
                        value={{ className: "text-secondary h-6 w-6" }}
                      >
                        <FiUploadCloud />
                      </IconContext.Provider>
                    </label>
                  )}
                </div>
              </div>
            </div>
          </fieldset>
        </div>
      </section>
      <UploadPictureModal
        open={Open}
        onClose={() => setOpen(false)}
        setShow={setShow}
        setImage={setImage}
        handleDeleteCurrentImage={handleDeleteCurrentImage}
        currentImage={Fundraiser.image}
        setFundraiser={setFundraiser}
      />
      <EditImageToUploadModal
        show={Show}
        onClose={() => setShow(false)}
        image={image}
        handleImageUpload={handleMainImage}
        setCroppedImage={setCroppedImage}
      />
    </main>
  );
}
