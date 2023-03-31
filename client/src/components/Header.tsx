import Navbar from './Navbar'
import { Link, useNavigate } from 'react-router-dom'
import useAuthContext from '../hooks/useAuthContext'
import { IconContext } from 'react-icons'
import { MdOutlineExpandMore } from 'react-icons/md'
import { HiOutlineExternalLink } from 'react-icons/hi'
import axios from 'axios'
import useLoadingAuthContext from '../hooks/useLoadingAuthContext'

export default function Header() {

  const { user, logout } = useAuthContext()
  const { Loading } = useLoadingAuthContext()

  const navigate = useNavigate()

  const handleLogout = () => {
    axios.get('/api/user/logout',{ 
      withCredentials: true 
    }).then(() => {
        logout()
        navigate('/login')
    })
  }

  return (
    <header className="header" id="header">
    <div className="header__container">
      <div className="header__left"><Link className="header__logo" to="/"><img className="header__icon" src="/secondary_logo.png" alt="logo"/></Link>
        <Navbar />
      </div>
      <div className="header__right">
        {Loading ? 
        
      <div className="mx-auto rounded-md w-fit">
          <div className="flex flex-row items-center justify-center h-full gap-5 animate-pulse">

              <div className="h-5 bg-gray-200 rounded-md w-28">
              </div>
          
              <div className="w-8 h-8 bg-gray-200 rounded-full ">
              </div>
          </div>
      </div>

         : 
        ( user ? 
        <div className="dropdown">
        <label tabIndex={0} className="btn btn-ghost flex items-center gap-3">
          {user?.name}
          <img src="/profile.png" alt="" className='w-8 h-8' />
        </label>
          <ul tabIndex={0} className="dropdown-content menu shadow-form rounded-lg w-52 px-3 py-1 bg-white">
            <li className='py-1 flex '><Link to='/account/dashboard/fundraisers' target='_blank' className='flex items-center gap-2 w-full text-center'>Tableau de bord <HiOutlineExternalLink /></Link></li>
            <li className='py-1 flex '><Link to='/account/details'>Mon compte</Link></li>
            <li className='py-1 flex '><Link to='/account/settings'>Paramètres</Link></li>
            <li className='py-1 flex  text-red-500'><button onClick={handleLogout}>Logout</button></li>
          </ul>
      </div>
        :
        <>
        <Link className="header__link" to="/login">Se connecter</Link>
        <Link className="header__button g-button" to="/register">S'inscrire</Link>
        </> )
        } 
        <Link className="header__trigger" id="header-trigger" to="#"><img className="header__icon" src="https://raw.githubusercontent.com/ricardoolivaalonso/GetBello/main/public/img/menu.svg" alt="menu"/></Link>
      </div>
    </div>
  </header>
    )
  }
  
  
  
  
 