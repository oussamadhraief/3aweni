import { useEffect, useState } from 'react'
import { IconContext } from 'react-icons'
import { BiDonateHeart, BiIdCard } from 'react-icons/bi'
import { FiSettings } from 'react-icons/fi'
import { TiMessage } from 'react-icons/ti'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import DashboardSettings from '../pages/user-dashboard/DashboardSettings'
import DashboardDonations from '../pages/user-dashboard/DashboardDonations'
import DashboardMessages from '../pages/user-dashboard/DashboardMessages'

export default function UserDashboard() {

    const navigate = useNavigate()
    const [Page, setPage] = useState<number>(0)

    const [searchParams,setSearchParams] = useSearchParams({ tab: 'user_settings'})
    
    let dashboardContent

    if(searchParams.get('tab') === 'user_messages'){
        dashboardContent = <DashboardMessages />
    }
    else if(searchParams.get('tab') === 'user_donations'){
        dashboardContent = <DashboardDonations />
    }
    else if(searchParams.get('tab') === 'user_settings'){
        dashboardContent = <DashboardSettings />
    }
    else
    {
        setSearchParams({ tab: 'user_settings' })
        dashboardContent = <DashboardSettings />
    }

  return (

    <main className='flex w-screen h-screen flex-nowrap items-start'>
        <div className="relative bg-white shadow-form">
            <div className="flex flex-col sm:flex-row sm:justify-around">
                <div className="h-screen w-72">
                    <Link to="/"><img className="h-12 mx-auto mt-5" src="/secondary_logo.png"/></Link>


                    <nav className="mt-10 px-4 ">
                        <a className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors  duration-200  text-gray-600 rounded-lg " href="#">
                            <IconContext.Provider value={{ className: 'w-5 h-5 text-gray-700'}}>
                                <BiIdCard />
                            </IconContext.Provider>
                            <span className="mx-4 text-lg font-normal">
                                Mes 3awenis
                            </span>
                            <span className="flex-grow text-right">
                            </span>
                        </a>
                        <a className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors  duration-200  text-gray-600 rounded-lg whitespace-nowrap" href="#">
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
                        <a className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors  duration-200  text-gray-600 rounded-lg " href="#">
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

        {dashboardContent}

    </main>
  )
}
