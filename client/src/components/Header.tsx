import Navbar from './Navbar'
import { Link } from 'react-router-dom'


export default function Header() {
  return (
    <header className="header" id="header">
    <div className="header__container">
      <div className="header__left"><Link className="header__logo" to="/"><img className="header__icon" src="/logo.png" alt="logo"/></Link>
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
  
  
  
  
  // <header className='relative w-full h-screen pt-20 flex flex-col justify-center items-center px-10 mb-96'>
  //     <Navbar />
  //     <h1 className='text-6xl mb-8 font-bold slide-in-blurred-bottom text-main_color'>L'espoir pour tous !</h1>
  //     <button className='rounded-full border-2 border-black py-2 px-5 text-black hover:bg-main_color hover:text-white hover:border-main_color font-medium slide-in-blurred-bottom'>Lancer un 3aweni</button>
      
  //     <div className='absolute right-[10%] top-1/2 w-72 shadow-modern py-2 px-4 rounded'>
  //                 <img src="/africa.jpg" alt="" className='rounded' />
  //                 <p className='text-main_color text-sm'>Sousse, Tunisia</p>
  //                 <p>Oussema mou3a9</p>
  //                 <p className='text-zinc-500 font-thin text-sm my-3'>01 January 2022</p>
  //                 <progress max={100} value={70} className="money-raised-progressbar"></progress>
  //                 <p className='text-zinc-500 font-thin text-sm mt-3'> <strong className='text-black font-bold'>52.000DT</strong> collectés men asl 1000DT</p>
  //                 <button className='w-full rounded bg-main_color text-white py-2 mt-4'>Donate</button>
  //             </div>
  // </header>