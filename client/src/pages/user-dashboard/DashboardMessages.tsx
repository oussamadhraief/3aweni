import { BiDonateHeart, BiIdCard } from 'react-icons/bi'
import { IconContext } from 'react-icons'
import { FiSettings } from 'react-icons/fi'
import { TiMessage } from 'react-icons/ti'
import { MdOutlineExpandMore } from 'react-icons/md'
import { Link } from 'react-router-dom'

export default function AccountDashboard() {
  return (
    <main className='flex w-screen h-screen flex-nowrap items-start'>
        <div className="relative bg-white dark:bg-gray-800">
            <div className="flex flex-col sm:flex-row sm:justify-around">
                <div className="h-screen w-72">
                    <Link to="/"><img className="h-12 mx-auto mt-5" src="/secondary_logo.png"/></Link>


                    <nav className="mt-10 px-4 ">
                        <a className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors  duration-200  text-gray-600 rounded-lg " href="#">
                            <IconContext.Provider value={{ className: 'w-5 h-5 text-gray-700'}}>
                                <BiIdCard />
                            </IconContext.Provider>
                            <span className="mx-4 font-normal">
                                Mes 3awenis
                            </span>
                            <span className="flex-grow text-right">
                            </span>
                        </a>
                        <a className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors  duration-200  text-gray-600 rounded-lg whitespace-nowrap" href="#">
                            <IconContext.Provider value={{ className: 'w-5 h-5 text-gray-700'}}>
                                <TiMessage />
                            </IconContext.Provider>
                            <span className="mx-4 font-normal">
                                Mes disscussions
                            </span>
                            <span className="flex-grow text-right">
                                <button type="button" className="w-6 h-6 text-xs  rounded-full text-white bg-red-500">
                                    <span className="p-1">
                                        7
                                    </span>
                                </button>
                            </span>
                            <IconContext.Provider value={{ className: 'w-5 h-5 text-gray-700'}}>
                                <MdOutlineExpandMore />
                            </IconContext.Provider>
                        </a>

                        <div className="w-full bg-white rounded-2xl">
            
            <ul>
                <li className="flex items-center my-6 space-x-2">
                    <a href="#" className="relative block">
                        <img alt="profil" src="/africa.jpg" className="mx-auto object-cover rounded-full h-10 w-10 "/>
                    </a>
                    <div className="flex flex-col">
                        <span className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
                            Charlie Rabiller
                        </span>
                        <span className="ml-2 text-sm text-gray-400 dark:text-gray-300">
                            Hey John ! Do you read the NextJS doc ?
                        </span>
                    </div>
                </li>
                <li className="flex items-center my-6 space-x-2">
                    <a href="#" className="relative block">
                        <img alt="profil" src="/africa.jpg" className="mx-auto object-cover rounded-full h-10 w-10 "/>
                    </a>
                    <div className="flex flex-col">
                        <span className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
                            Marie Lou
                        </span>
                        <span className="ml-2 text-sm text-gray-400 dark:text-gray-300">
                            No I think the dog is better...
                        </span>
                    </div>
                </li>
                <li className="flex items-center my-6 space-x-2">
                    <a href="#" className="relative block">
                        <img alt="profil" src="/africa.jpg" className="mx-auto object-cover rounded-full h-10 w-10 "/>
                    </a>
                    <div className="flex flex-col">
                        <span className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
                            Ivan Buck
                        </span>
                        <span className="ml-2 text-sm text-gray-400 dark:text-gray-300">
                            Seriously ? haha Bob is not a child !
                        </span>
                    </div>
                </li>
                <li className="flex items-center my-6 space-x-2">
                    <a href="#" className="relative block">
                        <img alt="profil" src="/africa.jpg" className="mx-auto object-cover rounded-full h-10 w-10 "/>
                    </a>
                    <div className="flex flex-col">
                        <span className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
                            Marina Farga
                        </span>
                        <span className="ml-2 text-sm text-gray-400 dark:text-gray-300">
                            Do you need that design ?
                        </span>
                    </div>
                </li>
            </ul>
        </div>

                        <a className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors  duration-200  text-gray-600 rounded-lg " href="#">
                            <IconContext.Provider value={{ className: 'w-5 h-5 text-gray-700'}}>
                                <BiDonateHeart />
                            </IconContext.Provider>
                            <span className="mx-4 font-normal">
                                Mes dons
                            </span>
                            <span className="flex-grow text-right">
                            </span>
                        </a>
                        <a className="hover:text-main_color flex items-center p-2 my-6 transition-colors duration-200  text-main_color rounded-l-lg border-r-2 border-main_color bg-main_color/10 " href="#">
                            <FiSettings />
                            <span className="mx-4 font-normal">
                                Paramètres
                            </span>
                            <span className="flex-grow text-right">
                            </span>
                        </a>
                    </nav>
                </div>
            </div>
        </div>
        <div className='w-full '>
            
        

        </div>
    </main>
  )
}
