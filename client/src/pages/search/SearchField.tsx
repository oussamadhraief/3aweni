import { Input } from '@material-tailwind/react'
import React, { FormEvent, useState } from 'react'
import { IconContext } from 'react-icons'
import { GoSettings } from 'react-icons/go'
import { AiOutlineSearch } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import SearchPageSuggestions from '../../components/SearchPageSuggestions'

export default function SearchField() {

    const [Search, setSearch] = useState<string>('')


    const handleChange = (e: FormEvent) => {

        const target = e.target as HTMLInputElement

        setSearch(target.value)
    }

  return (
    <main className='mt-[94px] py-24  flex flex-col items-center justify-center'>
        <form className="relative w-1/3 rounded-full border border-gray-400 flex items-center pr-3 overflow-hidden mb-14">
            <button className='px-2 h-10 flex justify-center items-center'>
                <IconContext.Provider value={{ className: 'rotate-90 h-6 w-6 text-sm text-gray-600'}}>
                    <AiOutlineSearch />
                </IconContext.Provider>
            </button>
            <input placeholder="Chercher un 3aweni" className='w-full outline-none h-10 placeholder:text-sm placeholder:font-thin placeholder:text-gray-500' value={Search} onChange={handleChange} />
            <button type='button' className="rounded bg-gray-200 px-3 py-1 flex items-center gap-1">
                
                Filters
                <IconContext.Provider value={{ className: 'rotate-90 h-4 w-4 text-sm'}}>
                    <GoSettings />
                </IconContext.Provider>
            </button>
        </form>
        
        <div className='w-full bg-beige flex flex-col items-center justify-center'>

            <SearchPageSuggestions />
        </div>

    </main>
  )
}
