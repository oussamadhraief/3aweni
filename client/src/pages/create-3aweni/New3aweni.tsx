import React, { FormEvent, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import New3aweniCategoryGoal from '../../components/New3aweniCategoryGoal';

interface FormState {
  category: string;
  goal: number | null;
}

export default function New3aweni() {

  const formRef = useRef<HTMLFormElement>(null)

  const [Form, setForm] = useState<FormState>({category: '', goal: null})

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
    <main  className='w-fit h-fit'>
      <form ref={formRef} className='w-fit h-screen min-w-screen min-h-screen overflow-visible flex flex-row flex-nowrap items-start relative bg-[#f9f5f2] transition-all duration-1000'>

        <New3aweniCategoryGoal handleChange={handleChange} Form={Form} handleScroll={handleScroll} />

        <New3aweniCategoryGoal handleChange={handleChange} Form={Form} handleScroll={handleScroll} />

        <New3aweniCategoryGoal handleChange={handleChange} Form={Form} handleScroll={handleScroll} />
     
      </form>
    </main>
  )
}
