import { Link } from 'react-router-dom'
import { Fragment, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

export default function AccountDetails() {
  
  

  return (
    <main className='mt-[94px] py-24  flex flex-col items-start justify-center body-container mx-auto'>
        

    <section className=''>
    <div className="relative w-full flex flex-nowrap overflow-x-auto items-center justify-start h-8 mb-10 gap-[2px]">
          
          <Link to='/account/details'  className="min-w-[112px] w-fit text-center z-20 text-main_color border-b-2 border-main_color transition-all outline-none py-1 whitespace-nowrap">
            Informations personnelles
          </Link>

          <Link to=''  className="min-w-[112px] w-fit z-20 text-black transition-all outline-none text-center border-b-2 border-white hover:text-main_color hover:border-b-2 py-1 hover:border-main_color">
            Sécurité
          </Link>

          <Link to=''  className="min-w-[112px] w-fit z-20 text-black transition-all outline-none text-center border-b-2 border-white hover:text-main_color hover:border-b-2 py-1 hover:border-main_color whitespace-nowrap">
            Mes 3aweni
          </Link>


          <Link to=''  className="min-w-[112px] w-fit z-20 text-black transition-all outline-none text-center border-b-2 border-white hover:text-main_color hover:border-b-2 py-1 hover:border-main_color whitespace-nowrap">
            Mes dons
          </Link>

      </div>

      <div>
        <div>
              <label htmlFor="first_name" className="ml-1 block mb-2 font-medium text-secondary_color">Nom et prénom:</label>
              <input type="text" id="first_name" className="border border-gray-300 text-gray-900 text-sm rounded focus:ring-main_color focus:border-main_color block w-full p-2.5 outline-none" required />
          </div>

        <div>
              <label htmlFor="first_name" className="ml-1 mt-5 block mb-2 font-medium text-secondary_color">Num de tél:</label>
              <input type="text" id="first_name" className="border border-gray-300 text-gray-900 text-sm rounded focus:ring-main_color focus:border-main_color block w-full p-2.5 outline-none" required />
          </div>
          
      </div>

    
    </section>

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