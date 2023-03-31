import { IconContext } from "react-icons";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";


export default function AllUserChats({ ShowChats, setShowChats }: {ShowChats: boolean, setShowChats: React.Dispatch<React.SetStateAction<boolean>>}) {
  return (
    <div className={ShowChats ? "absolute top-0 left-0 h-screen w-72 bg-white rounded-2xl transition-all z-50 px-4" : "absolute top-0 -left-full w-72 overflow-hidden bg-white rounded-2xl transition-all z-50 px-4"}>
            
    <ul>
        <li className="w-full flex items-center my-6"> 
        <button onClick={() => setShowChats(false)}>
            <IconContext.Provider value={{ className: "w-6 h-6 text-gray-500"}}>
                <HiOutlineArrowNarrowLeft />
            </IconContext.Provider>
        </button>
        </li>
        <li className="flex items-center my-3">
            <div className="w-full flex bg-gray-100 rounded-full overflow-hidden px-4">
                <input type="text" placeholder="Search" className="w-full h-8 bg-gray-100 placeholder:text-gray-500 outline-none" />
            </div>
        </li>
        <li className="flex items-center my-6 space-x-2">

            <a href="#" className="relative block">
                <img alt="profil" src="/africa.jpg" className="mx-auto object-cover rounded-full h-10 w-10 "/>
            </a>
            <div className="flex flex-col">
                <span className="ml-2 text-sm font-semibold text-gray-900">
                    Charlie Rabiller
                </span>
                <span className="ml-2 text-sm text-gray-400">
                    Hey John ! Do you read the NextJS doc ?
                </span>
            </div>
        </li>
        <li className="flex items-center my-6 space-x-2">
            <a href="#" className="relative block">
                <img alt="profil" src="/africa.jpg" className="mx-auto object-cover rounded-full h-10 w-10 "/>
            </a>
            <div className="flex flex-col">
                <span className="ml-2 text-sm font-semibold text-gray-900">
                    Marie Lou
                </span>
                <span className="ml-2 text-sm text-gray-400">
                    No I think the dog is better...
                </span>
            </div>
        </li>
        <li className="flex items-center my-6 space-x-2">
            <a href="#" className="relative block">
                <img alt="profil" src="/africa.jpg" className="mx-auto object-cover rounded-full h-10 w-10 "/>
            </a>
            <div className="flex flex-col">
                <span className="ml-2 text-sm font-semibold text-gray-900">
                    Ivan Buck
                </span>
                <span className="ml-2 text-sm text-gray-400">
                    Seriously ? haha Bob is not a child !
                </span>
            </div>
        </li>
        <li className="flex items-center my-6 space-x-2">
            <a href="#" className="relative block">
                <img alt="profil" src="/africa.jpg" className="mx-auto object-cover rounded-full h-10 w-10 "/>
            </a>
            <div className="flex flex-col">
                <span className="ml-2 text-sm font-semibold text-gray-900">
                    Marina Farga
                </span>
                <span className="ml-2 text-sm text-gray-400">
                    Do you need that design ?
                </span>
            </div>
        </li>
    </ul>
</div>
  )
}
