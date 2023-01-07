import React, { useState } from 'react'
import { IconContext } from 'react-icons'
import { AiOutlineSearch } from 'react-icons/ai'

export default function SearchBar() {

  const [search, setSearch] = useState<string>("")

  const handleChange = (e: React.FormEvent) => {
    const target = e.target as HTMLInputElement
    if(target?.value){
      setSearch(target.value)
    }
  }

  return (
    <div className='flex items-center gap-2 group'>
        <input type="text" name="search" value={search} onChange={handleChange} />
        <IconContext.Provider value={{ className: "text-zinc-400 group-active:text-zinc-700" }}>
          <AiOutlineSearch />
        </IconContext.Provider>
    </div>
  )
}
