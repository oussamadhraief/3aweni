import useAuthContext from '../hooks/useAuthContext'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { IconContext } from 'react-icons'

export default function UserDropdownMenu({ main }: { main: Boolean }) {

    const navigate = useNavigate()

    const { user, logout } = useAuthContext()

    const handleLogout = () => {
        axios.get('/api/user/logout',{ 
          withCredentials: true 
        }).then(() => {
            logout()
            navigate('/login')
        })
      }

  return (
    <>
        <button className='relative w-fit h-fit'>
          <IconContext.Provider value={{ className: 'w-6 h-6 text-gray-500'}}>
            <IoIosNotificationsOutline />
          </IconContext.Provider>

        </button>
      <div className="dropdown dropdown-bottom dropdown-end flex items-center gap-3">
        <label tabIndex={0} className="btn btn-ghost flex items-center gap-3">
          <p>{main && user?.name}</p>
          <img src="/profile.png" alt="" className='w-8 h-8' />
        </label>
          <ul tabIndex={0} className="dropdown-content menu shadow-form rounded-lg w-52 px-3 py-1 bg-white">
            <li className='py-1 flex '><Link to={main ? '/account/dashboard/fundraisers' : '/'} className='flex items-center gap-2 w-full text-center'>{main ? 'Tableau de bord' : 'Accueil'}</Link></li>
            <li className='py-1 flex '><Link to='/account/details'>Mon compte</Link></li>
            <li className='py-1 flex '><Link to='/account/settings'>Paramètres</Link></li>
            <li className='py-1 flex  text-red-500'><button onClick={handleLogout}>Logout</button></li>
          </ul>
      </div>
    </>
  )
}
