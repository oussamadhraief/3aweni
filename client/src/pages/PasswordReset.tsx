import axios from 'axios';
import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom';
import Footer from '../components/Footer'
import Header from '../components/Header'

interface PasswordResetFormInterface {
    password: string;
    passwordConfirmation: string;
}

export default function PasswordReset() {

    const [PasswordResetForm, setPasswordResetForm] = useState<PasswordResetFormInterface>({ password: "", passwordConfirmation: "" })

    const handleChange = (event: FormEvent) => {
        const target = event.target as HTMLInputElement
        setPasswordResetForm({
        ...PasswordResetForm,
        [target.name]: target.value
        })
    }

    const handleSubmit = async (event: FormEvent) => {
            event.preventDefault()
            try {
            axios.post('/api/user/PasswordReset',{
                password: PasswordResetForm.password,
                passwordConfirmation: PasswordResetForm.passwordConfirmation
            },{
                withCredentials: true
            }).then((response) => {
                
                console.log(response);
            
            })
            } catch (error) {
            
            }
    }

  return (
        <main className="mt-[94px] flex justify-center items-center pt-32 pb-52">
        <form className="w-1/3 min-w-[300px] max-w-[500px] flex flex-col items-center justify-center" onSubmit={handleSubmit}>

            <div className="relative my-[15px] w-full">
                <input type="password" className="peer block w-full h-10 bg-transparent border  border-[#ccc] transition-all px-[15px] outline-none z-0 focus:border-primary valid:border-primary" name="password" required onChange={handleChange} />
                <label htmlFor="password" className="absolute peer-focus:text-xs peer-focus:-top-[5px] peer-focus:outline-none bg-white peer-focus:text-primary border-0 outline-none peer-valid:text-primary peer-valid:text-xs peer-valid:-top-[5px] peer-valid:outline-none cursor-text z-10 top-[11px] left-2 text-sm font-medium px-[10px] text-[rgb(80,80,80] transition-all">Nouveau mot de passe</label>
            </div>

            <div className="relative my-[15px] w-full">
                <input type="password" className="peer block w-full h-10 bg-transparent border  border-[#ccc] transition-all px-[15px] outline-none z-0 focus:border-primary valid:border-primary" name="password-confirmation" required onChange={handleChange} />
                <label htmlFor="password-confirmation" className="absolute peer-focus:text-xs peer-focus:-top-[5px] peer-focus:outline-none bg-white peer-focus:text-primary border-0 outline-none peer-valid:text-primary peer-valid:text-xs peer-valid:-top-[5px] peer-valid:outline-none cursor-text z-10 top-[11px] left-2 text-sm font-medium px-[10px] text-[rgb(80,80,80] transition-all">Confirmez le nouveau mot de passe</label>
            </div>

            <button className="w-fit h-fit px-8 py-2 bg-secondary text-white rounded my-7"> Mettre à jour </button>

        </form>

    </main>
  )
}
