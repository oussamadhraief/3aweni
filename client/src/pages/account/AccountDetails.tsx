import { Link } from 'react-router-dom'
import { useState } from "react";
import { FiEdit2 } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io'


export default function AccountDetails() {
  
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
          
          <Link to='/account/details'  className="min-w-[112px] h-8 w-fit text-center z-20 text-main_color border-b-2 border-main_color transition-all outline-none py-1 whitespace-nowrap ">
            Informations personnelles
          </Link>

          <Link to='/account/security'  className="min-w-[112px] h-8 w-fit z-20 text-black transition-all outline-none text-center border-b-2 border-white hover:text-main_color hover:border-b-2 py-1 hover:border-main_color">
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
        <div className='w-full border-b border-gray-400 py-3'>
              <div className='w-full flex justify-between px-1 items-center'>
                  <div className="block">
                    <p>Photo de profil</p> 
                    <p className='text-xs text-gray-700'>Modifez votre photo de profil.</p>
                  </div>
                  <button onClick={handleEditName}>
                    {EditingName ? <IoMdClose /> : <FiEdit2 />}
                  </button>
              </div>
              <div className='flex justify-center mb-7 mt-10 bg-white rounded-full overflow-hidden'>
                <img src="/profile.png" alt="" className='w-24' />
              </div>
              <div className={EditingName ? 'w-full h-fit max-h-52 flex justify-center flex-nowrap items-center gap-3 my-7 transition-all overflow-hidden' : "w-full h-fit max-h-0 transition-all overflow-hidden flex justify-center flex-nowrap items-center gap-3" }>
              <button className='rounded text-gray-700'>annuler</button>
              <button className='bg-secondary_color px-2 py-1 rounded text-white'>enregistrer</button>
            </div>
          </div>

        <div className='w-full border-b border-gray-400 py-3'>
              <div className='w-full flex justify-between px-1 items-center'>
                  <div className="block">
                    <p>Nom et prénom</p> 
                    <p className='text-xs text-gray-700'>Modifez votre nom et prénom.</p>
                  </div>
                  <button onClick={handleEditName}>
                    {EditingName ? <IoMdClose /> : <FiEdit2 />}
                  </button>
              </div>
              <div className={EditingName ? 'w-full h-fit max-h-52 flex justify-between flex-nowrap items-center gap-5 my-7 transition-all overflow-hidden' : "w-full h-fit max-h-0 transition-all overflow-hidden flex justify-between flex-nowrap items-center gap-5" }>
                <input type="text" id="first_name" className="max-w-[550px] border border-gray-300 text-gray-900 text-sm rounded focus:ring-main_color focus:border-main_color block w-full h-8 px-2.5 outline-none" required />
                <button className='bg-secondary_color px-2 py-1 rounded text-white'>enregistrer</button>
            </div>
          </div>

          <div className='w-full border-b border-gray-400 py-3'>
              <div className='w-full flex justify-between px-1 items-center'>
                  <div className="block">
                    <p>Numéro de téléphone</p> 
                    <p className='text-xs text-gray-700'>Modifez ou supprimez votre numéro de téléphone.</p>
                  </div>
                  <button onClick={handleEditPhone}>
                    {EditingPhone ? <IoMdClose /> : <FiEdit2 />}
                  </button>
              </div>
              <div className={EditingPhone ? 'w-full h-fit max-h-52 flex justify-between flex-nowrap items-center gap-5 my-7 transition-all overflow-hidden' : "w-full h-fit max-h-0 transition-all overflow-hidden flex justify-between flex-nowrap items-center gap-5" }>
                <input type="text" id="first_name" className="max-w-[550px] border border-gray-300 text-gray-900 text-sm rounded focus:ring-main_color focus:border-main_color block w-full h-8 px-2.5 outline-none" required />
                <button className='bg-secondary_color px-2 py-1 rounded text-white'>enregistrer</button>
            </div>
          </div>
          
      </div>

    </main>
  )
}


{/* <div className="relative mb-3 xl:w-96 border" data-te-input-wrapper-init>
            <input
              type="text"
              className="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="exampleFormControlInput1"
              placeholder="Example label" />
            <label
              htmlFor="exampleFormControlInput1"
              className="bg-white pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
              >Example label
            </label>
          </div> */}