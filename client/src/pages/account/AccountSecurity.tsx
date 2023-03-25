import { Link } from 'react-router-dom'
import { useState } from "react";
import { FiEdit2 } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io'


export default function AccountSecurity() {
  
  const [EditingName, setEditingName] = useState(false)
  const [EditingPhone, setEditingPhone] = useState(false)

  const handleEditName = () => {
    setEditingName(prev => !prev)
  }

  const handleEditPhone = () => {
    setEditingPhone(prev => !prev)
  }
  

  return (
    <main className='mt-[94px]  flex flex-col items-start justify-center body-container mx-auto'>
        

    <section className='pt-14'>
    <div className="relative w-full flex flex-nowrap overflow-x-auto overflow-y-visible items-center justify-start h-[34px] mb-10 gap-[2px] hidden-scrollbar border-b">
          
          <Link to='/account/details'  className="min-w-[112px] h-8 w-fit z-20 text-black transition-all outline-none text-center border-b-2 border-white hover:text-main_color hover:border-b-2 py-1 hover:border-main_color">
            Informations personnelles
          </Link>

          <Link to='/account/security'  className="min-w-[112px] h-8 w-fit text-center z-20 text-main_color border-b-2 border-main_color transition-all outline-none py-1 whitespace-nowrap">
            Sécurité
          </Link>

          <Link to=''  className="min-w-[112px] h-8 w-fit z-20 text-black transition-all outline-none text-center border-b-2 border-white hover:text-main_color hover:border-b-2 py-1 hover:border-main_color whitespace-nowrap">
            Mes 3aweni
          </Link>


          <Link to=''  className="min-w-[112px] h-8 w-fit z-20 text-black transition-all outline-none text-center border-b-2 border-white hover:text-main_color hover:border-b-2 py-1 hover:border-main_color whitespace-nowrap">
            Mes dons
          </Link>

      </div>


    
    </section>
      <div className='min-w-[400px] w-full max-w-3xl pb-24'>
          
      </div>

    </main>
  )
}


