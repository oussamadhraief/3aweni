import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "../utils/axiosConfig"
import { BsFillPersonFill } from 'react-icons/bs';
import { AiTwotonePhone } from 'react-icons/ai';

interface RegisterForm {
    name: string;
    email: string;
    phone: string;
    password: string;
    passwordConfirmation: string;
}

export default function 
() {

    const navigate = useNavigate()
    
    const [RegisterForm, setRegisterForm] = useState<RegisterForm>({name: "",phone: "",email: "", password: "", passwordConfirmation: ""})

    const handleChange = (event: FormEvent) => {
        const target = event.target as HTMLInputElement
        setRegisterForm({
          ...RegisterForm,
          [target.name]: target.value
        })
      }
    
      const handleSubmit = async (event: FormEvent) => {
            event.preventDefault()
            try {
                axios.post('/api/user/register',{
                email: RegisterForm.email,
                password: RegisterForm.password,
                passwordConfirmation: RegisterForm.passwordConfirmation,
                name: RegisterForm.name,
                phone: RegisterForm.phone,
                }).then((response) => {
                
                    navigate('/login')
                    
                })
            } catch (error) {
                
            }
      }

  return (

<main className="mt-[94px] flex justify-center items-center pt-32 pb-52">
      
<div className="flex flex-col w-full min-w-[400px] max-w-[460px] px-4 py-8 bg-white rounded-lg shadow sm:px-6 md:px-8 lg:px-10">
    <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-[21px]">
      Créez un nouveau compte
    </div>
    <div className="mt-8">
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-2">
                <div className="flex relative ">
                    <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                        <BsFillPersonFill />
                    </span>
                    <input type="text" name="name"  className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm h-10 outline-none" required value={RegisterForm.name} onChange={handleChange} placeholder='Nom et prénom'/>
                    </div>
                </div>
            <div className="flex flex-col mb-2">
                <div className="flex relative ">
                    <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                        <AiTwotonePhone />
                    </span>
                    <input type="tel" name="phone"  className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm h-10 outline-none" required value={RegisterForm.phone} onChange={handleChange} placeholder='Num. de téléphone'   />
                    {/* pattern="[0-9]{2} [0-9]{3} [0-9]{3}" */}
                    </div>
                </div>
            <div className="flex flex-col mb-2">
                <div className="flex relative ">
                    <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                        <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z">
                            </path>
                        </svg>
                    </span>
                    <input type="email" name="email"  className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm h-10 outline-none" required value={RegisterForm.email} onChange={handleChange} placeholder='Adresse E-mail'/>
                    </div>
                </div>

                <div className="flex flex-col mb-6">
                    <div className="flex relative ">
                        <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                            <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z">
                                </path>
                            </svg>
                        </span>
                        <input type="password" name='password' className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm h-10 outline-none" placeholder="Mot de passe" required value={RegisterForm.password} onChange={handleChange} />
                        </div>
                    </div>
                
                    <div className="flex w-full">
                        <button type="submit" className="py-2 px-4  bg-primary hover:bg-secondary text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg ">
                            S'inscrire
                        </button>
                    </div>
                </form>
            </div>
            <div className="flex items-center justify-center mt-6">
                <p className="text-sm">Vous êtes déjà inscrit ?  <Link to="/login" className="text-primary hover:underline">S'identifier</Link> </p>
            </div>
        </div>
</main>
  )
}
