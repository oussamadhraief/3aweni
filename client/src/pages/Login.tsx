import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FormEvent, useState } from 'react'
import useAuthContext from '../hooks/useAuthContext';

interface LoginFormInterface {
  email: string;
  password: string;
}

export default function() {

  const navigate = useNavigate()

  const { login } = useAuthContext()

  const [LoginForm, setLoginForm] = useState<LoginFormInterface>({email: "", password: ""})

  const handleChange = (event: FormEvent) => {
    const target = event.target as HTMLInputElement
    setLoginForm({
      ...LoginForm,
      [target.name]: target.value
    })
  }

  const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        try {
          axios.post('/api/user/login',{
            email: LoginForm.email,
            password: LoginForm.password
          },{
            withCredentials: true
          }).then((res) => {
            
            const { data: { user } } = res
            
            login(user)
        
            navigate('/')

          })
        } catch (error) {
            console.log(error)
        }
  }


  return (
    <main className="mt-[94px] flex justify-center items-center pt-32 pb-52">
        <form className="w-1/3 min-w-[300px] max-w-[500px] flex flex-col items-center justify-center" onSubmit={handleSubmit}>

            <h1 className="text-3xl font-semibold text-secondary_color mb-7">Connexion</h1>

            <div className="relative my-[15px] w-full">
                <input type="text" className="peer block w-full h-10 bg-transparent border  border-[#ccc] transition-all px-[15px] outline-none z-0 focus:border-main_color valid:border-main_color" name="email" id='email' required value={LoginForm.email} onChange={handleChange} />
                <label htmlFor="email" className="absolute peer-focus:text-xs peer-focus:-top-[7px] peer-focus:outline-none bg-white peer-focus:text-main_color border-0 outline-none peer-valid:text-main_color peer-valid:text-xs peer-valid:-top-[7px] peer-valid:outline-none cursor-text z-10 top-[11px] left-2 text-sm font-medium px-[2px] text-[rgb(80,80,80)] transition-all">E-mail</label>
            </div>

            <div className="relative my-[15px] w-full">
                <input type="password" className="peer block w-full h-10 bg-transparent border  border-[#ccc] transition-all px-[15px] outline-none z-0 focus:border-main_color valid:border-main_color" name="password" id='password' required value={LoginForm.password} onChange={handleChange} />
                <label htmlFor="password" className="absolute peer-focus:text-xs peer-focus:-top-[7px] peer-focus:outline-none bg-white peer-focus:text-main_color border-0 outline-none peer-valid:text-main_color peer-valid:text-xs peer-valid:-top-[7px] peer-valid:outline-none cursor-text z-10 top-[11px] left-2 text-sm font-medium px-[2px] text-[rgb(80,80,80)] transition-all">Mot de passe</label>
            </div>

            <Link className="whitespace-nowrap place-self-end text-sm hover:underline text-black" to="/password-reset">Mot de passe oublié ?</Link>

            <button className="w-fit h-fit px-8 py-2 bg-secondary_color text-white rounded my-7"> se connecter </button>

            <p className="register-link">Vous n'êtes pas déjà inscrit ?  <Link to="/register" className="text-main_color underline">Créez un compte</Link> </p>

        </form>

    </main>
  )
}
