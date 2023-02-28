import React, { FormEvent, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import New3aweniCategoryLocation from '../../components/New3aweniCategoryLocation';
import New3aweniType from '../../components/New3aweniType';
import New3aweniGoal from '../../components/New3aweniGoal';
import New3aweniRegister from '../../components/New3aweniRegister';

interface FormState {
  category: string;
  state: string;
}

export default function New3aweni() {

  const formRef = useRef<HTMLFormElement>(null)

  const [Form, setForm] = useState<FormState>({category: '', state: ""})

  const handleScroll = (index: number) => {
    const scrollSize = index * window.innerWidth
    console.log(scrollSize);
    
    if(formRef.current)
      formRef.current.style.transform = `translateX(-${scrollSize}px)`
  } 

  const handleChange = (e: FormEvent) => {

    const target = e.target as HTMLInputElement
    
    setForm({
      ...Form,
      [target.name]: target.value
    })

  }

  return (
    <main  className='w-fit h-fit relative'>
      <Link to='/' className='w-32 h-32 absolute left-10 top-10 z-50'> 
            <img src="/logo.png" alt="" />
        </Link>
      <form ref={formRef} className='relative w-screen h-screen min-w-screen min-h-screen overflow-visible flex flex-row flex-nowrap items-start bg-[#f9f5f2] transition-all duration-500'>


        <New3aweniCategoryLocation handleChange={handleChange} Form={Form} setForm={setForm} handleScroll={handleScroll} />

        <New3aweniType handleChange={handleChange} Form={Form} setForm={setForm} handleScroll={handleScroll} />

        <New3aweniGoal handleChange={handleChange} Form={Form} setForm={setForm} handleScroll={handleScroll} />

        <New3aweniRegister handleChange={handleChange} Form={Form} setForm={setForm} handleScroll={handleScroll} /> 
     
      </form>
    </main>
  )
}
