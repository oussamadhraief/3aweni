import { Link } from 'react-router-dom'
import { IconContext } from "react-icons";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosArrowDown } from 'react-icons/io';
import { useEffect, useRef, useState } from 'react';
import { categories } from '../utils/categoriesData';

export default function Navbar() {

  const discover = useRef<HTMLLIElement>(null)
  const [Show, setShow] = useState(false)

  return (
    <nav className="main-menu" id="main-menu">
      <ul className="main-menu__list">
        <li ref={discover} className="relative main-menu__item group">
          <button className="main-menu__link g-link flex items-center gap-1 main-menu__link g-link group" onClick={() => setShow(prev => !prev)}>Découvrir
              <IconContext.Provider value={{ className: 'text-zinc-700 group-hover:text-secondary'}}>
                  <IoIosArrowDown />
              </IconContext.Provider>
          </button>
          <div className={Show ? `rounded-md absolute left-0 top-[150%] w-96 h-60 flex flex-wrap px-4 py-2 space-x-1 bg-white shadow-form transition-[display] duration-500` : `hidden transition-[display] delay-500`}>
              <h3 className='font-semibold w-full text-xs'>Catégories</h3>
              {categories.map(item => <Link to={`/fundraisers/${item.value}`} className='w-32 h-5 whitespace-nowrap text-sm hover:underline'>{item.label}</Link>)}
          </div>
        </li>
        <li className="main-menu__item"><Link to="/search" className='flex items-center gap-1 main-menu__link g-link group'>
           Recherche
           <IconContext.Provider value={{ className: "text-zinc-700 text-lg group-hover:text-secondary" }}>
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