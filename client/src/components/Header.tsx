import Navbar from './Navbar'
import { Link } from 'react-router-dom'


export default function Header() {
  return (
    <header className="header" id="header">
    <div className="header__container">
      <div className="header__left"><Link className="header__logo" to="/"><img className="header__icon" src="/secondary_logo.png" alt="logo"/></Link>
        <Navbar />
      </div>
      <div className="header__right">
        <Link className="header__link" to="/login">Se connecter</Link>
        <Link className="header__button g-button" to="/register">S'inscrire</Link>
        <Link className="header__trigger" id="header-trigger" to="#"><img className="header__icon" src="https://raw.githubusercontent.com/ricardoolivaalonso/GetBello/main/public/img/menu.svg" alt="menu"/></Link>
      </div>
    </div>
  </header>
    )
  }
  
  
  
  
 