import { Input } from '@material-tailwind/react';
import axios from 'axios';
import { FormEvent, useState } from 'react'
import { IconContext } from 'react-icons';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import { Link } from 'react-router-dom';

interface FormState {
  category: string;
  state: string | undefined;
  zipCode: number | null;
  type: string;
  goal: number | null;
  email: string;
  password: string;
}

  export default function New3aweniRegister() {

    const [Form, setForm] = useState<FormState>({category: '', state: "", type: "", goal: null, zipCode: null, email: "", password: ""})

    const handleChange = (e: FormEvent) => {
  
      const target = e.target as HTMLInputElement
      
      setForm({
        ...Form,
        [target.name]: target.value
      })
  
    }
    
      const handleSubmit = async (event: FormEvent) => {
            event.preventDefault()
            try {
                axios.post('/api/user/register',{
                email: Form.email,
                password: Form.password,
                },{
                withCredentials: true
                }).then((response) => {
                
                console.log(response);
            
                })
            } catch (error) {
                
            }
      }
    
  return (
    <main  className='relative w-screen h-screen min-w-screen min-h-screen overflow-visible flex flex-nowrap items-start bg-beige'>
      <Link to='/' className='w-14 absolute left-10 top-10 z-50'> 
            <img src="/icon.png" alt="" />
      </Link>
      
      <form onSubmit={handleSubmit} className='w-screen h-fit min-w-screen min-h-screen overflow-hidden items-start relative flex flex-nowrap shrink-0'>

    <aside className='w-1/3 h-screen bg-beige create-aside-background relative flex justify-center'>
          
          <h1 className='mt-[25vh]'>
            <strong>Etape 4: </strong> Connectez vous à votre compte.
          </h1>
      </aside> 

      <div className='w-2/3 h-screen bg-white z-10 rounded-tl-[46px] shadow-modern px-10 pb-10 overflow-auto pt-32 flex items-center flex-col justify-between'>
    
        <div className="w-3/6 min-w-[300px] flex flex-col items-center justify-center gap-8 mt-20">
            


            <p>Vous n'êtes pas déjà inscrit ? <Link to='/create/register' className='underline text-main_color'>S'inscrire</Link></p>
              <Input size='lg' type="text" id="email" name="email" label="Adresse E-mail" required onChange={handleChange} />
              

              <Input size='lg' type="text" id="password" name="password" label='Mot de passe' required onChange={handleChange} />
              
            <Link to='/password-reset' className='hover:underline self-end text-black'>Mot de passe oublié ?</Link>

        </div>

          <div className='w-full flex flex-col gap-5'>
            <p className='justify-self-end self-start text-gray-700 text-[13px]'>By continuing, you agree to the 3aweni <Link to='terms' className='underline'>terms</Link>  and <Link to='privacy' className='underline'>privacy notice</Link>.</p>

            <div className='w-full flex justify-between items-center'>

              <Link to='/create/goal' className='font-medium h-6 w-6'> 
                <IconContext.Provider value={{className: " text-gray-700 h-6 w-6"}}>
                        <HiOutlineArrowNarrowLeft /> 
                </IconContext.Provider>
              </Link>
              
              <button type='submit' className='w-fit h-fit px-6 py-3 bg-main_color rounded shadow-form text-white flex items-center font-medium gap-1 self-end'> Créer mon 3aweni </button>

            </div>
          </div>
      </div> 

  </form>
  </main>
  )
}
