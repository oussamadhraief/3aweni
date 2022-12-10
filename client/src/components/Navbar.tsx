import React from 'react'
import SearchBar from './SearchBar'

export default function Navbar() {
  return (
    <nav className='fixed top-0 left-0 w-full h-fit flex justify-around items-center py-4'>
        <img src="" alt="" />
        <div className='w-fit flex items-center gap-10'>
            <SearchBar />
            <a href="">Aide</a>
            <a href="" className='w-fit h-fit border border-main_color rounded text-main_color py-2 px-3 hover:bg-main_color hover:text-white'>Se connecter</a>
            <a href="" className='w-fit h-fit bg-main_color border border-white rounded text-white py-2 px-5 hover:bg-white hover:border-main_color hover:border hover:text-main_color'>S'inscrire</a>
        </div>
    </nav>
  )
}
