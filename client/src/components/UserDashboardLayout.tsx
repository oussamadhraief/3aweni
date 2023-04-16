import { useState, useEffect } from 'react'
import { IconContext } from 'react-icons'
import { BiDonateHeart, BiIdCard } from 'react-icons/bi'
import { FiSettings } from 'react-icons/fi'
import { TiMessage } from 'react-icons/ti'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import UserChats from './DemoUserChats'
import AllUserChats from './AllUserChats'
import { BsArrowBarLeft } from 'react-icons/bs'
import getUser from '../hooks/getUser'
import useAuthContext from '../hooks/useAuthContext'
import useLoadingAuthContext from '../hooks/useLoadingAuthContext'
import { AiOutlineSearch } from 'react-icons/ai'
import UserDropdownMenu from './UserDropdownMenu'

export default function UserDashboard() {

    const location = useLocation()
    const { login, logout } = useAuthContext()
    const { Loading, setLoading } = useLoadingAuthContext()
    const { user } = useAuthContext()

  

    const [ShowChats, setShowChats] = useState<boolean>(false)
    const [ShowSidebar, setShowSidebar] = useState<boolean>(true)

    useEffect(() => {

        getUser({ login, logout, setLoading })

    },[location])

  return (

    <div className='flex w-screen h-screen flex-nowrap items-start overflow-hidden'>
        <div className={`relative ${ShowSidebar ? "w-72" : "w-0"} transition-all bg-white  shrink-0`}>
                <div className={`absolute top-0 ${ShowSidebar ? "left-0" : "-left-72"} transition-all duration-150 h-screen w-72 min-w-[288px] max-w-[288px] shadow-form`}>
                <AllUserChats ShowChats={ShowChats} setShowChats={setShowChats} />
                    <Link to="/"><img className="h-12 mx-auto mt-5" src="/secondary_logo.png"/></Link>


                    <nav className="mt-10 px-4 ">
                        <NavLink className={({ isActive }) => isActive ? "hover:text-main_color flex items-center p-2 my-4 transition-colors duration-200  text-main_color rounded-l-lg border-r-2 border-main_color bg-main_color/10 text-[15px]" : "hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-4 transition-colors  duration-200  text-gray-600 rounded-lg text-[15px]"} to="/account/dashboard/fundraisers">
                            <IconContext.Provider value={{ className: 'w-5 h-5 text-gray-700'}}>
                                <BiIdCard />
                            </IconContext.Provider>
                            <span className="mx-4 font-normal">
                                Mes 3awenis
                            </span>
                            <span className="flex-grow text-right">
                            </span>
                        </NavLink>
                        <NavLink className={({ isActive }) => isActive  ? "hover:text-main_color flex items-center p-2 my-4 transition-colors duration-200  text-main_color rounded-l-lg border-r-2 border-main_color bg-main_color/10 text-[15px]" : "hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-4 transition-colors  duration-200  text-gray-600 rounded-lg text-[15px]"} to="/account/dashboard/messages">
                            <IconContext.Provider value={{ className: 'w-5 h-5 text-gray-700'}}>
                                <TiMessage />
                            </IconContext.Provider>
                            <span className="mx-4 font-normal">
                                Mes disscussions
                            </span>
                            <span className="flex-grow text-right">
                                <button type="button" className="w-5 h-5 text-[10px]  rounded-full text-white bg-red-500">
                                    <span className="p-1">
                                        7
                                    </span>
                                </button>
                            </span>
                        </NavLink>
                        {location.pathname === '/account/dashboard/messages' && <UserChats setShowChats={setShowChats} />}
                        <NavLink className={({ isActive }) => isActive ?  "hover:text-main_color flex items-center p-2 my-4 transition-colors duration-200  text-main_color rounded-l-lg border-r-2 border-main_color bg-main_color/10 text-[15px]" : "hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-4 transition-colors  duration-200  text-gray-600 rounded-lg text-[15px]"} to="/account/dashboard/donations">
                            <IconContext.Provider value={{ className: 'w-5 h-5 text-gray-700'}}>
                                <BiDonateHeart />
                            </IconContext.Provider>
                            <span className="mx-4 font-normal">
                                Mes dons
                            </span>
                            <span className="flex-grow text-right">
                            </span>
                        </NavLink>
                        <NavLink className={({ isActive }) => isActive ?  "hover:text-main_color flex items-center p-2 my-4 transition-colors duration-200  text-main_color rounded-l-lg border-r-2 border-main_color bg-main_color/10 text-[15px]" : "hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-4 transition-colors  duration-200  text-gray-600 rounded-lg text-[15px]"} to="/account/dashboard/settings">
                            
                            <IconContext.Provider value={{ className: 'w-4 h-4 text-gray-700'}}>
                                <FiSettings />
                            </IconContext.Provider>
                            <span className="mx-4 font-normal">
                                Paramètres
                            </span>
                            <span className="flex-grow text-right">
                            </span>
                        </NavLink>
                    </nav>
                </div>
        </div>

        <div className='w-full flex flex-col flex-nowrap'>
            <div className="navbar relative bg-base-100 z-10 h-12 dashboard-navbar">
                <button className={`w-fit h-full absolute ${ShowSidebar ? "-left-10" : "left-5"} transition-all top-0`} onClick={() => setShowSidebar(prev => !prev)}>
                    {ShowSidebar ?
                    <IconContext.Provider value={{ className: 'w-5 h-5'}}> 
                        <BsArrowBarLeft />
                    </IconContext.Provider> :
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>}
                </button>
                <div className="flex-none absolute right-5 top-0">
                    <form className="flex items-center flex-nowrap bg-gray-100 rounded-full overflow-hidden">
                        <button className='py-1 px-2'>
                            <IconContext.Provider value={{ className: 'text-gray-500 w-5 h-5'}}> 
                                <AiOutlineSearch />
                            </IconContext.Provider>
                        </button>

                        <input type="text" placeholder="Search" className="h-8 bg-gray-100 placeholder:text-gray-500 outline-none" />
                    </form>
                    <UserDropdownMenu main={false} />
                </div>
            </div>
            <Outlet />
        </div>

    </div>
  )
}