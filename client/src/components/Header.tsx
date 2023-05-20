import Navbar from './Navbar'
import { Link, useNavigate } from 'react-router-dom'
import useAuthContext from '../hooks/useAuthContext'

import useLoadingAuthContext from '../hooks/useLoadingAuthContext'
import UserDropdownMenu from './UserDropdownMenu'

export default function Header() {

  const { user } = useAuthContext()
  const { Loading } = useLoadingAuthContext()

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
        <UserDropdownMenu main={true} />
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
  
  
  
  
 