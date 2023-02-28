import { FormEvent } from 'react'

interface FormState {
  category: string;
  state: string;
}


  export default function New3aweniGoal({handleChange, Form, setForm, handleScroll} : {handleChange:(e: FormEvent) => void, Form: FormState, setForm: React.Dispatch<React.SetStateAction<FormState>>, handleScroll: (index: number) => void}) {

    
  return (
    <div className='w-screen h-fit min-w-screen min-h-screen overflow-hidden items-start relative flex flex-nowrap shrink-0 bg-[#f9f5f2] '>


<aside className='w-1/3 h-screen bg-[#f9f5f2] create-aside-background relative flex justify-center'>
          
          <h1 className='mt-[25vh]'>
            <strong>Etape 2: </strong> Sélectionnez le type de votre 3aweni.
          </h1>
      </aside> 
    
      <div className='w-2/3 h-screen bg-white z-10 rounded-l-[46px] shadow-modern px-10 pb-10 overflow-auto pt-32 flex items-center flex-col justify-between'>
        <div className='w-5/6 mt-20'>
      
          <p>Pour qui voulez-vous collecter les fonds:</p> 
          <div className='flex justify-start gap-4 items-center flex-wrap mt-8'>
              
      
          </div>
        </div>
          <div className='w-5/6 flex justify-between items-center'>

          <button type='button' onClick={e => handleScroll(1)} className='flex items-center font-medium gap-1 self-end'>  <svg xmlns="http://www.w3.org/2000/svg" width="22.296" height="8.884" viewBox="0 0 30.296 14.884" className='rotate-180'>
              <path id="Shape" d="M19.653,8.852c-.05-.622-.149-1.339,0-1.388a15.881,15.881,0,0,1,2.977-.717C15.087,5.55,7.543,4.4.049,3.253c-.148,0,.1-2.51,0-2.536C8.288,1.962,16.577,3.254,24.815,4.546c-.745-.671-1.539-1.292-2.283-1.962-.148-.144,0-1.1,0-1.292S22.68.143,22.531,0L27,3.875c.4.335.794.718,1.192,1.053.248.239.644.43.744.814a9.529,9.529,0,0,1,0,2.057v.478c0-.048-.049-.048-.049-.1-.1.335-.347.383-.894.479-.943.191-1.886.239-2.829.335a21.5,21.5,0,0,0-4.964.813.048.048,0,0,1-.049.049c-.149.048-.347.1-.5.143ZM.049.717h0Z" transform="matrix(0.985, -0.174, 0.174, 0.985, 0, 5.036)" fill="#000000"></path>
            </svg></button>
          <button type='button' onClick={e => handleScroll(3)} className='flex items-center font-medium gap-1 self-end'> Suivant <svg xmlns="http://www.w3.org/2000/svg" width="22.296" height="8.884" viewBox="0 0 30.296 14.884">
              <path id="Shape" d="M19.653,8.852c-.05-.622-.149-1.339,0-1.388a15.881,15.881,0,0,1,2.977-.717C15.087,5.55,7.543,4.4.049,3.253c-.148,0,.1-2.51,0-2.536C8.288,1.962,16.577,3.254,24.815,4.546c-.745-.671-1.539-1.292-2.283-1.962-.148-.144,0-1.1,0-1.292S22.68.143,22.531,0L27,3.875c.4.335.794.718,1.192,1.053.248.239.644.43.744.814a9.529,9.529,0,0,1,0,2.057v.478c0-.048-.049-.048-.049-.1-.1.335-.347.383-.894.479-.943.191-1.886.239-2.829.335a21.5,21.5,0,0,0-4.964.813.048.048,0,0,1-.049.049c-.149.048-.347.1-.5.143ZM.049.717h0Z" transform="matrix(0.985, -0.174, 0.174, 0.985, 0, 5.036)" fill="#000000"></path>
            </svg></button>
          </div>
      </div> 


      


    </div>
  )
}
