import { IconContext } from 'react-icons';
import { BsPeople } from 'react-icons/bs';
import { BsPerson } from 'react-icons/bs';
import { FormEvent, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';

interface FormState {
  category: string;
  state: string;
  zipCode: number;
  type: string;
  goal: number;
}

  export default function New3aweniType() {

    const navigate = useNavigate()

    const [Form, setForm] = useState<FormState>({category: '', state: "", zipCode: 0, type: '', goal: 0})

    useEffect(() => {
      const session3aweni = sessionStorage.getItem('create3aweni')
      if (session3aweni) {
        
        const res = JSON.parse(session3aweni)
  
        if(res.zipCode && res.state && res.category)
          setForm(JSON.parse(session3aweni))
        else 
          navigate('/create/category')
  
      }
      else {
        navigate('/create/category')
      }
    }, []);

  const handleChange = (e: FormEvent) => {
  
    const target = e.target as HTMLInputElement

    setForm({
      ...Form,
      type: target.value
    })
    

  }

    const handleSubmit = (e: FormEvent) => {
      e.preventDefault()
  
      sessionStorage.setItem('create3aweni',JSON.stringify(Form))
      
      navigate('/create/goal')
      
    }
    
  return (
    <main  className='relative w-screen h-screen min-w-screen min-h-screen overflow-visible flex flex-nowrap items-start bg-beige'>
      <Link to='/' className='w-14 absolute left-10 top-10 z-50'> 
        <img src="/icon.png" alt="" />
      </Link>
      
      <form onSubmit={handleSubmit} className='w-screen h-fit min-w-screen min-h-screen overflow-hidden items-start relative flex flex-nowrap shrink-0'>

      <aside className='w-1/3 h-screen bg-beige create-aside-background relative flex justify-center'>
          
          <h1 className='mt-[25vh]'>
            <strong>Etape 2: </strong> Sélectionnez le type de votre 3aweni.
          </h1>
      </aside> 

      <div className='w-2/3 h-screen bg-white z-10 rounded-tl-[46px] shadow-modern px-10 pb-10 overflow-auto pt-32 flex items-center flex-col justify-between'>
        <div className='w-5/6 mt-20'>
      
          <p>Pour qui voulez-vous collecter les fonds:</p> 
            <div className='w-5/6 flex justify-start gap-4 items-center flex-wrap mt-8'>


              <label className={Form.type == "Forme" ? 'w-full relative flex justify-between items-center h-28 px-4 py-5 bg-lighter_main_color border-2 border-main_color hover:cursor-pointer rounded-lg' : 'w-full relative flex justify-between items-center h-28 px-4 py-5 bg-white shadow-form hover:bg-lighter_main_color hover:border-lighter_main_color hover:cursor-pointer rounded-lg border border-white'} htmlFor="Forme"> <input type="radio" name="category" id="Forme" className='absolute -z-10 rounded' onChange={e => handleChange(e)} required value="Forme" checked={Form.type === "Forme"} />
                <div>
                  <p>Pour moi</p> 
                  <p className='text-xs font-thin text-gray-600'>Les fonds seront livrés à votre compte bancaire</p>

                </div>
                <IconContext.Provider value={{className: "h-12 w-12 text-gray-700"}}>
                  <BsPerson />
                </IconContext.Provider>
              </label>   

              <label className={Form.type == "Forsomeone" ? 'w-full relative flex justify-between items-center h-28 px-4 py-5 bg-lighter_main_color border-2 border-main_color hover:cursor-pointer rounded-lg' : 'w-full relative flex justify-between items-center h-28 px-4 py-5 bg-white shadow-form hover:bg-lighter_main_color hover:border-lighter_main_color hover:cursor-pointer rounded-lg border border-white'} htmlFor="Forsomeone"> <input type="radio" name="category" id="Forsomeone" className='absolute -z-10 rounded' onChange={e => handleChange(e)} required value="Forsomeone" checked={Form.type === "Forsomeone"} />
                <div>
                  <p>Pour quelqu'un d'autre</p> 
                  <p className='text-xs font-thin text-gray-600'>Vous inviterez un bénéficiaire pour recevoir les fons ou vous les distribuerez vous-même.</p>

                </div>
                <IconContext.Provider value={{className: "h-12 w-12 text-gray-700"}}>
                  <BsPeople />
                </IconContext.Provider>
              </label>   


            </div>
        </div>
          <div className='w-full flex justify-between items-center'>

          <Link to='/create/category' className='font-medium'>  
            <IconContext.Provider value={{className: " text-gray-700 h-6 w-6"}}>
                      <HiOutlineArrowNarrowLeft /> 
            </IconContext.Provider>
          </Link>
          <button  className='w-fit h-fit px-6 py-3 bg-main_color rounded shadow-form text-white flex items-center font-medium gap-1 self-end'> Suivant </button>
          </div>
      </div> 
    </form>
    </main>
  )
}
