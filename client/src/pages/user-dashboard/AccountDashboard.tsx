import { BiDonateHeart, BiIdCard } from 'react-icons/bi'
import { IconContext } from 'react-icons'
import { FiSettings } from 'react-icons/fi'
import { TiMessage } from 'react-icons/ti'
import { Link } from 'react-router-dom'

export default function AccountDashboard() {
  return (
    <main className='flex w-screen h-screen flex-nowrap items-start'>
        <div className="relative bg-white dark:bg-gray-800">
            <div className="flex flex-col sm:flex-row sm:justify-around">
                <div className="h-screen w-72">
                    <Link to="/"><img className="h-12 mx-auto mt-5" src="/secondary_logo.png"/></Link>


                    <nav className="mt-10 px-4 ">
                        <a className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg " href="#">
                            <IconContext.Provider value={{ className: 'w-5 h-5 text-gray-700'}}>
                                <BiIdCard />
                            </IconContext.Provider>
                            <span className="mx-4 text-lg font-normal">
                                Mes 3awenis
                            </span>
                            <span className="flex-grow text-right">
                            </span>
                        </a>
                        <a className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg whitespace-nowrap" href="#">
                            <IconContext.Provider value={{ className: 'w-5 h-5 text-gray-700'}}>
                                <TiMessage />
                            </IconContext.Provider>
                            <span className="mx-4 text-lg font-normal">
                                Mes disscussions
                            </span>
                            <span className="flex-grow text-right">
                                <button type="button" className="w-6 h-6 text-xs  rounded-full text-white bg-red-500">
                                    <span className="p-1">
                                        7
                                    </span>
                                </button>
                            </span>
                        </a>
                        <a className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg " href="#">
                            <IconContext.Provider value={{ className: 'w-5 h-5 text-gray-700'}}>
                                <BiDonateHeart />
                            </IconContext.Provider>
                            <span className="mx-4 text-lg font-normal">
                                Mes dons
                            </span>
                            <span className="flex-grow text-right">
                            </span>
                        </a>
                        <a className="hover:text-main_color flex items-center p-2 my-6 transition-colors duration-200  text-main_color rounded-l-lg border-r-2 border-main_color bg-main_color/10 " href="#">
                            <FiSettings />
                            <span className="mx-4 text-lg font-normal">
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
            
        <section className="w-full h-screen bg-gray-100/50 flex justify-center items-center">
            <form className="container max-w-2xl mx-auto shadow-md md:w-3/4">
                <div className="p-4 border-t-2 border-indigo-400 rounded-lg bg-gray-100/5 ">
                    <div className="max-w-sm mx-auto md:w-full md:mx-0">
                        <div className="inline-flex items-center space-x-4">
                            <a href="#" className="relative block">
                                <img alt="profil" src="/africa.jpg" className="mx-auto object-cover rounded-full h-16 w-16 "/>
                            </a>
                            <h1 className="text-gray-600">
                                Charlie
                            </h1>
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
                                <input type="text" id="user-info-email" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Email"/>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
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
                                <div className="items-center w-full p-8 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                                    <h2 className="max-w-sm mx-auto md:w-4/12">
                                        Change password
                                    </h2>
                                    <div className="w-full max-w-sm pl-2 mx-auto space-y-5 md:w-5/12 md:pl-9 md:inline-flex">
                                        <div className=" relative ">
                                            <input type="text" id="user-info-password" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Password"/>
                                            </div>
                                        </div>
                                        <div className="text-center md:w-3/12 md:pl-6">
                                            <button type="button" className="py-2 px-4  bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-pink-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                                Change
                                            </button>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
                                        <button type="submit" className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </form>
                </section>

        </div>
    </main>
  )
}
