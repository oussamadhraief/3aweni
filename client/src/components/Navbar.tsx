import { Link } from 'react-router-dom'
import { IconContext } from "react-icons";
import { AiOutlineSearch } from "react-icons/ai";

export default function Navbar() {
  return (
    <nav className="main-menu" id="main-menu">
      <ul className="main-menu__list">
        <li className="main-menu__item"><Link className="main-menu__link g-link" to="#">Découvrir</Link></li>
        <li className="main-menu__item"><Link to="/search" className='flex items-center gap-2 main-menu__link g-link group'>
           Recherche
           <IconContext.Provider value={{ className: "text-zinc-700 text-xl group-hover:text-secondary_color" }}>
             <AiOutlineSearch />
           </IconContext.Provider>
        </Link></li>
        <li className="main-menu__item"><Link className="main-menu__link g-link" to="#">Aide</Link></li>
      </ul>
    </nav>
    )
  }
  
  // <nav className='fixed top-0 left-0 w-full h-20 flex justify-around items-center bg-white'>
  //   <div className='w-1/4 flex justify-center'>

  //     <img src="/secondary_logo.png" alt="" className='w-32' />
  //   </div>
  //     <div className='w-1/4 h-fit flex gap-7 justify-center'>
  //       <Link to="" className='px-2 py-1 rounded hover:bg-primary_hover hover:text-primary'>Découvrir</Link>
  //       <Link to="" className='flex items-center gap-2 px-2 py-1 rounded hover:bg-primary_hover hover:text-primary'>
  //         Recherche
  //         <IconContext.Provider value={{ className: "text-zinc-700 text-xl" }}>
  //           <AiOutlineSearch />
  //         </IconContext.Provider>
  //      </Link>
  //       <Link to="" className='px-2 py-1 rounded hover:bg-primary_hover hover:text-primary'>Aide</Link>
  //     </div>
  //     <div className='w-1/4 flex items-center gap-10 justify-center'>
  //         <Link to="" className='relative w-fit h-fit rounded hover:text-primary nav-link'>Se connecter</Link>
  //         <Link to="" className='w-fit h-fit bg-primary border rounded text-white py-2 px-5 hover:bg-white border-primary hover:border hover:text-primary button-hover-animation'>S'inscrire</Link>
  //     </div>
  // </nav>