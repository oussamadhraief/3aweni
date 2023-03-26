import { BiDonateHeart, BiIdCard } from 'react-icons/bi'
import { IconContext } from 'react-icons'
import { FiSettings } from 'react-icons/fi'
import { TiMessage } from 'react-icons/ti'
import { Link } from 'react-router-dom'

export default function AccountDashboard() {
  return (
    <main className='flex w-screen h-screen flex-nowrap items-start'>
        <div className="relative bg-white shadow-form">
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
            
        
<div className="w-full px-4 mx-auto sm:px-8">
    <div className="py-8">
        <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                User
                            </th>
                            <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                Role
                            </th>
                            <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                Created at
                            </th>
                            <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                status
                            </th>
                            <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <a href="#" className="relative block">
                                            <img alt="profil" src="/images/person/8.jpg" className="mx-auto object-cover rounded-full h-10 w-10 "/>
                                        </a>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            Jean marc
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    Admin
                                </p>
                            </td>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    12/09/2020
                                </p>
                            </td>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                                    <span aria-hidden="true" className="absolute inset-0 bg-green-200 rounded-full opacity-50">
                                    </span>
                                    <span className="relative">
                                        active
                                    </span>
                                </span>
                            </td>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                    Edit
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <a href="#" className="relative block">
                                            <img alt="profil" src="/images/person/8.jpg" className="mx-auto object-cover rounded-full h-10 w-10 "/>
                                        </a>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            Jean marc
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    Admin
                                </p>
                            </td>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    12/09/2020
                                </p>
                            </td>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                                    <span aria-hidden="true" className="absolute inset-0 bg-green-200 rounded-full opacity-50">
                                    </span>
                                    <span className="relative">
                                        active
                                    </span>
                                </span>
                            </td>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                    Edit
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <a href="#" className="relative block">
                                            <img alt="profil" src="/images/person/8.jpg" className="mx-auto object-cover rounded-full h-10 w-10 "/>
                                        </a>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            Jean marc
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    Admin
                                </p>
                            </td>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    12/09/2020
                                </p>
                            </td>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                                    <span aria-hidden="true" className="absolute inset-0 bg-green-200 rounded-full opacity-50">
                                    </span>
                                    <span className="relative">
                                        active
                                    </span>
                                </span>
                            </td>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                    Edit
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <a href="#" className="relative block">
                                            <img alt="profil" src="/images/person/8.jpg" className="mx-auto object-cover rounded-full h-10 w-10 "/>
                                        </a>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            Jean marc
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    Admin
                                </p>
                            </td>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    12/09/2020
                                </p>
                            </td>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                                    <span aria-hidden="true" className="absolute inset-0 bg-green-200 rounded-full opacity-50">
                                    </span>
                                    <span className="relative">
                                        active
                                    </span>
                                </span>
                            </td>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                    Edit
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <a href="#" className="relative block">
                                            <img alt="profil" src="/images/person/8.jpg" className="mx-auto object-cover rounded-full h-10 w-10 "/>
                                        </a>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            Jean marc
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    Admin
                                </p>
                            </td>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    12/09/2020
                                </p>
                            </td>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                                    <span aria-hidden="true" className="absolute inset-0 bg-green-200 rounded-full opacity-50">
                                    </span>
                                    <span className="relative">
                                        active
                                    </span>
                                </span>
                            </td>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                    Edit
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <a href="#" className="relative block">
                                            <img alt="profil" src="/images/person/8.jpg" className="mx-auto object-cover rounded-full h-10 w-10 "/>
                                        </a>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            Jean marc
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    Admin
                                </p>
                            </td>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    12/09/2020
                                </p>
                            </td>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                                    <span aria-hidden="true" className="absolute inset-0 bg-green-200 rounded-full opacity-50">
                                    </span>
                                    <span className="relative">
                                        active
                                    </span>
                                </span>
                            </td>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                    Edit
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <a href="#" className="relative block">
                                            <img alt="profil" src="/images/person/9.jpg" className="mx-auto object-cover rounded-full h-10 w-10 "/>
                                        </a>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            Marcus coco
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    Designer
                                </p>
                            </td>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    01/10/2012
                                </p>
                            </td>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                                    <span aria-hidden="true" className="absolute inset-0 bg-green-200 rounded-full opacity-50">
                                    </span>
                                    <span className="relative">
                                        active
                                    </span>
                                </span>
                            </td>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                    Edit
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <a href="#" className="relative block">
                                            <img alt="profil" src="/images/person/10.jpg" className="mx-auto object-cover rounded-full h-10 w-10 "/>
                                        </a>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            Ecric marc
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    Developer
                                </p>
                            </td>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    02/10/2018
                                </p>
                            </td>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                                    <span aria-hidden="true" className="absolute inset-0 bg-green-200 rounded-full opacity-50">
                                    </span>
                                    <span className="relative">
                                        active
                                    </span>
                                </span>
                            </td>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                    Edit
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <a href="#" className="relative block">
                                            <img alt="profil" src="/images/person/6.jpg" className="mx-auto object-cover rounded-full h-10 w-10 "/>
                                        </a>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            Julien Huger
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    User
                                </p>
                            </td>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    23/09/2010
                                </p>
                            </td>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                                    <span aria-hidden="true" className="absolute inset-0 bg-green-200 rounded-full opacity-50">
                                    </span>
                                    <span className="relative">
                                        active
                                    </span>
                                </span>
                            </td>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                    Edit
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="flex flex-col items-center px-5 py-5 bg-white xs:flex-row xs:justify-between">
                    <div className="flex items-center">
                        <button type="button" className="w-full p-4 text-base text-gray-600 bg-white border rounded-l-xl hover:bg-gray-100">
                            <svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z">
                                </path>
                            </svg>
                        </button>
                        <button type="button" className="w-full px-4 py-2 text-base text-indigo-500 bg-white border-t border-b hover:bg-gray-100 ">
                            1
                        </button>
                        <button type="button" className="w-full px-4 py-2 text-base text-gray-600 bg-white border hover:bg-gray-100">
                            2
                        </button>
                        <button type="button" className="w-full px-4 py-2 text-base text-gray-600 bg-white border-t border-b hover:bg-gray-100">
                            3
                        </button>
                        <button type="button" className="w-full px-4 py-2 text-base text-gray-600 bg-white border hover:bg-gray-100">
                            4
                        </button>
                        <button type="button" className="w-full p-4 text-base text-gray-600 bg-white border-t border-b border-r rounded-r-xl hover:bg-gray-100">
                            <svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z">
                                </path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


        </div>
    </main>
  )
}
