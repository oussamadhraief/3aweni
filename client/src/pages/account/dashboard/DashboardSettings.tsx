import axios from "axios";
import { useRef, useState } from "react";
import { IconContext } from "react-icons";
import { RiDeleteBinLine } from 'react-icons/ri' 


export default function DashboardSettings() {

    const imageUploadInputRef = useRef<HTMLInputElement>(null)
    const progressBarRef = useRef<HTMLProgressElement>(null)

    const [UserImage, setUserImage] = useState<string | null>(null)
    const [EditingImage, setEditingImage] = useState<boolean>(false)

    const handleEditingImage = () => {
        setEditingImage(prev => !prev)
    }

    async  function handleImageInput(e: React.FormEvent){
        if(imageUploadInputRef.current)
            imageUploadInputRef.current.disabled = true
        const target = e.target as HTMLInputElement
        const files: FileList | null = target?.files
        const reader = new FileReader();
        reader.onload = async function () {
            if(reader.result)
                setUserImage(reader.result as string)
            if(imageUploadInputRef.current)
                imageUploadInputRef.current.disabled = false
        }
        if(files)
            reader.readAsDataURL(files[0])
    }

    const handleImageUpload = (Base64EncodedImage: string, target: HTMLInputElement) => {
        axios.post('/api/upload',JSON.stringify({
            data: Base64EncodedImage
        }),{
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
            onUploadProgress: (progressEvent) => {
                const percentCompleted = (progressEvent.loaded / progressEvent.total!) * 100
                
                progressBarRef.current?.setAttribute('value',`${percentCompleted}`)
                
                if(percentCompleted == 100) {
                    // add completed
                }
            }
        }).then(res => {

            target.value = ''

            
        })
            
    }

  return (    
    <section className="dashboard-main-section w-full bg-gray-100/50 flex justify-center items-center">
        <div className="container max-w-2xl mx-auto shadow-md md:w-3/4 rounded-b-lg overflow-hidden">
            <div className="p-4 border-t-2 border-gray-200 rounded-lg bg-gray-100/5 ">
                <div className="mx-auto md:w-full md:mx-0">
                    <div className={EditingImage ? "relative w-full inline-flex flex-col justify-center items-center space-y-4 transition-all" : "relative w-full flex items-center space-x-4 transition-all"}>
                        <div className="relative w-fit h-fit group rounded">
                            <div className="relative w-fit h-fit group rounded">
                            <img alt="profil" src={UserImage ? UserImage : "/profile.png "} className={EditingImage ? "mx-auto object-cover rounded-full h-32 w-32" : "mx-auto object-cover rounded-full h-24 w-24"} />
                            {/* <div className="absolute inset-0 bg-white/60 flex items-end pb-5 justify-center flex-nowrap">
                                <progress ref={progressBarRef} value={0} max={100} className='uploadToCloudinaryProgressBar' ></progress>
                            </div> */}
                            </div> 
                        </div> 
                        <div className={EditingImage ? "relative flex gap-3" : "relative flex items-center gap-3"}>
                            {EditingImage ? <>
                                <button type="button" className="text-xs" onClick={handleEditingImage}>annuler</button> 
                                <button type="button" className="bg-secondary_color px-2 py-0.5 rounded text-white whitespace-nowrap text-sm">enregistrer</button> 
                            </> : 
                            <>
                                <button type="button" className="bg-gray-300 px-2 py-0.5 rounded text-black whitespace-nowrap text-sm" onClick={handleEditingImage}>Modifer l'image</button>
                                <button type="button" className="text-black whitespace-nowrap" onClick={handleEditingImage}>
                                    <IconContext.Provider value={{ className: 'text-gray-700 w-5 h-5'}}>
                                        <RiDeleteBinLine />
                                    </IconContext.Provider>
                                </button>
                            </>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="space-y-6 bg-white">
                <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                    <h2 className="max-w-sm mx-auto md:w-1/3">
                        Account
                    </h2>
                    <div className="max-w-sm mx-auto md:w-2/3">
                        <div className=" relative ">
                            <input type="text" id="user-info-email" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Email" />
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0 rounded-b-lg">
                        <h2 className="max-w-sm mx-auto md:w-1/3">
                            Personal info
                        </h2>
                        <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
                            <div>
                                <div className=" relative ">
                                    <input type="text" id="user-info-name" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Name"/>
                                    </div>
                                </div>
                                <div>
                                    <div className=" relative ">
                                        <input type="text" id="user-info-phone" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Phone number"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div className="items-center w-full p-8 text-gray-500 rounded-b-lg">
                            <h2 className="w-full text-left">
                                Mot de passe
                            </h2>
                            <div className=" relative ">
                                <input type="text" id="user-info-password" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Password"/>
                                </div>
                            </div>
                        </div>
                    </div>
            </section>
  )
}
