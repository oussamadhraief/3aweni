import { Input } from '@material-tailwind/react'
import React, { FormEvent, useState } from 'react'
import { IconContext } from 'react-icons'
import { GoSettings } from 'react-icons/go'
import { AiOutlineSearch } from 'react-icons/ai'
import { IoMdClose } from 'react-icons/io'
import SearchPageSuggestions from '../../components/SearchPageSuggestions'

export default function SearchField() {

    const [Search, setSearch] = useState<string>('')
    const [Open, setOpen] = useState<boolean>(false)


    const handleChange = (e: FormEvent) => {

        const target = e.target as HTMLInputElement

        setSearch(target.value)
    }

  return (
    <main className='mt-[94px] py-24  flex flex-col items-center justify-center'>
        <form className="relative w-1/3 rounded-full border border-gray-400 flex items-center pr-3 overflow-hidden mb-14">
            <button className='px-2 h-10 flex justify-center items-center outline-none' >
                <IconContext.Provider value={{ className: 'rotate-90 h-6 w-6 text-sm text-gray-600'}}>
                    <AiOutlineSearch />
                </IconContext.Provider>
            </button>
            <input placeholder="Chercher un 3aweni" className='w-full outline-none h-10 placeholder:text-sm placeholder:font-thin placeholder:text-gray-500' value={Search} onChange={handleChange} />
            <button type='button' className="rounded bg-gray-200 px-3 py-1 flex items-center gap-1" onClick={() => setOpen(true)}>
                
                Filters
                <IconContext.Provider value={{ className: 'rotate-90 h-4 w-4 text-sm'}}>
                    <GoSettings />
                </IconContext.Provider>
            </button>
        </form>

        {
        Open &&
            <div className='fixed inset-0 bg-gray-600/40 z-[100]' onClick={() => setOpen(false)}>
            </div>
        }

            <div className={Open ? 'w-72 fixed top-0 left-0 h-screen bg-white shadow-form z-[101] py-2  flex flex-col flex-nowrap justify-start transition-all duration-300  whitespace-nowrap' : "w-72  overflow-hidden fixed top-0 -left-80 h-screen bg-white shadow-form z-[101] flex flex-col flex-nowrap justify-start transition-all duration-300  whitespace-nowrap" }>
                <div className='w-full flex flex-nowrap justify-between items-center border-b border-gray-300 shrink-0 px-2 pb-2'>

                <h3 className='text-lg '>Filtres</h3>

                <button className='p-1.5 rounded-full hover:bg-gray-200' onClick={() => setOpen(false)}>
                    <IconContext.Provider value={{ className: 'h-5 w-5'}}>
                        <IoMdClose />
                    </IconContext.Provider>
                </button>
                
                
                </div>
                <div className='h-full overflow-auto py-5 px-3'>
                    <p>Near you</p>
                    <p>Close to goal</p>
                    <p>Category</p>
                    
                </div>
                <div className='w-full flex flex-nowrap items-center justify-around shrink-0 pt-3 px-3'>
                <button className='border rounded-2xl border-gray-500 px-4 py-2'>Restaurer</button>

                <button onClick={() => setOpen(false)} className='border rounded-2xl border-main_color px-4 py-2 bg-main_color text-white'>Voir résultats</button>
                </div>
            </div>
        
        <div className='w-full bg-beige flex flex-col items-center justify-center'>

            <SearchPageSuggestions />
        </div>

    </main>
  )
}
