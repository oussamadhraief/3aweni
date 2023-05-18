import axios from '../utils/axiosConfig';
import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom';
import Footer from '../components/Footer'
import Header from '../components/Header'



export default function RequestPasswordReset() {
    const [RequestPasswordResetForm, setRequestPasswordResetForm] = useState<string>("")

    const handleSubmit = async (event: FormEvent) => {
            event.preventDefault()
            try {
            axios.post('/api/user/password-reset',{
                email: RequestPasswordResetForm,
            },{
                withCredentials: true
            }).then((response) => {
                
            
            })
            } catch (error) {
            
            }
    }

  return (
        <main className="mt-[94px] flex justify-center items-center pt-32 pb-52">
        <form className="w-1/3 min-w-[300px] max-w-[500px] flex flex-col items-center justify-center" onSubmit={handleSubmit}>

            <div className="relative my-[15px] w-full">
                <input type="email" className="peer block w-full h-10 bg-transparent border  border-[#ccc] transition-all px-[15px] outline-none z-0 focus:border-primary valid:border-primary" name="email" required onChange={e => setRequestPasswordResetForm(e.target.value)} />
                <label htmlFor="email" className="absolute peer-focus:text-xs peer-focus:-top-[5px] peer-focus:outline-none bg-white peer-focus:text-primary border-0 outline-none peer-valid:text-primary peer-valid:text-xs peer-valid:-top-[5px] peer-valid:outline-none cursor-text z-10 top-[11px] left-2 text-sm font-medium px-[10px] text-[rgb(80,80,80] transition-all">Adresse Email du compte à récupérer</label>
            </div>

            <button className="w-fit h-fit px-8 py-2 bg-secondary text-white rounded my-7"> Envoyer </button>

        </form>

    </main>
  )
}
