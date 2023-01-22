import { Link } from 'react-router-dom'

export default function() {
  return (
    <main className="mt-[94px] flex justify-center items-center pt-32 pb-52">
        <form className="w-1/3 min-w-[300px] max-w-[500px] flex flex-col items-center justify-center">

            <h1 className="text-3xl font-semibold text-main_color mb-7">Connexion</h1>

            <div className="relative my-[15px] w-full">
                <input type="text" className="peer block w-full h-10 bg-transparent border  border-[#ccc] transition-all px-[15px] outline-none z-0 focus:border-main_color valid:border-main_color" id="email" name="email" required />
                <label htmlFor="email" className="absolute peer-focus:text-xs peer-focus:-top-[5px] peer-focus:outline-none bg-white peer-focus:text-main_color border-0 outline-none peer-valid:text-main_color peer-valid:text-xs peer-valid:-top-[5px] peer-valid:outline-none cursor-text z-10 top-[11px] left-2 text-sm font-medium px-[10px] text-[rgb(80,80,80] transition-all">E-mail</label>
            </div>

            <div className="relative my-[15px] w-full">
                <input type="text" className="peer block w-full h-10 bg-transparent border  border-[#ccc] transition-all px-[15px] outline-none z-0 focus:border-main_color valid:border-main_color" id="password" name="password" required />
                <label htmlFor="password" className="absolute peer-focus:text-xs peer-focus:-top-[5px] peer-focus:outline-none bg-white peer-focus:text-main_color border-0 outline-none peer-valid:text-main_color peer-valid:text-xs peer-valid:-top-[5px] peer-valid:outline-none cursor-text z-10 top-[11px] left-2 text-sm font-medium px-[10px] text-[rgb(80,80,80] transition-all">Mot de passe</label>
            </div>

            <p className="whitespace-nowrap place-self-end text-sm hover:underline">Forgot password ?</p>

            <button className="w-fit h-fit px-8 py-2 bg-secondary_color text-white rounded my-7"> se connecter </button>

            <p className="register-link">Vous n'êtes pas déjà inscrit ?  <Link to="/register" className="text-main_color underline">Créez un compte</Link> </p>

        </form>

    </main>
  )
}
