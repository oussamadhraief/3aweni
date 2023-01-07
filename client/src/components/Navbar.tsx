import { IconContext } from "react-icons";
import { AiOutlineSearch } from "react-icons/ai";

export default function Navbar() {
  return (
    <nav className="main-menu" id="main-menu">
      <ul className="main-menu__list">
        <li className="main-menu__item"><a className="main-menu__link g-link" href="#">Découvrir</a></li>
        <li className="main-menu__item"><a href="" className='flex items-center gap-2 main-menu__link g-link group'>
           Recherche
           <IconContext.Provider value={{ className: "text-zinc-700 text-xl group-hover:text-secondary_color" }}>
             <AiOutlineSearch />
           </IconContext.Provider>
        </a></li>
        <li className="main-menu__item"><a className="main-menu__link g-link" href="#">Aide</a></li>
      </ul>
    </nav>
    )
  }
  
  // <nav className='fixed top-0 left-0 w-full h-20 flex justify-around items-center bg-white'>
  //   <div className='w-1/4 flex justify-center'>

  //     <img src="/logo.png" alt="" className='w-32' />
  //   </div>
  //     <div className='w-1/4 h-fit flex gap-7 justify-center'>
  //       <a href="" className='px-2 py-1 rounded hover:bg-main_color_hover hover:text-main_color'>Découvrir</a>
  //       <a href="" className='flex items-center gap-2 px-2 py-1 rounded hover:bg-main_color_hover hover:text-main_color'>
  //         Recherche
  //         <IconContext.Provider value={{ className: "text-zinc-700 text-xl" }}>
  //           <AiOutlineSearch />
  //         </IconContext.Provider>
  //      </a>
  //       <a href="" className='px-2 py-1 rounded hover:bg-main_color_hover hover:text-main_color'>Aide</a>
  //     </div>
  //     <div className='w-1/4 flex items-center gap-10 justify-center'>
  //         <a href="" className='relative w-fit h-fit rounded hover:text-main_color nav-link'>Se connecter</a>
  //         <a href="" className='w-fit h-fit bg-main_color border rounded text-white py-2 px-5 hover:bg-white border-main_color hover:border hover:text-main_color button-hover-animation'>S'inscrire</a>
  //     </div>
  // </nav>